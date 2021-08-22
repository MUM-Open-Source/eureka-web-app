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
        <div
            class="pad__1 mar--1"
            style="width: 100%"
            v-if="state.isUserProject"
        >
            <div class="subheading">Students</div>

            <div v-if="state.project_students.length === 0">
                No Students Have Applied Yet
            </div>

            <div
                class="student-lists"
                v-for="student in state.project_students"
                v-bind:key="student.id"
            >
                <div class="leading">
                    <div class="pad--1">
                        <div>{{ student.user_name }}</div>
                        <div>{{ student.user_email }}</div>
                        <div>
                            {{
                                new Date(
                                    student.updateLog[student.statusCode]
                                ).toString()
                            }}
                        </div>
                    </div>
                    <div
                        class="tagline text--capsule cursor__default"
                        style="width: fit-content"
                    >
                        {{ statusDisplayer(student) }}
                    </div>
                </div>
                <div class="trailing">
                    <IconButton @click="buttonClicked">
                        <fa icon="times" />
                    </IconButton>
                    <IconButton @click="buttonClicked">
                        <fa icon="check" />
                    </IconButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import store from '@/store';
import List from '@/common/List.vue';
import IconButton from '@/modules/admin/IconButton.vue';
import router from '@/router';
import {
    RESEARCH_APPLICATION_ACCEPTED,
    RESEARCH_APPLY,
    RESEARCH_INTEREST,
    RESEARCH_INTEREST_ACCEPTED,
} from '@/modules/constants';

export default defineComponent({
    components: { List, IconButton },
    name: 'ProjectDetails',
    setup() {
        const route = useRoute();
        const id = route.params.id;
        const state = reactive({
            project_detail: null,
            project_students: [],
            userId: store.state.user.uid,
            isUserProject: false,
        });

        const statusDisplayer = (involvement) => {
            if (involvement) {
                const { statusCode } = involvement;
                if (statusCode === RESEARCH_INTEREST)
                    return 'Student Interested';
                else if (statusCode === RESEARCH_INTEREST_ACCEPTED)
                    return 'Interest Accepted';
                else if (statusCode === RESEARCH_APPLY) return 'New Applicant';
                else if (statusCode === RESEARCH_APPLICATION_ACCEPTED)
                    return 'Application Accepted';
                else return 'Rejected';
            }
        };

        const buttonClicked = () => {};

        const getProjectUsers = (research_id) => {
            state.isUserProject =
                state.project_detail?.supervisor_id === state.userId;
            if (state.isUserProject) {
                store.dispatch('getResearchStudent', {
                    research_id,
                    onRecieved: (student_list) =>
                        (state.project_students = student_list),
                });
            }
        };

        onMounted(() => {
            store.state.project_detail.length > 0
                ? (state.project_detail = ref(store.state.project_detail[0]))
                : store.dispatch('getProject', {
                      onRecieve: (project) => {
                          state.project_detail = project;
                          getProjectUsers(project.id);
                      },
                      id,
                  });

            if (state.project_detail) getProjectUsers(state.project_detail.id);
        });

        const goBack = () => router.back();

        return {
            state,
            goBack,
            statusDisplayer,
            buttonClicked,
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
