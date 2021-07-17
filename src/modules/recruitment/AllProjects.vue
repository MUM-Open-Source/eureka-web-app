<template>
    <List
        v-for="project in projectsFinal"
        :key="project.key"
        :project="project"
    />
</template>

<script>
// import Button from '@/common/Button.vue'
import store from '@/store';
import { onMounted, ref } from 'vue';
// import { ref } from 'vue';
import List from '@/common/List.vue';

export default {
    name: 'AllProjects',
    components: { List },
    setup() {
        onMounted(() => {
            if (!store.state.projects.length) {
                store.dispatch("getProjects")
            }
        })

        const projectsFinal = ref(store.state.projects);

        return {
            projectsFinal
        }
    }
}
</script>

<style>

</style>
