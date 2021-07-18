<template>
  <div id="sidenav" :class="showOrHide">
    <router-link :to="{ name: '' }">
      <div class="side-nav__group--link">
        <fa
          icon="border-all"
          size="md"
          class="side-nav__icon"
        />
        <!-- <img class="side-nav__icon" src="@/assets/events-icon.svg" /> -->
        <div class="side-nav__text">Dashboard</div>
      </div>
    </router-link>
    <router-link :to="{ name: '' }">
      <div class="side-nav__group--link">
        <fa
          :icon="['far', 'comments']"
          size="md"
          class="side-nav__icon"
        />
        <!-- <img class="side-nav__icon" src="@/assets/talent-icon.svg" /> -->
        <div class="side-nav__text">Messages</div>
      </div>
    </router-link>
    <router-link :to="{ name: '' }">
      <div class="side-nav__group--link">
        <img class="side-nav__icon" src="@/assets/mentor-icon.svg" />
        <div class="side-nav__text">Incubator</div>
      </div>
    </router-link>
    <router-link :to="{ name: '' }">
      <div class="side-nav__group--link">
        <img class="side-nav__icon" src="@/assets/mentor-icon.svg" />
        <div class="side-nav__text">Research</div>
      </div>
    </router-link>
    <router-link :to="{ name: '' }">
      <div class="side-nav__group--link">
        <img class="side-nav__icon" src="@/assets/mentor-icon.svg" />
        <div class="side-nav__text">Events</div>
      </div>
    </router-link>
    <router-link :to="{ name: '' }">
      <div class="side-nav__group--link">
        <img class="side-nav__icon" src="@/assets/mentor-icon.svg" />
        <div class="side-nav__text">Projects</div>
      </div>
    </router-link>
    <router-link
      :to="{ name: 'Admin' }"
      v-if="userIsAdmin"
    >
      <div class="side-nav__group--link">
        <img class="side-nav__icon" src="@/assets/info-icon.svg" />
        <div class="side-nav__text">Mission Control</div>
      </div>
    </router-link>
    <router-link :to="{ name: 'Feedback' }">
      <div class="side-nav__group--link side-nav__group--bottom">
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
        ? store.state.user_data.roles.includes('admin') 
        : false
    );
    return {
      userIsAdmin,
      showOrHide,
    };
  },
};
</script>

<style lang='scss' scoped>
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
    &--link {
      display: flex;
      align-items: center;
      padding: $side-nav-group-padding;
      width: 100%;
      &:hover {
          background-color: $color-bg-hover;
          cursor: pointer;
      }
    }
    .side-nav__text {
        // width: $side-nav-text-width;
    }
    &--bottom {
        position: absolute;
        bottom: 0;
    }
}
.side-nav__icon {
    width: $side-nav-icon-width;
    margin-right: $side-nav-icon-mar-r;
    margin-left: 15px;
}
</style>
