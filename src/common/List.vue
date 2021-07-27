<template>
    <div class="user__card pad--2 mar__b--1">
        <div class="user__card--details">
            <!-- Details -->
            <div class="user__card--row mar__b--1">
                <!-- name -->
                <div class="subheading user__card--project">
                    {{ project.project_name }}
                </div>
                <span class="user__card--name">({{ project.supervisor }})</span>
                <!-- tags -->
                <div class="user__card--tags">
                    <div
                        v-for="fields in project.project_fields"
                        :key="fields"
                        class="tagline text--capsule cursor__default"
                    >
                        {{ fields }}
                    </div>
                </div>
            </div>
            <!-- bio -->
            <div class="body">
                {{ project.overview }}
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

        <!-- Details Button (For Staff) -->
        <router-link :to="{ name: 'ProjectDetails' }" class="user__card--actions" v-if="userIsStaff">
            <Button text="DETAILS"/>
        </router-link>

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
            return props.project_status ? false : (userIsStaff.value ? false : true);
        });

        // Checks if the user is a staff.
        const userIsStaff = computed(() => {
            return store.state.user_data
                ? store.state.user_data.roles.includes('staff')
                : false
        })

        // Checks if the user is a student
        const userIsStudent = computed(() => {
            return isYourProject.value ? (store.state.user_data
                ? store.state.user_data.roles.includes('talent')
                : false) : false
        });

        return {
            userIsStudent,
            isYourProject,
            userIsStaff
        };
    },
});
</script>

<style lang="scss" scoped>
.user__card {
    @include shadow--small;
    display: flex;
    border-radius: $app-border-radius;
    justify-content: space-between;
    &--project {
        margin-right: $user-card-project-margin-right;
    }
    &--name {
        margin-right: $user-card-name-margin-right;
    }
    &--row {
        display: flex;
        align-items: center;
    }
    &--tags {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    &--rating {
        display: flex;
        .star__icon {
            width: $star-icon-width;
            margin-right: $star-icon-margin-right;
        }
    }
    &--actions {
        display: flex;
        height: $user-card-actions-height;
        align-self: center;
        margin-left: $user-card-row-margin-left;
    }
    &--icon {
        width: $user-card-icon-width;
        margin: $user-card-icon-margin;
    }
}

.text--capsule {
    align-self: center;
}
</style>
