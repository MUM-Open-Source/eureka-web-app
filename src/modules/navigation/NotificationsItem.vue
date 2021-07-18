<template>
    <div class="noti-item" :class="{ unread: !readStatus, longNotiStyle: longNoti }">
        <div :style="{ display: 'flex' }">
            <div class="noti-item-icon " :class="{ badge: !readStatus }" :style="{ backgroundColor: iconColor }" data-count="">
                <i class="material-icons-outlined">
                    {{ icon }}
                </i>
            </div>
            <div :style="{ flex: '1' }">
                <div class="content-title">
                    <h2 class="title-text">{{ title }}</h2>
                    <span class="moment-text">
                        {{ moment }}
                    </span>
                </div>
                <div class="content-body">
                    <p :style="{ fontSize: '14px' }">
                        {{ bodyText }}
                    </p>
                    <i class="material-icons-outlined" @click="readIndividual">
                        {{ icon }}
                    </i>
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
        longNoti: { type: Boolean }
    },
    setup(props) {
        const readIndividual = () => store.dispatch('readIndividualNotification', { notiId: props.id, category: props.category });
        return { readIndividual };
    }
};
</script>

<style lang="scss" scoped>
.noti-item {
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        background: $color-ghost;
    }
}
.longNotiStyle {
    border: 2px solid $color-ghost;
    margin-bottom: 10px;
    padding: 25px !important;
    &:hover {
        transform: scale(1.05);
        background: none;
        border-color: $color-brand;
    }
}
.divider {
    border: 1px solid #e2e8ee;
    border-radius: 5px;
    margin: 10px 0;
}
.content-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    align-items: center;
}
.content-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.moment-text {
    font-size: 12px;
    color: $color-light;
    width: 30%;
    text-align: end;
}
.title-text {
    font-size: 16px;
    width: 65%;
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
.unread {
    background: #e5f4fd;
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
