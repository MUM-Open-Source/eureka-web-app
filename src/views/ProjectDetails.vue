<template>
    <!-- <div class="pad--5 something-info">
        <div>
            <div class="heading something-info__specific">
                Project Name:
                <div class="tagline something-info__specific--answer">
                    {{ project_detail.project_name }}
                </div>
            </div>
            <div class="heading something-info__specific">
                Staff PIC:
                <div class="tagline something-info__specific--answer">
                    {{ project_detail.supervisor }}
                </div>
            </div>
            <div class="heading something-info__specific">
                Project Duration:
                <div class="tagline something-info__specific--answer">
                    {{ project_detail.project_duration }}
                </div>
            </div>
            <div class="heading something-info__specific">
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
    </div> -->
    <div>{{ project_detail.project_name }}</div>
</template>

<script>
import { onMounted } from 'vue';
import store from '@/store';
import { useRoute } from 'vue-router';
// import Button from '@/common/Button.vue';
// import { onMounted } from 'vue';

export default {
    name: 'ProjectDetails',
    // components: {
    //     Button,
    // },
    setup() {

        const route = useRoute();
        const id = route.params.id;

        console.log('--------------');

        onMounted(() => {
            if (!store.state.projects.length) {
                console.log('asdfhgbakejvg');
                store.dispatch('getProject', id);
            }
        });

        console.log('hello');

        // const projectFinal = ref(store.state.project_detail);

        // const project_detail = projectFinal.value[0];

        // console.log(projectFinal);
        // console.log(project_detail);
        // // console.log(project_detail[0]);

        // return {
        //     project_detail,
        //     projectFinal
        // };
    },
};
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
