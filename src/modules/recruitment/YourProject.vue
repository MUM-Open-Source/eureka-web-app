<template>
    <!-- List of projects -->
    <div class="not-found" v-if="!userProjects || userProjects.length === 0">
        <img src="@/assets/search-result-not-found.png" />
        <div class="heading">You don't have any projects</div>
        <div class="body">
            {{ isStudent ? 'Find One In All Projects' : 'Create One !' }}
        </div>
    </div>
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
        const isStudent =
            store.getters[`${RECRUITMENT_STORE}${GET_IS_STUDENT}`];
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
            isStudent,
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
</style>
