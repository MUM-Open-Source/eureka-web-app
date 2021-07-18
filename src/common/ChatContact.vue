<template>
    <div class="container">
        <div class="wrapper">
        <div class="left">
            <img class="contact_profile_img" src="@/assets/default-user-image.png" />
        </div>
        <div class="right">
            <span class="contact_name">
            {{contact_name}}
             </span>
        </div>
        </div>
        
    </div>
</template>

<script lang= 'ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
      contact_name : {
          type: String,
          default: 'fefwfwf'
      },
      contact_image: {
          type: String,
          default: '@/assets/default-user-image.png'
      }

  },

   
})
</script>

<style scoped>

.container {
    display:inline-block;
    width:100%;
    padding:20px;
}

.wrapper {
    display: flex; 
    align-items: center;
}

.container:hover:not(.active) {
    background-color: #555;
}

.wrapper a.active {
  background-color: blue;
}
.contact_profile_img {
    width: 80px;
    border-radius: 50%;
}

.contact_name {
    font-size:20px;
    color:#000;
    padding:30px;
    margin-top:200px;
}









</style>