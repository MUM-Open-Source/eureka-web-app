<template>
    <div @click="readIndividual">
        <div
            class="noti-item pad--1 cursor__pointer"
            :class="{
                unread: !notification.read_status,
                longNotiStyle: longNoti,
            }"
        >
            <div
                class="noti-item-icon mar__r--1"
                :class="{ badge: !notification.read_status }"
                :style="{ backgroundColor: iconColor }"
                data-count=""
            >
                <fa :icon="icon" :style="{ fontSize: '18px' }" />
            </div>
            <div :style="{ flex: '1' }">
                <div class="content-title mar__b">
                    <div class="content-title__title-text">
                        {{ notification.title }}
                    </div>
                    <span class="content-title__moment-text">
                        {{ getMoment(notification.timestamp) }}
                    </span>
                </div>
                <div v-if="notification.body" class="content-body">
                    <div :style="{ fontSize: '14px' }">
                        {{ notification.body }}
                    </div>
                    <!-- <fa
                        icon="mail-bulk"
                        :class="[
                            notification.read_status
                                ? 'content-body__invincible'
                                : 'content-body__doneIcon',
                        ]"                        
                    /> -->
                </div>
            </div>
        </div>
        <hr class="divider mar__t--1 mar__b--1" v-if="!longNoti" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import store from '@/store';
import { formatDistance } from 'date-fns';

export default defineComponent({
    name: 'NotificationsItem',
    props: {
        notification: { type: Notification, required: true },
        longNoti: { type: Boolean },
        icon: { type: String, required: true },
        iconColor: { type: String, required: true },
    },
    setup(props) {
        const readIndividual = () => {
            if (!props.notification.read_status) {
                console.log('shiiti');
                store.dispatch(
                    'readIndividualNotification',
                    props.notification.id
                );
            }
        };

        const getMoment = timestamp => {
            return formatDistance(timestamp, Date.now()).toString() + ' ago';
        };
        return { getMoment, readIndividual };
    },
});
</script>

<style lang="scss" scoped>
.divider {
    border: 1px solid $color-bg-hover;
}
.noti-item {
    display: flex;
    align-items: center;
    border-radius: $app-border-radius-sm;
    &:hover {
        background: $color-bg-hover;
    }
}
.longNotiStyle {
    border: 2px solid $color-bg-hover;
    margin-bottom: $long-noti-style-mar-b;
    padding: $long-noti-style-pad !important;
    &:hover {
        transform: scale(1.05);
        background: none;
        border-color: $color-brand;
    }
}
.unread {
    background: $color-light-blue;
}
.content-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__title-text {
        font-weight: bold;
        font-size: 16px;
        width: 65%;
    }
    &__moment-text {
        font-size: 12px;
        color: $color-light;
        width: 30%;
        text-align: end;
    }
}
.content-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // &__doneIcon {
    //     color: $color-brand-alt;
    // }
    // &__invincible {
    //     visibility: hidden;
    // }
}
.noti-item-icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $noti-item-icon-width;
    height: $noti-item-icon-height;
    border-radius: $noti-item-icon-border-radius;
}
.badge[data-count]:after {
    position: absolute;
    right: $noti-item-badge-right;
    top: $noti-item-badge-top;
    width: $noti-item-badge-width;
    height: $noti-item-badge-height;
    border-radius: $noti-item-badge-border-radius;
    background: $color-brand-alt;
    content: attr(data-count);
}
</style>
