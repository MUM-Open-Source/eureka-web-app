<template>
  <div v-if="isUnderMaintenance">
    <Maintenance />
  </div>
  <div v-else>
    <SideNav v-if="isLoggedIn" />
    <div class="main" :class="marginLeft">
      <TopNav v-if="!isNewUser"/>
      <!-- routing -->
      <Loader v-if="isLoading"/>
      <router-view v-else/>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import store from '@/store';
import Loader from '@/common/Loader';
import SideNav from '@/modules/navigation/SideNav';
import TopNav from '@/modules/navigation/TopNav';
import Maintenance from '@/views/Maintenance';

export default {
  name: "App", // name of the component

  components: { Loader, SideNav, TopNav, Maintenance },  // imported components
  
  // Vue 3 Composition API
  setup() {
    // mounted
    onMounted(() => {
      store.dispatch("setAuthUser");
    });

    // computed properties
    const isLoggedIn = computed(() => store.state.user !== null);
    const isNewUser = computed(() => store.state.is_new);
    const isLoading = computed(() => store.state.isLoading === true);
    const isUnderMaintenance = computed(() => store.state.is_under_maintenance === true);
    const marginLeft = computed(() =>
      store.state.isSideNavCollapsed
        ? "main__width--full"
        : "main__width--reduced"
    );

    // return everything that needs to be referenced in the template
    return {
      isLoggedIn,
      isNewUser,
      isLoading,
      isUnderMaintenance,
      marginLeft,
    };
  },
};
</script>

<style lang="scss">
// TODO: Move to the styles directory
.main {
  min-height: calc(100vh - 60px);
}
.main__width {
  &--full {
    margin-left: 0;
  }
  &--reduced {
    margin-left: $side-nav-width;
  }
}
@media (max-width: 576px) {
  .main__width {
    &--reduced {
      margin-left: 0;
    }
  }
}
</style>

