<template>
    <div
        v-bind:class="{ 'user__card': !inEdit, 'user__card--edit': inEdit }"
        class="pad--2 pad__l--0 mar__b--2 cursor__pointer show-bottom-border"
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
            <div class="user__card--button">
                <Button
                text="EOI Form (Compulsory)"
                @click="downloadEoiForm"
                v-if="state.involvement == 1"
                />
            </div>
        </div>

        <IconButton @click="expressInterest" v-if="displayInterestIcon()">
            <fa icon="heart" />
        </IconButton>

        <IconButton
            @click="onEditClicked()"
            v-if="displayDeleteAndEditIcon() && inEdit"
        >
            <fa icon="times" />
        </IconButton>

        <div class="user__card-buttons">
            <IconButton
                @click="removeProject"
                v-if="displayDeleteAndEditIcon() && !inEdit"
            >
                <fa icon="trash" />
            </IconButton>

            <IconButton
                @click="onEditClicked()"
                v-if="displayDeleteAndEditIcon() && !inEdit"
            >
                <fa icon="pen" />
            </IconButton>
        </div>

        <div class="trailing">
            <div
                class="tagline text--capsule cursor__default"
                v-if="state.involvement"
            >
                {{ statusDisplayer }}
            </div>
            <FlatButton
                text="APPLY"
                @click="showModal"
                v-if="displayApplyButton()"
            />
            <div v-if="showResubmit()">
                <FlatButton text="CURRENT SUBMISSION" @click="downloadFile" />
                <FlatButton text="RESUBMIT " @click="showModal" />
            </div>
        </div>
        <div v-if="inEdit" class="data pad--1">
            <h4>Name</h4>
            <input
                type="text"
                class="custom-input mar__b--2"
                :placeholder="project.project_name"
                v-model="project_name"
            />
            <h4>Project Duration</h4>
            <input
                type="text"
                class="custom-input mar__b--2"
                :placeholder="project.project_duration"
                v-model="project_duration"
            />
            <h4>Project Interests</h4>
            <Multiselect
                v-model="indexes"
                mode="tags"
                :searchable="true"
                :options="options"
                :max="4"
                placeholder="Choose Field..."
                class="body new-project__multiselect mar__b--2"
                :createTag="true"
            />
            <h4>Overview</h4>
            <textarea
                id="overview"
                class="body user__card--textarea mar__b--2"
                :placeholder="project.overview"
                v-model="overview"
            />
            <Button text="Done" @click="editProject()" />
        </div>
    </div>

    <Modal
        v-if="state.involvement"
        v-show="state.isModalVisible"
        @close="closeModal"
    >
        <ApplyDialog
            :project="project"
            :file_Upload="project.project_name"
            :involvement="state.involvement"
            @close="closeModal"
        />
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
import Multiselect from '@vueform/multiselect';
import Button from "@/common/Button.vue";
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
import {
    studentInterested,
    deleteProject,
    updateProject,
} from '@/modules/recruitment/recruitmentAPi';
import Swal from 'sweetalert2';

export default defineComponent({
    name: 'List',
    components: { ApplyDialog, Modal, IconButton, FlatButton, Multiselect, Button },
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
    data() {
        return {
            inEdit: false,
            project_name: '',
            project_duration: '',
            overview: '',
            indexes: [],
            project_fields: [],
            options: [
                'ML/AI',
                'Cybersecurity',
                'Data Mining',
                'Algorithms',
                'IoT',
            ],
        };
    },
    methods: {
        onEditClicked() {
            console.log(this.inEdit);
            this.inEdit = !this.inEdit;
        },
        editProject() {
            this.indexes.forEach((index) => {
                this.project_fields.push(index)
            });
            updateProject({
                id: this.$props.project.id,
                project_name: this.project_name || this.$props.project.project_name,
                project_duration: this.project_duration || this.$props.project.project_duration,
                project_fields: this.project_fields || this.$props.project.project_fields,
                overview: this.overview || this.$props.project.overview
            })
            .then(() => {
                Swal.fire("Added!", "Project has been updated", "success");
                this.onEditClicked()
            }); 
        }
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

        const removeProject = async () => {
            await deleteProject({
                id: props.project.id,
            }).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Project Deleted!',
                });
            });
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

        const displayDeleteAndEditIcon = () => {
            return (
                state.userIsStaff && state.isYourProject && !state.involvement
            );
        };

        const displayApplyButton = () => {
            return state.involvement?.statusCode === RESEARCH_INTEREST_ACCEPTED;
        };

        const statusDisplayer = computed(() => {
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
            return '';
        });

        const downloadFile = () => {
            const { files } = state.involvement as any;
            var link = document.createElement('a');
            link.download = files[files.length - 1];
            link.target = '_blank';
            link.href = files[files.length - 1];
            document.body.appendChild(link);
            link.click();
        };

        const showResubmit = () => {
            return (
                state.involvement &&
                state.involvement.statusCode === RESEARCH_APPLY
            );
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

        const downloadEoiForm = () => {
            var link = document.createElement('a');
            link.download = "https://firebasestorage.googleapis.com/v0/b/eureka-development-5ff24.appspot.com/o/fit-expression-of-interest-form-Jan-2018.docx?alt=media&token=f4b55da5-32cc-42b1-9084-6eb02f534501"
            link.target = "_blank";
            link.href = "https://firebasestorage.googleapis.com/v0/b/eureka-development-5ff24.appspot.com/o/fit-expression-of-interest-form-Jan-2018.docx?alt=media&token=f4b55da5-32cc-42b1-9084-6eb02f534501"
            document.body.appendChild(link);
            link.click();
        }

        return {
            state,
            showModal,
            closeModal,
            downloadFile,
            showResubmit,
            onCardClicked,
            statusDisplayer,
            expressInterest,
            displayInterestIcon,
            displayApplyButton,
            removeProject,
            displayDeleteAndEditIcon,
            downloadEoiForm,
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
    &--buttons {
        display: flex;
        flex-direction: column;
    }
    &--edit {
        display: flex;
        flex-direction: column;
    }
    &--textarea {
        height: 100px;
    }
    &--button {
        padding-top: 10px;
    }
}

.custom-input {
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;
    border: 1px solid $color-bg-hover;
    border-radius: 4px;
    &__label {
        color: $color-brand;
    }
    &::placeholder {
        color: $color-bg-hover;
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
