<template>
  <div>
    <SideNav v-if="isLoggedIn" />
    <div class="main" :class='marginLeft'>
      <TopNav />
      <!-- routing -->
      <Loader v-if="isLoading"/>
      <router-view v-else/>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import store from '@/store';
import Loader from '@/components/Loader';
import SideNav from '@/components/SideNav';
import TopNav from '@/components/TopNav';

export default {
  name: 'App',    // name of the component

  components: { Loader, SideNav, TopNav },  // imported components
  
  // Vue 3 Composition API
  setup() {

    // mounted
    onMounted(() => {
      store.dispatch('setAuthUser');
    })

    // computed properties
    const isLoggedIn = computed(() => store.state.user !== null);
    const isLoading = computed(() => store.state.isLoading === true);
    const marginLeft = computed(() =>
        store.state.isSideNavCollapsed 
        ? 'main__width--full' 
        : 'main__width--reduced'
    )

    // return everything that needs to be referenced in the template
    return {
      isLoggedIn,
      isLoading,
      marginLeft
    }

  }
}

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
