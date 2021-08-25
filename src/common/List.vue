<template>
    <div
        class="
            user__card
            pad--2 pad__l--0
            mar__b--2
            cursor__pointer
            show-bottom-border
        "
    >
        <div class="user__card--details" @click="onCardClicked">
            <!-- project name -->
            <div class="subheading user__card--project mar__b--1">
                {{ project.project_name }}
            </div>

            <!-- Supervisor Info -->
            <div class="user__card--supervisor-details">
                <span class="user__card--name">
                    <div class="tagline--bold" style="padding-right: 0.5rem">
                        Supervisor
                    </div>
                    {{ project.supervisor }}
                </span>
                <span class="user__card--name">
                    <div class="tagline--bold" style="padding-right: 0.5rem">
                        Email
                    </div>
                    {{ project.email }}
                </span>
                <span class="user__card--name">
                    <div class="tagline--bold" style="padding-right: 0.5rem">
                        Project Duration
                    </div>
                    {{ project.project_duration }}
                </span>
            </div>

            <!-- tags -->
            <div class="user__card--tags mar__b--1">
                <div
                    v-for="fields in project.project_fields"
                    :key="fields"
                    class="tagline text--capsule cursor__default"
                >
                    {{ fields }}
                </div>
            </div>
            <div class="body user__card--body">
                {{
                    project.overview.length > 500 && !is_details_page
                        ? `${project.overview.substring(0, 500)} ...`
                        : project.overview
                }}
            </div>
        </div>

        <IconButton @click="expressInterest" v-if="displayInterestIcon()">
            <fa icon="heart" />
        </IconButton>

        <div class="trailing">
            <div
                class="tagline text--capsule cursor__default"
                v-if="state.involvement"
            >
                {{ statusDisplayer() }}
            </div>
            <FlatButton
                text="APPLY"
                @click="showModal"
                v-if="displayApplyButton()"
            />
        </div>
    </div>

    <Modal v-show="state.isModalVisible" @close="closeModal">
        <ApplyDialog :file_Upload="project.project_name" />
    </Modal>
</template>

<script lang="ts">
import ApplyDialog from '@/common/ApplyDialog.vue';
import router from '@/router';
import store from '@/store';
import { defineComponent, computed, reactive } from 'vue';
import Modal from './Modal.vue';
import IconButton from '@/modules/admin/IconButton.vue';
import FlatButton from '@/modules/admin/FlatButton.vue';
import {
    RESEARCH_APPLICATION_ACCEPTED,
    RESEARCH_APPLY,
    RESEARCH_INTEREST,
    RESEARCH_INTEREST_ACCEPTED,
} from '@/modules/constants';
import {
    GET_IS_LECTURER,
    GET_IS_STUDENT,
    GET_USER_INVOLVEMENT,
    RECRUITMENT_STORE,
    SET_PROJECT_DETAILS_PAGE,
} from '@/modules/recruitment/recruitmentStore';
import { studentInterested } from '@/modules/recruitment/recruitmentAPi';
import Swal from 'sweetalert2';

export default defineComponent({
    name: 'List',
    components: { ApplyDialog, Modal, IconButton, FlatButton },
    props: {
        project: {
            type: Object,
            required: true,
        },
        project_status: {
            type: Boolean,
            required: true,
        },
        is_details_page: {
            type: Boolean,
            required: true,
        },
    },
    setup(props) {
        const state = reactive({
            isModalVisible: false,
            isYourProject:
                store.state.user?.uid === props.project.supervisor_id,
            userIsStaff:
                store.getters[`${RECRUITMENT_STORE}${GET_IS_LECTURER}`],
            userIsStudent:
                store.getters[`${RECRUITMENT_STORE}${GET_IS_STUDENT}`],
            involvement: computed(() =>
                store.getters[
                    `${RECRUITMENT_STORE}${GET_USER_INVOLVEMENT}`
                ].find(
                    (research: any) => research.research_id === props.project.id
                )
            ),
        });

        const expressInterest = async () => {
            await studentInterested({
                research_id: props.project.id,
                user_id: store.state.user?.uid || '',
                user_email: store.state.user?.email || '',
                user_name: store.state.user?.displayName || '',
            }).then(() =>
                Swal.fire({
                    icon: 'success',
                    title: 'Your Interest Has Been Recorded',
                    text: 'The supervisor will recieve an email soon',
                })
            );
        };

        const showModal = () => {
            state.isModalVisible = true;
        };

        const closeModal = () => {
            state.isModalVisible = false;
        };

        const displayInterestIcon = () => {
            return (
                state.userIsStudent &&
                !state.isYourProject &&
                !state.involvement
            );
        };

        const displayApplyButton = () => {
            return state.involvement?.statusCode === RESEARCH_INTEREST_ACCEPTED;
        };

        const statusDisplayer = () => {
            if (state.involvement) {
                const { statusCode } = state.involvement as any;
                if (statusCode === RESEARCH_INTEREST) return 'Interest Pending';
                else if (statusCode === RESEARCH_INTEREST_ACCEPTED)
                    return 'Interest Accepted';
                else if (statusCode === RESEARCH_APPLY)
                    return 'Application Pending';
                else if (statusCode === RESEARCH_APPLICATION_ACCEPTED)
                    return 'Application Accepted';
                else return 'Rejected';
            }
        };

        const onCardClicked = () => {
            if (!props.is_details_page) {
                store.commit(
                    `${RECRUITMENT_STORE}${SET_PROJECT_DETAILS_PAGE}`,
                    { detailsPageData: props.project }
                );
                router.push({
                    name: 'ProjectDetails',
                    params: { id: props.project.id },
                });
            }
        };

        return {
            state,
            showModal,
            closeModal,
            onCardClicked,
            statusDisplayer,
            expressInterest,
            displayInterestIcon,
            displayApplyButton,
            ...props,
        };
    },
});
</script>

<style lang="scss" scoped>
.user__card {
    display: flex;
    justify-content: space-between;
    width: 100%;
    @media (max-width: 576px) {
        flex-direction: column;
    }
    &--body {
        padding-left: 0.5rem;
        text-align: justify;
    }
    &--details {
        width: 100%;
    }
    &--project {
        padding-left: 0.5rem;
    }
    &--supervisor-details {
        display: flex;
        flex-direction: column;
        padding-left: 0.5rem;
        padding-bottom: 1rem;
    }
    &--name {
        user-select: none;
        display: flex;
        flex-direction: row;
    }
    &--row {
        display: flex;
        align-items: center;
    }
    &--tags {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    &--actions {
        display: flex;
        height: $user-card-actions-height;
        align-self: center;
        margin-left: $user-card-row-margin-left;
    }
}

.show-bottom-border {
    border-bottom: 0.2rem solid $color-side-nav-bg;
}

.trailing {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: black;
}

.text--capsule {
    text-align: center;
    white-space: nowrap;
}
</style>
