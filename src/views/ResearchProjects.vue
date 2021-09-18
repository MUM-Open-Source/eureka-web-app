<template>
    <div class="outer-div">
        <div class="inner-div" v-if="true">
            <div class="heading text--center mar__t--5 mar__b--3">
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
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import TabsWrapper from '@/common/TabsWrapper.vue';
import Tab from '@/common/Tab.vue';
import NotFound from '@/views/NotFound.vue';
import YourProject from '@/modules/recruitment/YourProject.vue';
import AllProjects from '@/modules/recruitment/AllProjects.vue';
import NewProject from '@/modules/recruitment/NewProject.vue';
import store from '@/store';
import {
    ACTION_GET_ALL_PROJECTS,
    ACTION_GET_LECTURER_INVOLVEMENT_SUBSCRIPTION,
    ACTION_GET_USER_INVOLVEMENT_SUBSCRIPTION,
    GET_IS_LECTURER,
    GET_IS_STUDENT,
    RECRUITMENT_STORE,
    SET_USER_INVOLVEMENTS_UNSUBSCRIBE,
} from '@/modules/recruitment/recruitmentStore';

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
        const updateTab = (newTab: number) => (tab.value = newTab);
        const userIsStaff =
            store.getters[`${RECRUITMENT_STORE}${GET_IS_LECTURER}`];
        const userIsStudent =
            store.getters[`${RECRUITMENT_STORE}${GET_IS_STUDENT}`];

        onMounted(() => {
            store.dispatch(`${RECRUITMENT_STORE}${ACTION_GET_ALL_PROJECTS}`);
            if (userIsStudent)
                store.dispatch(
                    `${RECRUITMENT_STORE}${ACTION_GET_USER_INVOLVEMENT_SUBSCRIPTION}`
                );
            if (userIsStaff)
                store.dispatch(
                    `${RECRUITMENT_STORE}${ACTION_GET_LECTURER_INVOLVEMENT_SUBSCRIPTION}`
                );
        });

        onUnmounted(() => {
            store.commit(
                `${RECRUITMENT_STORE}${SET_USER_INVOLVEMENTS_UNSUBSCRIBE}`
            );
        });

        // Checks if the user is a staff.

        return {
            tab,
            updateTab,
            userIsStaff,
            userIsStudent,
        };
    },
});
</script>

<style lang='scss' scoped>
.outer-div {
    width: 60%;
    margin: auto;
}

@media (max-width: 600px) {
    .outer-div {
        width: 100%;
        margin: auto;
    }
}
</style>
