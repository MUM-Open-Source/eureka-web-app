<template>
    <div class="pad--5 something-info">
        <div>
            <div class="heading something-info__specific">
                Project Name
                <div class="tagline something-info__specific--answer">
                    {{ project_detail[0].project_name }}
                </div>
            </div>
            <div class="heading something-info__specific">
                Staff PIC
                <div class="tagline something-info__specific--answer">
                    {{ project_detail[0].supervisor }}
                </div>
            </div>
            <div class="heading something-info__specific">
                Project Duration
                <div class="tagline something-info__specific--answer">
                    {{ project_detail[0].project_duration }}
                </div>
            </div>
            <div class="heading something-info__specific">
                Project Field(s)
                <div
                    v-for="field in project_detail[0].project_fields"
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
</template>

<script>
import store from '@/store';
import { useRoute } from 'vue-router';
import { defineComponent, ref } from 'vue';
import Button from '@/common/Button.vue';

export default defineComponent({
    name: 'ProjectDetails',
    components: {
        Button,
    },
    setup() {
        const route = useRoute();
        const id = route.params.id;
        store.dispatch('getProject', id);
        const project_detail = ref(store.state.project_detail);

        return {
            project_detail,
        };
    },
});
</script>

<style lang="scss">
.something-info {
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
