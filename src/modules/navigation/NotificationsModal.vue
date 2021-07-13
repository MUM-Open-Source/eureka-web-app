<template>
    <div class="modal">
        <div class="modal__header">
            <h1 class="subheading">Notifications</h1>
            <button class="text--primary cta">Mark all as read</button>
        </div>
        <hr class="divider" />
        <NotificationsItem
            icon="celebration"
            title="An event was added"
            bodyText="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus vel officia ipsum harum architecto pariatur, voluptatem porro deleniti impedit optio, "
            moment="5 mins ago"
        />
    </div>
</template>

<script>
import NotificationsItem from './NotificationsItem.vue';

export default {
    name: 'NotificationsModal',
    components: { NotificationsItem }
};
</script>

<style lang="scss" scoped>
.divider {
    border: 1px solid #e2e8ee;
    border-radius: 5px;
    margin: 15px 0;
}
.cta {
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    border: 0px;
    border-radius: 5px;
    padding: 5px 10px;
    background-color: transparent;
    &:hover {
        background-color: $color-ghost;
    }
}

.modal {
    @include shadow;
    padding: 25px;
    position: absolute;
    z-index: 50;
    background: $color-white;
    width: 350px;
    height: 500px;
    top: $user-menu-top + 25;
    right: $user-menu-right;
    border-radius: 10px;
    overflow-y: scroll !important;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }
}
</style>
