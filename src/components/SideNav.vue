<template>
  <div id="sidenav" :class="showOrHide">
    <router-link :to="{ name: 'BrowseEvents' }">
      <div class="side-nav__group">
        <img class="side-nav__icon" src="@/assets/events-icon.svg" />
        <div class="side-nav__text">Browse Events</div>
      </div>
    </router-link>
    <router-link :to="{ name: 'FindTalent' }">
      <div class="side-nav__group">
        <img class="side-nav__icon" src="@/assets/talent-icon.svg" />
        <div class="side-nav__text">Find Talent</div>
      </div>
    </router-link>
    <router-link :to="{ name: 'FindMentor' }">
      <div class="side-nav__group">
        <img class="side-nav__icon" src="@/assets/mentor-icon.svg" />
        <div class="side-nav__text">Find Mentors</div>
      </div>
    </router-link>
    <router-link
      :to="{ name: 'Admin' }"
      v-if="store.state.user_data?.roles[0] === 'admin'"
    >
      <div class="side-nav__group">
        <img class="side-nav__icon" src="@/assets/info-icon.svg" />
        <div class="side-nav__text">Mission Control</div>
      </div>
    </router-link>
    <router-link :to="{ name: 'About' }">
      <div class="side-nav__group">
        <img class="side-nav__icon" src="@/assets/info-icon.svg" />
        <div class="side-nav__text">About Eureka</div>
      </div>
    </router-link>
    <router-link :to="{ name: 'Feedback' }">
      <div class="side-nav__group side-nav__group--bottom">
        <img class="side-nav__icon" src="@/assets/feedback-icon.svg" />
        <div class="side-nav__text">Provide Feedback</div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed } from "vue";
import store from "@/store";

export default {
  name: "SideNav",
  setup() {
    const showOrHide = computed(() =>
      store.state.isSideNavCollapsed ? "side-nav__hide" : "side-nav__show"
    );
    if (!store.state.user_data) {
      store.dispatch("fetchCurrentUserFromDB");
    }
    return {
      store,
      showOrHide,
    };
  },
};
</script>

<style lang='scss' scoped>
@import "@/styles/components/side_nav";
</style>
