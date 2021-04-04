<template >
    <div class="user-menu" >
        <div class="user-menu__items">
            <div v-for="(item, i) in menu_items" :key="i" class="user-menu__items--loop">
                <router-link :to="{ name: item.component_name}">
                    <div class="user-menu__item pad--2">
                        <img class='user-menu__item--icon' :src="item.icon_src" />
                        <div class="body">{{ item.title }}</div>
                    </div>
                </router-link>
            </div>
            <div class="user-menu__item pad--2 cursor__pointer" @click="handleLogout">
                <img class='user-menu__item--icon' src="@/assets/logout-icon.svg" />
                <div class="body">Logout</div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store';

export default {
    name: 'UserMenu',

    setup() {
        // logging out the user
        const handleLogout = () => {
            store.dispatch('signoutUser');
        }

        // list of menu items to be displayed
        const menu_items = [
            {
                title: 'User Profile',
                component_name:'Profile',
                icon_src: require("@/assets/profile-user-icon.svg")
            },
            {
                title: 'Waves from talents',
                component_name: 'WavesFromTalent',
                icon_src: require("@/assets/profile-talent-icon.svg")
            },
            {
                title: 'Waves from mentors',
                component_name: 'WavesFromMentors',
                icon_src: require("@/assets/profile-mentor-icon.svg")
            }
        ]

        return { 
            handleLogout,
            menu_items
        }

    }
}
</script>

<style lang="scss" scoped>
.user-menu {
    @include shadow;
    position: absolute;
    top: $user-menu-top;
    right: $user-menu-right;
    border-radius: $app-border-radius;
    background-color: $color-white;

    &__items {
        &--loop:first-child .user-menu__item {
            border-radius: $app-border-radius $app-border-radius 0 0;
        }
        &:last-child > .user-menu__item {
            border-radius: 0 0 $app-border-radius $app-border-radius;
        }
    }
    &__item{
        display: flex;
        align-items: center;
        &--icon{
            width: $user-menu-icon-width;
            margin-right: $user-menu-icon-margin-right;
        }
        &:hover{
            background: $color-bg-hover;
        }
    }
}
</style>