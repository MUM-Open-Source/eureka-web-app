<template>
    <div
        class="noti-item"
        :class="{ unread: !readStatus, longNotiStyle: longNoti }"
    >
        <div :style="{ display: 'flex' }">
            <div
                class="noti-item-icon "
                :class="{ badge: !readStatus }"
                :style="{ backgroundColor: iconColor }"
                data-count=""
            >
                <fa :icon="icon" :style="{ fontSize: '18px' }" />
            </div>
            <div :style="{ flex: '1' }">
                <div class="content-title">
                    <h2 class="content-title__title-text">{{ title }}</h2>
                    <span class="content-title__moment-text">
                        {{ moment }}
                    </span>
                </div>
                <div class="content-body">
                    <p :style="{ fontSize: '14px' }">
                        {{ bodyText }}
                    </p>
                    <fa
                        icon="mail-bulk"
                        :class="[
                            readStatus
                                ? 'content-body__invincible'
                                : 'content-body__doneIcon',
                        ]"
                        @click="readIndividual"
                    />
                </div>
            </div>
        </div>
    </div>
    <hr class="divider" v-if="!longNoti" />
</template>

<script>
import store from '@/store';
export default {
    name: 'NotificationsItem',
    props: {
        id: { type: String, required: true },
        icon: { type: String, required: true },
        category: { type: String, required: true },
        title: { type: String, required: true },
        bodyText: { type: String, required: true },
        moment: { type: String, required: true },
        readStatus: { type: Boolean, required: true },
        iconColor: { type: String, required: true },
        longNoti: { type: Boolean },
    },
    setup(props) {
        const readIndividual = () =>
            store.dispatch('readIndividualNotification', {
                notiId: props.id,
                category: props.category,
            });
        return { readIndividual };
    },
};
</script>

<style lang="scss" scoped>
.divider {
    border: 1px solid #e2e8ee;
    border-radius: 5px;
    margin: 10px 0;
}
.noti-item {
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        background: $color-bg-hover;
    }
}
.longNotiStyle {
    border: 2px solid $color-bg-hover;
    margin-bottom: 10px;
    padding: 25px !important;
    &:hover {
        transform: scale(1.05);
        background: none;
        border-color: $color-brand;
    }
}
.unread {
    background: #e5f4fd;
}
.content-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    align-items: center;
    &__title-text {
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
    &__doneIcon {
        color: #03bb40;
    }
    &__invincible {
        visibility: hidden;
    }
}
.noti-item-icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 15px;
}
.badge[data-count]:after {
    position: absolute;
    right: 0%;
    top: 5%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ff0000;
    content: attr(data-count);
}
</style>
