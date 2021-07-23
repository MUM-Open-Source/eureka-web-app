<template>
    <div v-for="noti in notifications" :key="noti.id">
        <NotificationsItem
            v-if="noti.category == 'waves'"
            :category="noti.category"
            :id="noti.id"
            :longNoti="longNoti"
            :moment="getMoment(noti.timeStamp)"
            :readStatus="noti.readStatus"
            icon="celebration"
            iconColor="#71c9a2"
            title="Someone waved at you"
            :bodyText="
                `${noti.user} just waved at you. Say hi to them back by giving a friendly wave back!`
            "
        />
        <NotificationsItem
            v-if="noti.category == 'projects'"
            :category="noti.category"
            :id="noti.id"
            :longNoti="longNoti"
            :moment="getMoment(noti.timeStamp)"
            :readStatus="noti.readStatus"
            icon="book_online"
            iconColor="#FFFF00"
            title="A new project was created"
            :bodyText="`Check out ${noti.name} now`"
        />
    </div>
</template>

<script>
import { formatDistance } from 'date-fns';
import NotificationsItem from './NotificationsItem.vue';
export default {
    name: 'NotificationsCategories',
    components: { NotificationsItem },
    props: {
        notifications: { type: Array, required: true },
        longNoti: { type: Boolean, required: true, default: false },
    },
    setup() {
        const getMoment = timeStamp => {
            return formatDistance(timeStamp, Date.now()).toString() + ' ago';
        };
        return { getMoment };
    },
};
</script>
