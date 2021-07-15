<template>
    <div class="modal">
        <div class="modal__header">
            <h1 class="subheading">Your Notifications</h1>
            <button class="text--primary cta">Mark all as read</button>
        </div>
        <hr class="divider" />
        <div v-for="noti in notifications" :key="noti">
            <NotificationsItem
                v-if="noti.type == 'waves'"
                icon="celebration"
                title="Someone waved at you"
                :bodyText="`${noti.user} just waved at you. Say hi to them back by giving a friendly wave back!`"
                :moment="getMoment(noti.timeStamp)"
                :readStatus="noti.readStatus"
            />
            <NotificationsItem
                v-if="noti.type == 'projects'"
                icon="celebration"
                title="A new project was created"
                :bodyText="`Check out ${noti.name} now`"
                :moment="getMoment(noti.timeStamp)"
                :readStatus="noti.readStatus"
            />
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { ref } from '@vue/runtime-core';

import store from '@/store';
import NotificationsItem from './NotificationsItem.vue';

export default {
    name: 'NotificationsModal',
    components: { NotificationsItem },
    setup() {
        const notifications = ref(store.state.notifications);
        const getMoment = timeStamp => {
            return moment(timeStamp)
                .fromNow()
                .toString();
        };

        return { notifications, getMoment };
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
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    border: 0px;
    border-radius: 5px;
    padding: 5px 10px;
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
}
</style>
