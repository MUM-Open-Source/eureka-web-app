<template>
    <div v-for="(notification, i) in notifications" :key="i">
        <NotificationsItem
            :notification="notification"
            :longNoti="longNoti"
            icon="hand-spock"
            iconColor="#71c9a2"
        />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import NotificationsItem from './NotificationsItem.vue';
export default defineComponent({
    name: 'NotificationsCategories',
    components: { NotificationsItem },
    props: {
        notifications: { type: Array, required: true },
        longNoti: { type: Boolean, required: true, default: false },
    },
});
</script>
