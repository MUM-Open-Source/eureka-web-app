<template>
    <!-- List of projects -->
    <List
        v-for="project in userProjects"
        :key="project.key"
        :project="project"
        :project_status="true"
        :is_details_page="false"
    />
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
        const userProjects = computed(() => {
            const studentProjects =
                store.getters[`${RECRUITMENT_STORE}${GET_STUDENT_MY_PROJECTS}`];
            const staffProjects =
                store.getters[
                    `${RECRUITMENT_STORE}${GET_LECTURER_MY_PROJECTS}`
                ];
            const isStudent =
                store.getters[`${RECRUITMENT_STORE}${GET_IS_STUDENT}`];
            const isStaff =
                store.getters[`${RECRUITMENT_STORE}${GET_IS_STUDENT}`];

            if (isStudent && isStaff)
                return staffProjects.concat(studentProjects);
            else if (store.getters[`${RECRUITMENT_STORE}${GET_IS_STUDENT}`])
                return studentProjects;
            else if (store.getters[`${RECRUITMENT_STORE}${GET_IS_LECTURER}`])
                return staffProjects;
        });

        return {
            userProjects,
        };
    },
};
</script>

<style>
</style>
