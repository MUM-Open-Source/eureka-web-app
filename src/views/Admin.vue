<template>
  <div class="outer-div">
    <div class="inner-div" v-if="isAdmin()">
      <h1 style="padding: 8px">Mission Control</h1>
      <admin-button-bar
        :onTabChange="(num) => changeTabs(num)"
      ></admin-button-bar>
      <div class="panel-div">
        <overview-panel v-if="tab === 0"></overview-panel>
        <user-panel v-if="tab === 1"></user-panel>
        <events-panel v-if="tab === 2"></events-panel>
        <feedback-panel v-if="tab === 3"></feedback-panel>
      </div>
    </div>
    <div class="inner-div" v-if="!isAdmin()">
      <h1>You need admin access</h1>
    </div>
  </div>
</template>

<script>
import AdminButtonBar from "../components/AdminPanelComponent/AdminButtonBar.vue";
import EventsPanel from "../components/AdminViews/EventsPanel.vue";
import FeedbackPanel from "../components/AdminViews/FeedbackPanel.vue";
import OverviewPanel from "../components/AdminViews/OverviewPanel.vue";
import UserPanel from "../components/AdminViews/UserPanel.vue";
import store from "@/store";
export default {
  components: {
    AdminButtonBar,
    FeedbackPanel,
    OverviewPanel,
    UserPanel,
    EventsPanel,
  },
  name: "Admin",
  data() {
    return {
      tab: 0,
    };
  },
  methods: {
    changeTabs(newNumber) {
      this.tab = newNumber;
    },
    isAdmin() {
      if (!store.state.user_data) store.commit("fetchCurrentUserFromDB");
      return store.state.user_data.roles[0] === "admin";
    },
  },
};
</script>


<style lang="css">
.outer-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
  width: 100%;
}

.inner-div {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 95%;
  height: 95%;
}

.panel-div {
  margin: 8px;
  overflow-y: scroll;
  height: calc(100% - 16px);
  width: calc(100% - 16px);
}
</style>


