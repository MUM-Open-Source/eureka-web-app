<template>
  <div class="user__card pad--2 mar__b--1">
        <div class="user__card--details">
            <!-- Details -->
            <div class="user__card--row mar__b--1">
                <!-- name -->
                <div class="subheading user__card--project">{{ project.project_name }}</div><span class="user__card--name">({{ project.supervisor }})</span>
                <!-- tags -->
                <div class="user__card--tags">
                    <div
                        v-for="fields in project.project_fields"
                        :key="fields"
                        class="tagline text--capsule cursor__default">
                        {{ fields }}
                    </div>
                </div>
            </div>
            <!-- bio -->
            <div class="body">
                {{ project.overview }}
            </div>
        </div>
        <!-- Apply Button -->
        <Button text="APPLY" class=user__card--actions @click="showModal" />
    </div>

    <Dialog v-show="isModalVisible" @close="closeModal" :file_Upload="project.project_name" />
</template>

<script>
import Button from '@/common/Button.vue'
import Dialog from '@/common/Dialog.vue'

export default {
    name: 'List',
    components: {Button, Dialog},
    data() {
        return {
            isModalVisible: false
        }
    },
    props: {
        project: {
            type: Object,
            required: true
        }
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        }
    }
}
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
</style>
