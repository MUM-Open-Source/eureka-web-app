<template>
    <div class="modal">
        <div class="modal__header">
            <h1 class="subheading">Your Notifications</h1>
            <button class="text--primary cta" :style="{ padding: '5px 10px' }" @click="readAll">Mark all as read</button>
        </div>
        <hr class="divider" />
        <NotificationsCategories :notifications="displayNotifications" :longNoti="false" />
        <div class="modal__footer">
            <button class="text--primary cta" :style="{ padding: '10px' }" @click="toNotificationsPage" v-if="displayNotifications.length > 0">
                View All Notifications
            </button>
            <div class="no-noti" v-else>
                Looks likes you have no notifications yet. Welcome to Eureka !
            </div>
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
        const displayNotifications = computed(() => notifications.value.slice(0, 3));
        const haha = [];
        const toNotificationsPage = () => {
            router.push({ path: '/notifications' });
            emit('viewAllClicked');
        };

        const readAll = () => store.dispatch('readAllNotifications');

        return { readAll, displayNotifications, haha, toNotificationsPage };
    }
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
    border-radius: 5px;
    font-size: 12px;
    background-color: transparent;
    &:hover {
        background-color: $color-ghost;
    }
}

.modal {
    @include shadow;
    padding: 15px 25px;
    position: absolute;
    z-index: 50;
    background: $color-white;
    max-width: 350px;
    height: 450px;
    width: 100%;
    border-radius: 10px;
    overflow-y: scroll;
    margin: 0 10px;
    top: $user-menu-top + 25;
    right: $user-menu-right;
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 35px;
    }
    &__footer {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.no-noti {
    height: 415px;
    font-weight: bold;
    color: $color-brand;
    text-align: center;
    display: flex;
    align-items: center;
}

@media (max-width: 48em) {
    .modal {
        max-width: 300px;
        right: 0px;
    }
}
</style>
