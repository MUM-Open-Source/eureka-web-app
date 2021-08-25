<template>
    <!-- List of projects -->
    <div class="not-found" v-if="projects.length === 0">
        <img src="@/assets/search-result-not-found.png" />
        <div class="heading">No Projects Currently</div>
        <div class="body">Please check later</div>
    </div>

    <List
        v-else
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

<style lang="scss" scoped>
.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}
</style>
