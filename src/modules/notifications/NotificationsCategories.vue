<template>
    <div v-for="noti in notifications" :key="noti.id">
        <NotificationsItem
            v-if="noti.category == 'waves'"
            :category="noti.category"
            :id="noti.id"
            :longNoti="longNoti"
            :moment="getMoment(noti.timestamp)"
            :read_status="noti.read_status"
            icon="hand-spock"
            iconColor="#71c9a2"
            title="Someone waved at you"
            :bodyText="
                `${noti.from_user_name} just waved at you. Say hi to them back by giving a friendly wave back!`
            "
        />
        <NotificationsItem
            v-if="noti.category == 'projects'"
            :category="noti.category"
            :id="noti.id"
            :longNoti="longNoti"
            :moment="getMoment(noti.timestamp)"
            :read_status="noti.read_status"
            icon="tasks"
            iconColor="#FFFF00"
            title="A new project was created"
            :bodyText="`Check out ${noti.project_name} now`"
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
        const getMoment = timestamp => {
            return formatDistance(timestamp, Date.now()).toString() + ' ago';
        };
        return { getMoment };
    },
};
</script>
