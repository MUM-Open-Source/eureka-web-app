<template >
    <div class="user-menu" >
        <div v-for="(item, i) in menu_items" :key="i" class="user-menu__items">
            <router-link :to="{ name: item.component_name}">
                <div class="user-menu__item pad--2">
                    <img class='user-menu__item--icon' :src="item.icon_src" />
                    <div class="body">{{ item.title }}</div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserMenu',

    setup(){
        // list of menu items to be displayed
        const menu_items = [
            {
                title: 'User Info',
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

        return { menu_items }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/user_menu';
</style>