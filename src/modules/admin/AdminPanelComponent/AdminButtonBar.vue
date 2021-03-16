<template>  
  <div class="top-button-bar">
    <FlatButton
      v-on:click="changeTab(0)"
      v-bind:enabled="currentTab === 0"
      text="Overview"
    />
    <FlatButton
      v-on:click="changeTab(1)"
      v-bind:enabled="currentTab === 1"
      text="Users"
    />
    <FlatButton
      v-on:click="changeTab(2)"
      v-bind:enabled="currentTab === 2"
      text="Events"
    />
    <FlatButton
      v-on:click="changeTab(3)"
      v-bind:enabled="currentTab === 3"
      text="Feedback"
    />
  </div>
  <div class="bottom-div">
    <feedback-panel v-if="currentTab === 3"></feedback-panel>
    <user-panel v-if="currentTab === 1"></user-panel>
  </div>
</template>

<script>
import FlatButton from '@/modules/admin/FlatButton.vue';
export default {
  name:'AdminButtonBar',
  components:{FlatButton},
  props:{
    onTabChange:{
      type:Function,
      required:true,
    }
  },
  data() {
    return {
      currentTab: 0,
    };
  },
  methods: {
    changeTab(number) {
      this.currentTab = number;
      this.onTabChange(number)
    },
  },        
}
</script>

<style>
.top-button-bar{
  margin:8px;
  display: flex;
  flex-direction: row;
}
</style>


