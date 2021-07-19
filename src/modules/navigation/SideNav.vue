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
    <router-link :to="{ name: 'PeerReview' }">
      <div class="side-nav__group">
        <img class="side-nav__icon" src="@/assets/mentor-icon.svg" />
        <div class="side-nav__text">Peer Review</div>
      </div>
    </router-link>
    <router-link :to="{ name: 'PRTeamOverview' }">
      <div class="side-nav__group">
        <img class="side-nav__icon" src="@/assets/mentor-icon.svg" />
        <div class="side-nav__text">PRTeamOverview</div>
      </div>
    </router-link>
    <router-link :to="{ name: 'PRTeamList' }">
      <div class="side-nav__group">
        <img class="side-nav__icon" src="@/assets/mentor-icon.svg" />
        <div class="side-nav__text">PRTeamList</div>
      </div>
    </router-link>
    <router-link :to="{ name: 'Admin' }" v-if="userIsAdmin">
      <div class="side-nav__group">
        <img class="side-nav__icon" src="@/assets/info-icon.svg" />
        <div class="side-nav__text">Mission Control</div>
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
    const userIsAdmin = computed(() =>
      store.state.user_data
        ? store.state.user_data.roles.includes("admin")
        : false
    );
    return {
      userIsAdmin,
      showOrHide,
    };
  },
};
</script>

<style lang="scss" scoped>
/* The sidebar menu */
#sidenav {
  height: 100%;
  width: $side-nav-width;
  position: fixed;
  z-index: 2;
  top: 0;
  background-color: $color-side-nav-bg;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.side-nav__hide {
  left: -$side-nav-width;
}
.side-nav__show {
  left: 0;
}
.side-nav__group {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $side-nav-group-padding;
  width: 100%;
  text-align: center;
  &:hover {
    background-color: $color-bg-hover;
    cursor: pointer;
  }
  .side-nav__text {
    width: $side-nav-text-width;
  }
  &--bottom {
    position: absolute;
    bottom: 0;
  }
}
.side-nav__icon {
  width: $side-nav-icon-width;
  margin-bottom: $side-nav-icon-mar-b;
}
</style>
