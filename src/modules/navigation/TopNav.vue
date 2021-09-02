<template>
    <div class="top-nav" :class="topNavWidth">
        <div class="top-nav__wrapper">
            <div class="top-nav__left">
                <img
                    class="top-nav__icon cursor__pointer"
                    @click="toggleSideNavState"
                    src="@/assets/menu-icon.svg"
                    v-if="isLoggedIn"
                />
                <router-link :to="{ name: 'Home' }">
                    <img class="top-nav__logo" src="@/assets/logo.png" />
                </router-link>
            </div>
            <div class="top-nav__right">
                <div
                    class="noti-icon mar__r--1 pad--1 cursor__pointer"
                    data-count=""
                    :class="{ badge: unreadNotifications }"
                    @click="modalController('notification')"
                    v-if="isLoggedIn"
                >
                    <fa icon="bell" size="lg" />
                </div>
                <div
                    @click="modalController('userMenu')"
                    class="top-nav__right--user cursor__pointer"
                >
                    <div id="top-nav__name" class="body mar--2">
                        {{ displayName }}
                    </div>
                    <img class="top-nav__profile-img" :src="displayPic" />
                </div>
            </div>
            <NotificationsModal
                @viewAllClicked="viewAllClicked"
                v-if="notiState"
            />
            <UserMenu
                @userMenuButtonClick="modalController('userMenu', $event)"
                v-if="isUserMenuShown"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import store from '@/store';
import UserMenu from '@/modules/navigation/UserMenu.vue';
import NotificationsModal from '@/modules/notifications/NotificationsModal.vue';
export default defineComponent({
    name: 'TopNav',
    components: { UserMenu, NotificationsModal },
    setup() {
        const unreadNotifications = computed(() =>
            store.state.notifications.some(noti => noti.read_status == false)
        );
        // controls notification click state
        const notiState = ref(false);
        // to help display user menu
        let isUserMenuShown = ref(false);
        // check if user is logged in
        const isLoggedIn = computed(() => store.state.user !== null);
        // control individual modal opening
        const modalController = (currentTab: string) => {
            if (!isLoggedIn.value) {
                store.dispatch('signUpUser');
                return;
            }
            switch (currentTab) {
                case 'userMenu':
                    isUserMenuShown.value = !isUserMenuShown.value;
                    notiState.value = false;
                    break;
                case 'notification':
                    notiState.value = !notiState.value;
                    isUserMenuShown.value = false;
                    break;
            }
        };
        const viewAllClicked = () => (notiState.value = false);
        // open and close side nav
        const toggleSideNavState = () => {
            store.dispatch('toggleSideNavState');
        };
        // display the logged in user
        const displayName = computed(() =>
            store.state.user_data ? store.state.user_data.full_name : 'Login'
        );
        // display the logged in user's profile pic
        const displayPic = computed(() =>
            store.state.user_data
                ? store.state.user_data.image_url
                : require('@/assets/default-user-image.png')
        );
        // identify nav width
        const topNavWidth = computed(() =>
            store.state.isSideNavCollapsed
                ? 'top-nav__full'
                : 'top-nav__reduced'
        );
        return {
            displayName,
            displayPic,
            toggleSideNavState,
            isLoggedIn,
            isUserMenuShown,
            modalController,
            topNavWidth,
            notiState,
            unreadNotifications,
            viewAllClicked,
        };
    },
});
</script>

<style lang="scss" scoped>
.top-nav {
    @include shadow--small;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;
    height: $top-nav-height;
    background-color: $color-white;
    &__full {
        width: 100%;
    }
    &__reduced {
        width: calc(100% - 160px);
    }
    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
    }
    &__left,
    &__right {
        display: flex;
        align-items: center;
        .noti-icon {
            position: relative;
            border-radius: $app-border-radius-sm;
            &:hover {
                background: $color-bg-hover;
            }
        }
        .badge[data-count]:after {
            position: absolute;
            top: $top-nav-badge-pos;
            right: $top-nav-badge-pos;
            width: $top-nav-badge-width;
            height: $top-nav-badge-height;
            border-radius: $top-nav-badge-border-radius;
            background: $color-brand;
            content: attr(data-count);
        }
    }
    &__icon {
        width: $top-nav-icon-width;
        margin-left: $top-nav-elem-margin;
    }
    &__logo,
    &__profile-img {
        height: $top-nav-img-height;
        margin-right: $top-nav-elem-margin;
    }
    &__logo {
        margin-left: $top-nav-elem-margin;
    }
    &__right--user {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    &__profile-img {
        border-radius: 50%;
    }
}
@media (max-width: 576px) {
    #top-nav__name {
        display: none;
    }
    #bell {
        margin-left: 0;
        margin-right: $top-nav-bell-margin;
    }
}
@media (max-width: 326px) {
    .top-nav__logo {
        display: none;
    }
}
</style>
