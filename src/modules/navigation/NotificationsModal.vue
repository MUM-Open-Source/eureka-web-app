<template>
    <div class="modal">
        <div class="modal__header">
            <h1 class="subheading">Your Notifications</h1>
            <button class="text--primary cta" :style="{ padding: '5px 10px' }" @click="readAll">Mark all as read</button>
        </div>
        <hr class="divider" />
        <div v-for="noti in displaytNotifications" :key="noti.id">
            <NotificationsItem
                v-if="noti.category == 'waves'"
                :category="noti.category"
                :id="noti.id"
                icon="celebration"
                title="Someone waved at you"
                :bodyText="`${noti.user} just waved at you. Say hi to them back by giving a friendly wave back!`"
                :moment="getMoment(noti.timeStamp)"
                :readStatus="noti.readStatus"
                iconColor="#71c9a2"
            />
            <NotificationsItem
                v-if="noti.category == 'projects'"
                :id="noti.id"
                :category="noti.category"
                icon="book_online"
                title="A new project was created"
                :bodyText="`Check out ${noti.name} now`"
                :moment="getMoment(noti.timeStamp)"
                :readStatus="noti.readStatus"
                iconColor="#FFFF00"
            />
        </div>
        <div class="modal__footer">
            <button class="text--primary cta" :style="{ padding: '10px' }" @click="toNotificationsPage">
                View All Notifications
            </button>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { ref, computed } from '@vue/runtime-core';
import router from '@/router';

import store from '@/store';
import NotificationsItem from './NotificationsItem.vue';

export default {
    name: 'NotificationsModal',
    components: { NotificationsItem },
    setup(props, { emit }) {
        const notifications = ref(store.state.notifications);
        const displaytNotifications = computed(() => notifications.value.slice(0, 3));
        const getMoment = timeStamp => {
            return moment(new Date(timeStamp.seconds * 1000))
                .fromNow()
                .toString();
        };

        const toNotificationsPage = () => {
            router.push({ path: '/notifications' });
            emit('viewAllClicked');
        };

        const readAll = () => store.dispatch('readAllNotifications');

        return { notifications, getMoment, readAll, displaytNotifications, toNotificationsPage };
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
    padding: 25px;
    position: absolute;
    z-index: 50;
    background: $color-white;
    width: 350px;
    height: 500px;
    top: $user-menu-top + 25;
    right: $user-menu-right;
    border-radius: 10px;
    overflow-y: scroll !important;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
