<template>
    <div class="top-nav" :class='topNavWidth'>
        <div class="top-nav__left">
            <img
                class="top-nav__icon cursor__pointer"
                @click='toggleSideNavState'
                src="@/assets/menu-icon.svg"
                v-if="isLoggedIn"
            />
            <router-link :to="{ name: 'Home'}">
                <img class="top-nav__logo" src="@/assets/logo.png"/>
            </router-link>
        </div>
        <div class="top-nav__right mar--2" @click='toggleUserMenuState'>
            <!-- <img id="bell" class="top-nav__icon" src="@/assets/notification-icon.svg" v-if="isLoggedIn" /> -->
            <div class="top-nav__right--user cursor__pointer">
                <div id="top-nav__name" class="body mar--1">{{ displayName }}</div>
                <img class="top-nav__profile-img" :src='displayPic' />
            </div>
            <UserMenu v-if="isUserMenuShown" />
        </div>
    </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import UserMenu from '@/modules/navigation/UserMenu.vue';
import store from '@/store';
import router from '@/router';

export default defineComponent({
    name: 'TopNav',
    components: { UserMenu },
    setup() {
        // check if user is logged in
        const isLoggedIn = computed(() => store.state.user !== null);
        // to help display user menu
        let isUserMenuShown = ref(false);

        // open and close side nav
        const toggleSideNavState = () => {
            store.dispatch('toggleSideNavState');
        }
        // show and hide user menu
        const toggleUserMenuState = () => {
            if (isLoggedIn.value) {
                isUserMenuShown.value = !isUserMenuShown.value;
            } else {
                router.push({ name: 'Login' });
            }
        }

        // display the logged in user
        const displayName = computed(() =>
            store.state.user_data
            ? store.state.user_data.full_name
            : 'Login'
        );

        // display the logged in user's profile pic
        const displayPic = computed(() =>
            store.state.user_data
            ? store.state.user_data.image_url
            // @ts-ignore
            : require('@/assets/default-user-image.png')
        );

        // identify nav width
        const topNavWidth = computed(() =>
            store.state.isSideNavCollapsed
            ? 'top-nav__full'
            : 'top-nav__reduced'
        )

        return {
            displayName,
            displayPic,
            toggleSideNavState,
            isLoggedIn,
            isUserMenuShown,
            toggleUserMenuState,
            topNavWidth
        }
    },
})
</script>

<style lang='scss' scoped>
.top-nav {
    @include shadow--small;
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;
    height: $top-nav-height;
    align-items: center;
    justify-content: space-between;
    background-color: $color-white;
    &__full {
        width: 100%;
    }
    &__reduced {
        width: calc(100% - 160px);
    }
    &__left, &__right {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    &__icon {
        width: $top-nav-icon-width;
        margin-left: $top-nav-elem-margin;
    }
    &__logo, &__profile-img {
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
    &__profile-img{
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
