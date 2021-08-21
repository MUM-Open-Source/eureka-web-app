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
                    project.overview.length > 500 && !props.is_details_page
                        ? `${project.overview.substring(0, 500)} ...`
                        : project.overview
                }}
            </div>
        </div>

        <!-- Apply Button (Only in All Projects Student View) -->
        <Button
            text="APPLY"
            class="user__card--actions"
            @click="showModal"
            v-if="isYourProject"
            :project_status="project_status"
        />

        <!-- Status Update (For Students) -->
        <div class="tagline text--capsule cursor__default" v-if="userIsStudent">
            pending
        </div>
    </div>

    <Dialog
        v-show="isModalVisible"
        @close="closeModal"
        :file_Upload="project.project_name"
    />
</template>

<script lang="ts">
import Button from '@/common/Button.vue';
import Dialog from '@/common/Dialog.vue';
import router from '@/router';
import store from '@/store';
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'List',
    components: { Button, Dialog },
    data() {
        return {
            isModalVisible: false,
        };
    },
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
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
    },
    setup(props) {
        // Hides Apply Button if either at Your Projects (Student & Staff) or All Projects (Staff)
        const isYourProject = computed(() => {
            return !props.project_status
                ? userIsStaff.value
                    ? false
                    : true
                : false;
        });

        // Checks if the user is a staff.
        const userIsStaff = computed(() => {
            return store.state.user_data
                ? store.state.user_data.roles.includes('staff')
                : false;
        });

        // Checks if the user is a student
        const userIsStudent = computed(() => {
            console.log(isYourProject.value);
            return !isYourProject.value
                ? store.state.user_data
                    ? store.state.user_data.roles.includes('talent')
                    : false
                : false;
        });

        const onCardClicked = () => {
            if (userIsStaff.value && !props.is_details_page) {
                store.state.project_detail = [props.project];
                router.push({
                    name: 'ProjectDetails',
                    params: { id: props.project.id },
                });
                return true;
            }
            return false;
        };

        return {
            props,
            userIsStudent,
            isYourProject,
            userIsStaff,
            onCardClicked,
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

.text--capsule {
    align-self: flex-start;
}
</style>
