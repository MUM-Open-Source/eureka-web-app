<template>
    <div class="outer-div">
        <div class="inner-div" v-if="true">
            <div class="heading text--center mar__t--3">Incubator</div>
            <!-- Tabs for Academic Research Recruitment -->
            <TabsWrapper>
                <Tab title="Your Projects"><YourProject /></Tab>
                <Tab title="All Projects"><AllProjects /></Tab>
                <Tab title="New Project"><NewProject /></Tab>
            </TabsWrapper>
        </div>
        <div class="inner-div" v-else>
            <NotFound />
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import TabsWrapper from '@/common/TabsWrapper.vue';
import Tab from '@/common/Tab.vue';
import NotFound from '@/views/NotFound.vue';
import YourProject from '@/modules/recruitment/YourProject.vue';
import AllProjects from '@/modules/recruitment/AllProjects.vue';
import NewProject from '@/modules/recruitment/NewProject.vue';

export default defineComponent({
    name: 'ResearchProjects',
    components: {
        TabsWrapper,
        Tab,
        NotFound,
        YourProject,
        AllProjects,
        NewProject
    },
    setup() {
        // to keep track of the tab
        const tab = ref(0);

        const updateTab = (newTab: number) => tab.value = newTab;

        return {
            tab,
            updateTab
        }
    }
});
</script>

<style>

</style>
