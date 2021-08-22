<template>
    <!-- List of projects -->
    <List
        v-for="project in state.userProjects"
        :key="project.key"
        :project="project"
        :project_status="true"
        :is_details_page="false"
    />
</template>

<script>
import store from '@/store';
import { onMounted, reactive } from 'vue';
import List from '@/common/List.vue';

export default {
    name: 'AllProjects',
    components: { List },
    setup() {
        // gets specific projects when mounted (see store/index.ts)
        // 2 Conditions
        // Staff: Shows published projecs
        // Student: Shows applied projects along with status

        const state = reactive({
            userProjects: [],
            userIsStaff: store.state.user_data?.roles.includes('staff'),
            userIsStudent: store.state.user_data?.roles.includes('talent'),
        });
        onMounted(() => {
            const supervisorProjects = store.state.all_projects.filter(
                (projects) => projects.supervisor_id === store.state.user.uid
            );
            const userProjects = store.state.all_projects.filter((p) =>
                store.state.project_involvements.find(
                    (involvements) => involvements.research_id === p.id
                )
            );
            if (state.userIsStaff && state.userIsStudent)
                state.userProjects = supervisorProjects.concat(userProjects);
            else if (state.userIsStaff) state.userIsStaff = supervisorProjects;
            else state.userProjects = userProjects;
        });

        // references projects in state and store in projects Final

        return {
            state,
        };
    },
};
</script>

<style>
</style>
