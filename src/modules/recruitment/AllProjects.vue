<template>
    <!-- List of projects -->
    <List
        v-for="project in projects"
        :key="project.key"
        :project="project"
        :project_status="false"
        :is_details_page="false"
    />
</template>

<script>
import store from '@/store';
import { computed } from 'vue';
import List from '@/common/List.vue';
import { GET_OTHER_PROJECTS, RECRUITMENT_STORE } from './recruitmentStore';

export default {
    name: 'AllProjects',
    components: { List },

    setup() {
        const projects = computed(
            () => store.getters[`${RECRUITMENT_STORE}${GET_OTHER_PROJECTS}`]
        );
        return { projects };
    },
};
</script>

<style>
</style>
