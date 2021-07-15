<template>
    <div class="noti-item" :class="{ unread: !readStatus }">
        <div :style="{ display: 'flex' }">
            <div class="noti-item-icon " :class="{ badge: !readStatus }" data-count="">
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
                <p :style="{ fontSize: '14px' }">
                    {{ bodyText }}
                </p>
            </div>
        </div>
    </div>
    <hr class="divider" />
</template>

<script>
export default {
    name: 'NotificationsItem',
    props: {
        icon: { type: String, required: true },
        title: { type: String, required: true },
        bodyText: { type: String, required: true },
        moment: { type: String, required: true },
        readStatus: { type: Boolean, required: true }
    }
};
</script>

<style lang="scss" scoped>
.noti-item {
    padding: 10px;
    border-radius: 10px;
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
    background: #71c9a2;
}
.unread {
    background: $color-ghost;
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
