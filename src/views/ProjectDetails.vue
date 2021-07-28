<template>
    <div class="pad--5 project-info">
        <div>
            <div class="heading project-info__specific">
                Project Name:
                <div class="tagline project-info__specific--answer">
                    {{ project_detail.project_name }}
                </div>
            </div>
            <div class="heading project-info__specific">
                Staff PIC:
                <div class="tagline project-info__specific--answer">
                    {{ project_detail.supervisor }}
                </div>
            </div>
            <div class="heading project-info__specific">
                Project Duration:
                <div class="tagline project-info__specific--answer">
                    {{ project_detail.project_duration }}
                </div>
            </div>
            <div class="heading project-info__specific">
                Project Field(s):
                <div
                    v-for="field in project_detail.project_fields"
                    :key="field"
                    class="tagline text--capsule cursor__default"
                >
                    {{ field }}
                </div>
            </div>
        </div>
        <div>
            <Button text="APPLY" />
        </div>
    </div>
    <!-- <img src="@/assets/line.svg" class="project-details__line" /> -->
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import store from '@/store';
import { useRoute } from 'vue-router';
import Button from '@/common/Button.vue';

export default {
    name: 'ProjectDetails',
    components: {
        Button,
    },
    setup() {
        const route = useRoute();

        onMounted(() => {
            const id = route.params.id;
            console.log(id);
            store.dispatch('getProject', id);
        });

        const project_detail = store.state.project_detail[1];

        console.log(project_detail);

        return {
            project_detail,
        };
    },
};
</script>

<style lang="scss">
.project-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__specific {
        display: flex;
        flex-direction: row;
        padding-bottom: 20px;

        &--answer {
            align-self: center;
            padding-left: 10px;
            font-size: 20px;
        }
    }
}
</style>
