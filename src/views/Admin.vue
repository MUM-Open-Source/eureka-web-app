<template>
  <div class="outer-div">
    <div style="width: 100%; height: 100px">
      <h1 style="padding-bottom: 20px">Mission Control</h1>
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
    </div>

    <div class="bottom-div">
      <feedback-panel v-if="currentTab === 3"></feedback-panel>
    </div>
  </div>
</template>

<script>
import FlatButton from "@/components/FlatButton";
import FeedbackPanel from "./AdminViews/FeedbackPanel.vue";

export default {
  name: "Admin",
  components: { FlatButton, FeedbackPanel },
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

.outer-div {
  padding: 40px;
  display: flex;
  flex-direction: column;
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
}

@media screen and (max-width: 500px) {
  .top-button-bar {
    width: 100%;
    flex-direction: row;
    display: flex;
    align-items: center;
  }
  h1 {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }
  .outer-div {
    display: flex;
    flex-direction: column;
  }
}
</style>