<template>
    <!-- List of projects -->
    <List
        v-for="project in projectsFinal"
        :key="project.key"
        :project="project"
        :project_status="false"
    />
</template>

<script>
import store from '@/store';
import { onMounted, ref } from 'vue';
import List from '@/common/List.vue';

export default {
    name: 'AllProjects',
    components: { List },
    setup() {

        // gets all projects when mounted (refer to store/index.ts)
        onMounted(() => {
            if (!store.state.all_projects.length) {
                store.dispatch("getAllProjects")
            }
        })

        // references all projects in state and store in projects Final
        const projectsFinal = ref(store.state.all_projects);

        return {
            projectsFinal
        }
    }
}
</script>

<style>

</style>
