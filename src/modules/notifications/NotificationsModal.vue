<template>
    <div class="modal">
        <div class="modal__header">
            <div class="subheading">Your Notifications</div>
            <button
                class="text--primary cta"
                :style="{ padding: '5px 10px' }"
                @click="readAll"
                v-if="displayNotifications.length"
            >
                Mark all as read
            </button>
        </div>
        <hr class="divider" />
        <div
            class="modal__body"
            :class="{ modal__noNotiStyle: !displayNotifications.length }"
        >
            <NotificationsCategories
                :notifications="displayNotifications"
                :longNoti="false"
                v-if="displayNotifications.length"
            />
            <div class="no-noti-text" v-else>
                Looks likes you have no notifications yet. Welcome to Eureka !
            </div>
        </div>
        <div class="modal__footer">
            <button class="text--primary cta" @click="toNotificationsPage">
                View All Notifications
            </button>
        </div>
    </div>
</template>

<script>
import { ref, computed } from '@vue/runtime-core';
import router from '@/router';
import store from '@/store';
import NotificationsCategories from './NotificationsCategories.vue';
export default {
    name: 'NotificationsModal',
    components: { NotificationsCategories },
    setup(_, { emit }) {
        const notifications = ref(store.state.notifications);
        const displayNotifications = computed(() =>
            notifications.value.slice(0, 3)
        );
        const haha = [];
        const toNotificationsPage = () => {
            router.push({ path: '/notifications' });
            emit('viewAllClicked');
        };
        const readAll = () => store.dispatch('readAllNotifications');
        return { readAll, displayNotifications, haha, toNotificationsPage };
    },
};
</script>

<style lang="scss" scoped>
.divider {
    border: 1px solid #e2e8ee;
    border-radius: 5px;
    margin: 15px 0;
}
.cta {
    font-weight: bold;
    cursor: pointer;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    font-size: 12px;
    background-color: transparent;
    &:hover {
        background-color: $color-bg-hover;
    }
}
.modal {
    @include shadow;
    padding: 15px 25px;
    position: absolute;
    z-index: 50;
    background: $color-white;
    max-width: 80%;
    height: 450px;
    width: 300px;
    border-radius: 10px;
    overflow-y: scroll;
    margin: 0 10px;
    top: $user-menu-top + 25;
    right: $user-menu-right;
    display: flex;
    flex-direction: column;
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 35px;
    }
    &__body {
        flex: 1;
    }
    &__noNotiStyle {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: $color-brand;
        text-align: center;
    }
    &__footer {
        height: 35px;
        margin: 0 auto;
    }
}
@media (max-width: 576px) {
    .modal {
        height: 400px; // constant height to allow overflow-y to work
        margin: 0 auto; // align to be center for absolute-positioned
        right: 0;
        left: 0;
    }
}
</style>
