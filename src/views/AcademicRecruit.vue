<template>
    <div class="outer-div">
        <div class="inner-div" v-if="true">
            <div class="heading text--center mar__t--3">Incubator</div>
            <TabsWrapper>
                <Tab title="Your Projects"><YourProject v-for="i in [1,2,3,4,5]" :key="i"/></Tab>
                <Tab title="All Projects"><AllProjects v-for="i in [1,2,3,4,5]" :key="i"/></Tab>
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
    name: 'AcademicRecruit',
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
