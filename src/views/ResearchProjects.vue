<template>
    <div class="outer-div">
        <div class="inner-div" v-if="true">
            <div class="heading text--center mar__t--3">
                Academic Recruitment
            </div>
            <!-- Tabs for Academic Research Recruitment -->
            <TabsWrapper v-if="userIsStaff && userIsStudent">
                <Tab title="Your Projects"><YourProject /></Tab>
                <Tab title="All Projects"><AllProjects /></Tab>
                <Tab title="Create New Project"><NewProject /></Tab>
            </TabsWrapper>
            <TabsWrapper v-else-if="userIsStaff">
                <Tab title="Your Projects"><YourProject /></Tab>
                <Tab title="Create New Project"><NewProject /></Tab>
            </TabsWrapper>
            <TabsWrapper v-else>
                <Tab title="Your Projects"><YourProject /></Tab>
                <Tab title="All Projects"><AllProjects /></Tab>
            </TabsWrapper>
        </div>
        <div class="inner-div" v-else>
            <NotFound />
        </div>
    </div>
</template>

<script lang='ts'>
import { computed, defineComponent, onMounted, ref } from 'vue';
import TabsWrapper from '@/common/TabsWrapper.vue';
import Tab from '@/common/Tab.vue';
import NotFound from '@/views/NotFound.vue';
import YourProject from '@/modules/recruitment/YourProject.vue';
import AllProjects from '@/modules/recruitment/AllProjects.vue';
import NewProject from '@/modules/recruitment/NewProject.vue';
import store from '@/store';

export default defineComponent({
    name: 'ResearchProjects',
    components: {
        TabsWrapper,
        Tab,
        NotFound,
        YourProject,
        AllProjects,
        NewProject,
    },
    setup() {
        // to keep track of the tab
        const tab = ref(0);

        const userIsStudent = computed(() => {
            return store.state.user_data?.roles.includes('talent');
        });
        onMounted(() => {
            store.dispatch('getProjects');
        });

        const updateTab = (newTab: number) => (tab.value = newTab);

        // Checks if the user is a staff.
        const userIsStaff = computed(() => {
            return store.state.user_data?.roles.includes('staff');
        });

        return {
            tab,
            updateTab,
            userIsStaff,
            userIsStudent,
        };
    },
});
</script>

<style>
</style>
