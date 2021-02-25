<template>
  <div class="outer-div">
    <h1 style="padding-bottom:20px;padding-left:5px">Mission Control</h1>
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
        text="Feedbacks"        
      />
    </div>
    <div class="bottom-div">hello</div>
  </div>
</template>

<script>
import FlatButton from "@/components/FlatButton";
export default {
  name: "Admin",
  components: { FlatButton },
  data() {
    return {
      currentTab: 0,
    };
  },
  methods: {
    changeTab(number) {
      this.currentTab = number;
    },
  },
};
</script>


<style lang="css">
.overview {
  width: 100%;
}

.outer-div{
  padding: 40px;
}

.top-button-bar {    
  flex-direction: row;
  display: flex;  
}
.bottom-div {  
  display: flex;
  flex-direction: column;  
  height: 100%;
  border-radius: 10px;  
  margin-top: 10px;
  padding: 20px;
  background-color: #f0f0f0;    
}
</style>