<template>
    <div class="modal pad--2 pad__t--1 pad__b">
        <div class="modal__header mar__t">
            <div class="subheading">Your Notifications</div>
            <button
                class="text--primary cta pad--1 cursor__pointer"
                :style="{ padding: '5px 10px' }"
                @click="readAll"
                v-if="displayNotifications.length"
            >
                Mark all as read
            </button>
        </div>
        <hr class="divider mar__t--1 mar__r--0 mar__l--0" />
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
        <div class="modal__footer mar--auto mar__t">
            <button
                class="text--primary cta pad--1 cursor__pointer"
                @click="toNotificationsPage"
            >
                View All Notifications
            </button>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed } from '@vue/runtime-core';
import router from '@/router';
import store from '@/store';
import NotificationsCategories from './NotificationsCategories.vue';
export default defineComponent({
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
});
</script>

<style lang="scss" scoped>
.divider {
    border: 1px solid $color-bg-hover;
}
.cta {
    font-weight: bold;
    border: none;
    border-radius: $app-border-radius-sm;
    font-size: 12px;
    background-color: transparent;
    &:hover {
        background-color: $color-bg-hover;
    }
}
.modal {
    @include shadow;
    position: absolute;
    z-index: $modal-z-index;
    background: $color-white;
    max-width: $modal-max-width;
    height: $modal-height;
    width: $modal-width;
    border-radius: $app-border-radius;
    top: $user-menu-top;
    right: $user-menu-right;
    display: flex;
    flex-direction: column;
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    &__body {
        flex: 1;
        overflow-y: scroll;
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
}
@media (max-width: 576px) {
    .modal {
        height: $modal-height-sm; // constant height to allow overflow-y to work
        margin: 0 auto; // align to be center for absolute-positioned
        right: 0;
        left: 0;
    }
}
</style>
