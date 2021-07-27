<template>
    <!-- List of projects -->
    <List
        v-for="project in projectsFinal"
        :key="project.key"
        :project="project"
        :project_status="true"
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

        // gets specific projects when mounted (see store/index.ts)
        // 2 Conditions
        // Staff: Shows published projecs
        // Student: Shows applied projects along with status
        onMounted(() => {
            if (!store.state.projects.length) {
                store.dispatch("getProjects")
            }
        })

        // references projects in state and store in projects Final
        const projectsFinal = ref(store.state.projects);

        return {
            projectsFinal
        }
    }
}
</script>

<style>
</style>
