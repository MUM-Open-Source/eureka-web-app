import { AppState, ResearchInvolvement } from '@/types/AppTypes.interface';
import { Project } from '@/types/FirebaseTypes.interface';
import { Module } from 'vuex';
import {
    getAllProjects,
    getProjectRealtimeStudentInvolvements,
    getRealtimeStudentInvolvements,
} from './recruitmentAPi';
import RecruitementStoreState from './recruitmentTypes';

// Store Function Name Space
export const RECRUITMENT_STORE = 'recruitementStore/';

// Getters
export const GET_IS_STUDENT = 'getIsStudent';
export const GET_IS_LECTURER = 'getIsLecturer';
export const GET_OTHER_PROJECTS = 'getOtherProjects';
export const GET_PROJECT_DETAILS = 'getProjectDetails';
export const GET_STUDENT_MY_PROJECTS = 'getStudentMyProjects';
export const GET_USER_INVOLVEMENT = 'getUserProjectInvolvement';
export const GET_LECTURER_MY_PROJECTS = 'getLecturerMyProjects';
export const GET_PROJECT_DETAILS_STUDENTS = 'getProjectDetailsStudents';

// Mutations
export const SET_ALL_PROJECTS = 'setAllProjects';
export const SET_USER_INVOLVEMENTS = 'setUserInvolvements';
export const SET_PROJECT_DETAILS_PAGE = 'setProjectsDetailsPage';
export const SET_PROJECT_DETAILS_STUDENTS = 'setProjectDetailsStudents';
export const SET_USER_INVOLVEMENTS_UNSUBSCRIBE =
    'setUserInvolvementUnsubscribe';
export const SET_USER_INVOLVEMENTS_SUBSCRIPTIONS =
    'userInvolvementSubscription';
export const SET_PROJECT_DETAILS_STUDENTS_UNSUBSCRIBE =
    'setProjectDetailsStudentsUnsubscribe';
export const SET_PROJECT_DETAILS_STUDENTS_SUBSCRIPTIONS =
    'setProjectDetailsStudentsSubscriptions';

// Actions
export const ACTION_GET_ALL_PROJECTS = 'getAllProjects';
export const ACTION_GET_PROJECT_DETAILS = 'getProjectDetails';
export const ACTION_GET_PROJECT_DETAILS_STUDENTS = 'getProjectDetailsStudents';
export const ACTION_GET_STUDENT_LIST_SUBSCRIPTION = 'getStudentList';
export const ACTION_GET_USER_INVOLVEMENT_SUBSCRIPTION =
    'userInvolvementSubscription';

const findProject = (project: Project) => (involvements: ResearchInvolvement) =>
    involvements.research_id === project.id;

export const recruitementStore: Module<RecruitementStoreState, AppState> = {
    namespaced: true,
    state: {
        allProjects: [],
        userInvolvements: [],
        userInvolvementSubscription: null,
        projectDetailsPageData: null,
        projectDetailsPageStudentList: [],
        projectDetailsPageStudentSubscription: null,
    } as RecruitementStoreState,
    getters: {
        [GET_STUDENT_MY_PROJECTS]: state => {
            return state.allProjects.filter((p: Project) =>
                state.userInvolvements.find(findProject(p))
            );
        },
        [GET_PROJECT_DETAILS]: state => {
            return state.projectDetailsPageData;
        },
        [GET_IS_LECTURER]: (__, _, rootState) => {
            return rootState.user_data?.roles.includes('staff');
        },
        [GET_IS_STUDENT]: (__, _, rootState) => {
            return rootState.user_data?.roles.includes('talent');
        },
        [GET_LECTURER_MY_PROJECTS]: (state, _, rootState) => {
            return state.allProjects.filter(
                (p: Project) => p.supervisor_id === rootState.user?.uid
            );
        },
        [GET_USER_INVOLVEMENT]: state => {
            return state.userInvolvements;
        },
        [GET_PROJECT_DETAILS_STUDENTS]: state => {
            return state.projectDetailsPageStudentList;
        },
        [GET_OTHER_PROJECTS]: (state, _, rootState) => {
            return state.allProjects.filter(
                (p: Project) =>
                    p.supervisor_id !== rootState.user?.uid &&
                    !state.userInvolvements.find(findProject(p))
            );
        },
    },
    mutations: {
        [SET_PROJECT_DETAILS_STUDENTS]: (
            state,
            { newStudentList }: { newStudentList: ResearchInvolvement[] }
        ) => {
            state.projectDetailsPageStudentList = newStudentList;
        },
        [SET_PROJECT_DETAILS_STUDENTS_SUBSCRIPTIONS]: (
            state,
            { newStudentsSubscriptions }
        ) => {
            state.projectDetailsPageStudentSubscription = newStudentsSubscriptions;
        },
        [SET_ALL_PROJECTS]: (
            state,
            { newAllProjects }: { newAllProjects: Project[] }
        ) => (state.allProjects = newAllProjects),
        [SET_USER_INVOLVEMENTS]: (
            state,
            {
                newUserInvolvement,
            }: { newUserInvolvement: ResearchInvolvement[] }
        ) => {
            state.userInvolvements = newUserInvolvement;
        },
        [SET_USER_INVOLVEMENTS_SUBSCRIPTIONS]: (
            state,
            { newSubscription }: { newSubscription: any }
        ) => (state.userInvolvementSubscription = newSubscription),
        [SET_PROJECT_DETAILS_PAGE]: (
            state,
            { detailsPageData }: { detailsPageData: Project }
        ) => {
            state.projectDetailsPageData = detailsPageData;
        },
        [SET_USER_INVOLVEMENTS_UNSUBSCRIBE]: state => {
            if (state.userInvolvementSubscription) {
                state.userInvolvementSubscription();
                state.userInvolvementSubscription = null;
            }
        },
        [SET_PROJECT_DETAILS_STUDENTS_UNSUBSCRIBE]: state => {
            if (state.projectDetailsPageStudentSubscription) {
                state.projectDetailsPageStudentSubscription();
                state.projectDetailsPageStudentSubscription = null;
            }
        },
    },
    actions: {
        [ACTION_GET_ALL_PROJECTS]: async ({ commit }) => {
            commit(SET_ALL_PROJECTS, {
                newAllProjects: await getAllProjects(),
            });
        },
        [ACTION_GET_STUDENT_LIST_SUBSCRIPTION]: async (
            { commit },
            { research_id }
        ) => {
            commit(SET_PROJECT_DETAILS_STUDENTS_UNSUBSCRIBE);
            const subscription = await getProjectRealtimeStudentInvolvements({
                research_id,
                onSnapshot: (newStudentList: ResearchInvolvement) => {
                    commit(SET_PROJECT_DETAILS_STUDENTS, {
                        newStudentList,
                    });
                },
            });
            commit(SET_PROJECT_DETAILS_STUDENTS_SUBSCRIPTIONS, {
                newStudentsSubscriptions: subscription,
            });
        },
        [ACTION_GET_USER_INVOLVEMENT_SUBSCRIPTION]: async ({
            commit,
            rootState,
        }) => {
            const subscription = await getRealtimeStudentInvolvements({
                user_id: rootState.user?.uid || '',
                onSnapshot: (involvementData: any) => {
                    commit(SET_USER_INVOLVEMENTS, {
                        newUserInvolvement: involvementData,
                    });
                },
            });
            commit(SET_USER_INVOLVEMENTS_SUBSCRIPTIONS, {
                newSubscription: subscription,
            });
        },
    },
};
