<template>
  <div class="outer-div">
    <div class="inner-div" v-if="isAdmin">
      <div class="heading text--center mar__t--3">Mission Control</div>
      <admin-button-bar
        :onTabChange="(num) => changeTabs(num)"
      />
      <div class="panel-div mar__t--1">
        <overview-panel v-if="tab === 0" />
        <user-panel v-if="tab === 1" />
        <events-panel v-if="tab === 2" />
        <feedback-panel v-if="tab === 3" />
      </div>
    </div>
    <div class="inner-div" v-else>
      <div class="heading">You need admin access</div>
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
import { computed, ref } from "vue";

export default {
  components: {
    AdminButtonBar,
    FeedbackPanel,
    OverviewPanel,
    UserPanel,
    EventsPanel,
  },
  name: "Admin",
  setup() {
    // to keep track of the tab
    const tab = ref(0);

    const changeTabs = (newTab) => {
      tab.value = newTab;
    }

    const isAdmin = computed(() => store.state.user_data?.roles.includes("admin"));
    
    return {
      tab,
      changeTabs,
      isAdmin
    }
  }
};
</script>


<style lang="scss">
.outer-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - $top-nav-height);
  width: 100%;
  .inner-div {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 95%;
    height: 100%;
    .panel-div {
      overflow-y: scroll;
      height: calc(100% - 16px);
      width: calc(100% - 16px);
    }
  }
}

</style>


