<template >
    <div class="sub-menu" id="subMenu" >
        <div v-for="(item, i) in menu_items" :key="i" class="sub-menu__item">
            <router-link :to="{ name: item.component_name}">
                <div class="sub-menu__item--title">
                    <img class='sub-menu__item--image' :src="item.icon_src" />
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
        //list of menu items to be displayed
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
#subMenu {
    display: block;
}
.menu-body {
    display: flex;
    align-items: center;
}
.sub-menu {
    display: none;
    position:absolute;
    background-color:white;
    top: 100%;
    right: 1%;
    width: max-content;
    border-radius: 0px 0px 16px 16px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);

    &__item{
        width: 100%;
        height: 100%;
        border:1px solid rgba(0, 0, 0, 0.12);
        &--image{
            height: 20px;
            margin-top:10px;
            margin-right: 12px;
            
        }
        &--title{
            padding: 10px 12px;
        }

    }
    &__item:hover{
        background:rgba(0, 0, 0, 0.08);
    }
    &__item:last-child:hover{
        background:rgba(0, 0, 0, 0.08);
        border-radius: 0px 0px 16px 16px;
        
    }

}

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


// @import '@/styles/components/top_nav';
    
</style>