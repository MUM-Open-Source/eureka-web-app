<template >
  <div class="menu" @click="toggleSubMenu">
      <div id="top-nav__name" class="body mar--1">{{ displayName }}</div>
      <img class="top-nav__profile-img" src="@/assets/profile-user.svg" />
      <!-- <a href="#">
          {{ title }}
      </a> -->
    <div class ="sub-menu" id = "subMenu"  >
        <div v-for="(item, i) in items" :key="i" class="sub-menu__item">
                    <router-link :to="{ name: item.link}">
                    <div class="sub-menu__item--title"><img class='sub-menu__item--image' :src="item.svg_src" />{{ item.title }}
                    </div>
                    <!-- TODO: Adds icon for each sub menu -->
                    <!-- <img class='sub-menu__item--image' :src="item.svg_src" /> -->

                    </router-link>

        </div>
    </div>
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
        //toggles submenu when clicks 
        function toggleSubMenu(){
            var subMenu = document.getElementById("subMenu");
            if (subMenu.style.display === "none" || subMenu.style.display === "" ) {
                subMenu.style.display = "block";
                } 
            else{
                subMenu.style.display = "none";
            }
        }
        // Close the dropdown menu if the user clicks outside of it
        window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
            }
        }
        }

           return{
               checkSubMenu,
               displayName,
               toggleSubMenu
           }
               

        }
    
}
</script>
<style lang="scss" scoped>
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


@import '@/styles/components/top_nav';
    
</style>