<template >
  <div class="menu-item" @click="checkSubMenu.isOpen =!checkSubMenu.isOpen">
      <div id="top-nav__name" class="body mar--1">{{ displayName }}</div>
      <img class="top-nav__profile-img" src="@/assets/profile-user.svg" />
      <a href="#">
          {{ title }}
      </a>
      <transition name="fade" appear>
        <div class ="sub-menu" v-if="checkSubMenu.isOpen">
            <div v-for="(item, i) in items" :key="i" class="sub-menu-item">
                     <router-link :to="{ name: item.link}">
                        <div >{{ item.title }}</div>
                        <!-- TODO: Adds icon for each sub menu -->
                        <!-- <img class='sub-menu-images' :src="item.svg_src" /> -->

                     </router-link>

            </div>
        </div>
      </transition>
  </div>
</template>
<script>
import { reactive } from 'vue'
import store from '@/store';
import { computed } from 'vue';
export default {
    name: 'Dropdown',
    props: ['title', 'items'],
    setup(){

        //check if if menu is clicked
        const checkSubMenu = reactive({
               isOpen: false
           })
        // display the logged in user
        const displayName = computed(() => 
            store.state.user_data
            ? store.state.user_data.full_name
            : 'Login'
        );

           return{
               checkSubMenu,
               displayName
           }
               

        }
    
}
</script>
<style lang="scss" scoped>
.menu-item .sub-menu {
    position:absolute;
    background-color:white;
    top: 100%;
    right: 1%;
    width: max-content;
    border-radius: 0px 0px 16px 16px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 8px 16px ;
}
.sub-menu-item {
    padding: 8px;

}

@import '@/styles/components/top_nav';
    
</style>