<template>
    <div v-for="noti in notifications" :key="noti.id">
        <NotificationsItem
            v-if="noti.category == 'waves'"
            :category="noti.category"
            :id="noti.id"
            :longNoti="longNoti"
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
            :longNoti="longNoti"
            icon="book_online"
            title="A new project was created"
            :bodyText="`Check out ${noti.name} now`"
            :moment="getMoment(noti.timeStamp)"
            :readStatus="noti.readStatus"
            iconColor="#FFFF00"
        />
    </div>
</template>

<script>
import moment from 'moment';

import NotificationsItem from './NotificationsItem.vue';

export default {
    name: 'NotificationsCategories',
    components: { NotificationsItem },
    props: {
        notifications: { type: Array, required: true },
        longNoti: { type: Boolean, required: true, default: false }
    },
    setup() {
        const getMoment = timeStamp => {
            return moment(new Date(timeStamp.seconds * 1000))
                .fromNow()
                .toString();
        };

        return { getMoment };
    }
};
</script>
