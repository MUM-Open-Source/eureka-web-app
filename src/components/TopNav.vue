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
                <img class="top-nav__logo" src="@/assets/logo.svg"/>
            </router-link>
        </div>
<<<<<<< HEAD
        <div class="top-nav__right mar--2" @click='toggleUserMenuState'>
            <img class="top-nav__icon" src="@/assets/notification-icon.svg" v-if="isLoggedIn" />
            <div class="top-nav__right--user cursor__pointer">
                <div id="top-nav__name" class="body mar--1">{{ displayName }}</div>
                <img class="top-nav__profile-img" src="@/assets/profile-user.svg" />
            </div>
            <UserMenu v-if="isUserMenuShown" />
=======
        <div class="top-nav__right mar--2">
            <img id="bell" class="top-nav__icon" src="@/assets/notification-icon.svg" v-if="isLoggedIn" />
                <Dropdown class = "dropdown" :items="menu_items.items">
                    <div class="top-nav__right--user">
                        <div id="top-nav__name" class="body mar--1">{{ displayName }}</div>
                        <img class="top-nav__profile-img" src="@/assets/profile-user.svg" />
                    </div>
                </Dropdown>
>>>>>>> top-nav
        </div>
    </div>
</template>

<script>
import UserMenu from '@/components/UserMenu';
import store from '@/store';
import router from '@/router';
import { computed, ref } from 'vue';

export default {
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
<<<<<<< HEAD
        // show and hide user menu
        const toggleUserMenuState = () => {
            if (isLoggedIn.value) {
                isUserMenuShown.value = !isUserMenuShown.value;
            } else {
                router.push({ name: 'Login' });
            }
        }
=======

        // check if user is logged in
        const isLoggedIn = computed(() => store.state.user !== null);
>>>>>>> top-nav

        // display the logged in user
        const displayName = computed(() =>
            store.state.user_data
            ? store.state.user_data.full_name
            : 'Login'
        );

        // identify nav width
        const topNavWidth = computed(() =>
            store.state.isSideNavCollapsed
            ? 'top-nav__full'
            : 'top-nav__reduced'
        )

        return {
            displayName,
            toggleSideNavState,
            isLoggedIn,
            isUserMenuShown,
            toggleUserMenuState,
            topNavWidth
        }
    },
}
</script>

<style lang='scss' scoped>
@import '@/styles/components/top_nav';
</style>
