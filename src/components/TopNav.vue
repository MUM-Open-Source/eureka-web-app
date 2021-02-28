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
        <div class="top-nav__right mar--2">
            <img class="top-nav__icon" src="@/assets/notification-icon.svg" v-if="isLoggedIn" />
            <Dropdown class = "dropdown" :items="menu_items.items" v-if="isLoggedIn">
                <div class="top-nav__right--user">
                    <div id="top-nav__name" class="body mar--1">{{ displayName }}</div>
                    <img class="top-nav__profile-img" src="@/assets/profile-user.svg" />
                </div>
            </Dropdown>
        </div>
    </div>
</template>

<script>
import Dropdown from '@/components/Dropdown';
import store from '@/store';
import { computed, reactive } from 'vue';

export default {
    name: 'TopNav',
    components: { Dropdown },
    setup() {
        // open and close side nav
        const toggleSideNavState = () => {
            store.dispatch('toggleSideNavState');
        }
        
        // check if user is logged in
        const isLoggedIn = computed(() => store.state.user !== null);

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

        //list of menu items to be displayed
        const menu_items = reactive({
            items: [{
                title: 'User Info',
                link:'Profile',
                svg_src:require("@/assets/profile-user-icon.svg")
            },
            {
                title: 'Waves from talents',
                link: 'WavesFromTalent',
                svg_src:require("@/assets/profile-talent-icon.svg")
            },
            {
                title: 'Waves from mentors',
                link: 'WavesFromMentors',
                svg_src:require("@/assets/profile-mentor-icon.svg")
            }
            ]

            })




        return {
            displayName,
            toggleSideNavState,
            isLoggedIn,
            topNavWidth,
            menu_items
        }
    },
}
</script>

<style lang='scss' scoped>
.dropdown{
  display:flex;
  margin-top: 2px;
  margin-right:5px;
}
.loading__center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
@import '@/styles/components/top_nav';
</style>