<template>
    <div class="pad--5 something-info">
        <div class="back-button">
            <IconButton @click="goBack">
                <fa icon="arrow-left" />
            </IconButton>
            <div>Back</div>
        </div>
        <List
            v-if="state.project_detail"
            :project="state.project_detail"
            :project_status="true"
            :is_details_page="true"
        />
        <div class="pad__1 mar--1" style="width: 100%" v-if="true">
            <div class="subheading">Students</div>
            <div v-if="state.project_students.length === 0">
                No Students Have Applied Yet
            </div>
            <ProjectDetailsStudentList
                v-for="student in state.project_students"
                v-bind:key="student.user_id"
                :student="student"
            />
        </div>
    </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive } from 'vue';
import store from '@/store';
import List from '@/common/List.vue';
import router from '@/router';
import ProjectDetailsStudentList from '@/modules/recruitment/ProjectDetailsStudentList.vue';
import {
    RESEARCH_APPLICATION_ACCEPTED,
    RESEARCH_APPLY,
    RESEARCH_INTEREST,
    RESEARCH_INTEREST_ACCEPTED,
    RESEARCH_REJECTED,
} from '@/modules/constants';
import {
    ACTION_GET_STUDENT_LIST_SUBSCRIPTION,
    GET_PROJECT_DETAILS,
    GET_PROJECT_DETAILS_STUDENTS,
    RECRUITMENT_STORE,
} from '@/modules/recruitment/recruitmentStore';
import IconButton from '@/modules/admin/IconButton.vue';

export default defineComponent({
    components: { List, IconButton, ProjectDetailsStudentList },
    name: 'ProjectDetails',
    setup() {
        const state = reactive({
            userId: store.state.user.uid,
            isUserProject: false,
            project_detail: computed(
                () =>
                    store.getters[`${RECRUITMENT_STORE}${GET_PROJECT_DETAILS}`]
            ),
            project_students: computed(
                () =>
                    store.getters[
                        `${RECRUITMENT_STORE}${GET_PROJECT_DETAILS_STUDENTS}`
                    ]
            ),
        });

        onMounted(() => {
            store.dispatch(
                `${RECRUITMENT_STORE}${ACTION_GET_STUDENT_LIST_SUBSCRIPTION}`,
                { research_id: state.project_detail.id }
            );
            state.isUserProject =
                store.state.user?.uid === state.project_detail.supervisor_id;
        });

        const rejectButtomClicked = (user) => {
            store.dispatch('updateResearchInvolvement', {
                statusCode: RESEARCH_REJECTED,
                research_id: state.project_detail.id,
                user_id: user.user_id,
            });
        };
        const checkedButtonClicked = (user) => {
            if (user.statusCode === RESEARCH_INTEREST)
                store.dispatch('updateResearchInvolvement', {
                    statusCode: RESEARCH_INTEREST_ACCEPTED,
                    research_id: state.project_detail.id,
                    user_id: user.user_id,
                });
            else if (user.statusCode === RESEARCH_APPLY)
                store.dispatch('updateResearchInvolvement', {
                    statusCode: RESEARCH_APPLICATION_ACCEPTED,
                    research_id: state.project_detail.id,
                    user_id: user.user_id,
                });
        };

        const goBack = () => router.back();

        return {
            state,
            goBack,
            rejectButtomClicked,
            checkedButtonClicked,
        };
    },
});
</script>

<style lang="scss">
.something-info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .back-button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: fit-content;
        margin-right: auto;
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        text-align: center;
    }

    &__specific {
        display: flex;
        flex-direction: column;
        padding-bottom: 20px;
    }
}

.student-lists {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 0.2rem solid $color-side-nav-bg;
    cursor: pointer;
}

.leading {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    align-content: center;
}

.trailing {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $color-side-nav-bg;
}
</style>
