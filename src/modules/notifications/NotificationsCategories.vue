<template>
    <div v-for="noti in notifications" :key="noti.id">
        <NotificationsItem
            notiFor="waves"
            :noti="noti"
            :longNoti="longNoti"
            icon="hand-spock"
            iconColor="#71c9a2"
            title="Someone waved at you"
            :bodyText="
                `${noti.from_user_name} just waved at you. Say hi to them back by giving a friendly wave back!`
            "
        />
        <NotificationsItem
            notiFor="projects"
            :noti="noti"
            :longNoti="longNoti"
            icon="tasks"
            iconColor="#FFFF00"
            title="A new project was created"
            :bodyText="`Check out ${noti.project_name} now`"
        />
    </div>
</template>

<script>
import NotificationsItem from './NotificationsItem.vue';
export default {
    name: 'NotificationsCategories',
    components: { NotificationsItem },
    props: {
        notifications: { type: Array, required: true },
        longNoti: { type: Boolean, required: true, default: false },
    },
};
</script>
