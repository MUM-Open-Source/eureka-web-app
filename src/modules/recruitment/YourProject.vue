<template>
    <!-- List of projects -->
    <div
        class="not-found"
        v-if="studentProjects.length === 0 && staffProjects.length === 0"
    >
        <img class="img" src="@/assets/search-result-not-found.png" />
        <div class="heading">You don't have any projects</div>
        <div class="body">
            {{ isStudent ? 'Find One In All Projects' : 'Create One !' }}
        </div>
    </div>
    <div v-if="isStudent">
        <List
            v-for="project in studentProjects"
            :key="project.id"
            :project="project"
            :project_status="true"
            :is_details_page="false"
        />
    </div>
    <div v-if="isStaff">
        <List
            v-for="project in staffProjects"
            :key="project.id"
            :project="project"
            :project_status="true"
            :is_details_page="false"
        />
    </div>
</template>

<script>
import List from '@/common/List.vue';
import { computed } from '@vue/runtime-core';
import store from '@/store';
import {
    GET_IS_LECTURER,
    GET_IS_STUDENT,
    GET_LECTURER_MY_PROJECTS,
    GET_STUDENT_MY_PROJECTS,
    RECRUITMENT_STORE,
} from './recruitmentStore';

export default {
    name: 'AllProjects',
    components: { List },
    setup() {
        const isStudent =
            store.getters[`${RECRUITMENT_STORE}${GET_IS_STUDENT}`];
        const isStaff = store.getters[`${RECRUITMENT_STORE}${GET_IS_LECTURER}`];
        const studentProjects = computed(
            () =>
                store.getters[`${RECRUITMENT_STORE}${GET_STUDENT_MY_PROJECTS}`]
        );
        const staffProjects = computed(
            () =>
                store.getters[`${RECRUITMENT_STORE}${GET_LECTURER_MY_PROJECTS}`]
        );

        return {
            studentProjects,
            staffProjects,
            isStudent,
            isStaff,
        };
    },
};
</script>

<style lang='scss' scoped>
.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.img {
    @media (max-width: 428px) {
        width: 100%;
    }
}
</style>
