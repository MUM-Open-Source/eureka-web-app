<template>
    <div class="wrapper-container page-pad">
        <div class="wrapper-container__header">
            <div class="subheading">Your Notifications</div>
            <select
                name="filter"
                class="selector"
                @change="onChangeFilter($event)"
            >
                <option value="all">All</option>
                <option value="unread">Unread</option>
            </select>
        </div>
        <div class="content">
            <div
                class="content__content-available"
                v-if="filteredNotifications.length"
            >
                <NotificationsCategories
                    :notifications="filteredNotifications"
                    :longNoti="true"
                />
            </div>
            <div class="content__empty-content" v-else>
                <fa icon="bell" class="no-noti" />
                <div class="subheading mar__t--1">Notifications Zero</div>
                <div class="body mar__t--1" :style="{ textAlign: 'center' }">
                    Hmm, looks like it's a bit lonely here, come back another
                    time to check.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store';
import { ref } from '@vue/reactivity';
import NotificationsCategories from '@/modules/notifications/NotificationsCategories.vue';
import { computed } from '@vue/runtime-core';
export default {
    name: 'Notifications',
    components: { NotificationsCategories },
    setup() {
        // Set current state of filter (ensure that reactive notifications work)
        const currentFilter = ref('all');
        const notifications = ref(store.state.notifications);
        const filteredNotifications = computed(() =>
            notifications.value.filter(notification =>
                currentFilter.value == 'all'
                    ? true
                    : notification.read_status == false
            )
        );
        const onChangeFilter = e =>
            (currentFilter.value =
                e.target.options[e.target.options.selectedIndex].value);
        return { filteredNotifications, onChangeFilter };
    },
};
</script>

<style lang="scss" scoped>
.wrapper-container {
    max-width: 1000px;
    padding: 20px; // override to reduce wasted space
    margin: 0 auto;
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
.content {
    height: 550px;
    margin: 20px auto 0 auto;
    padding: 25px;
    border-radius: 15px;
    border: 2px solid $color-bg-hover;
    overflow: auto;
    &__content-available {
        width: 75%;
        height: 100%;
        margin: 0 auto;
    }
    &__empty-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
.no-noti {
    font-size: 200px;
    color: $color-brand;
    margin-bottom: 20px;
}
.selector {
    padding: 5px 10px;
    border: 1px solid #ccc;
    width: 100px;
    border-radius: 8px;
}
@media (max-width: 48em) {
    .content__content-available {
        width: 100%;
    }
}
</style>
