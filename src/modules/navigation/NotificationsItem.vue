<template>
    <div class="noti-item" :class="{ unread: !readStatus }">
        <div :style="{ display: 'flex' }">
            <div class="noti-item-icon " :class="{ badge: !readStatus }" :style="{ backgroundColor: iconColor }" data-count="">
                <i class="material-icons-outlined">
                    {{ icon }}
                </i>
            </div>
            <div :style="{ flex: '1' }">
                <div class="content-title">
                    <h2 :style="{ fontSize: '16px' }">{{ title }}</h2>
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
    <hr class="divider" />
</template>

<script>
import store from '@/store';
export default {
    name: 'NotificationsItem',
    props: {
        id: { type: String, required: true },
        icon: { type: String, required: true },
        title: { type: String, required: true },
        bodyText: { type: String, required: true },
        moment: { type: String, required: true },
        readStatus: { type: Boolean, required: true },
        iconColor: { type: String, required: true }
    },
    setup(props) {
        const readIndividual = () => store.dispatch('readIndividualNotification', props.id);
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
