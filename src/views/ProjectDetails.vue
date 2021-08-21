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
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import store from '@/store';
import List from '@/common/List.vue';
import IconButton from '@/modules/admin/IconButton.vue';
import router from '@/router';

export default defineComponent({
    components: { List, IconButton },
    name: 'ProjectDetails',
    setup() {
        const route = useRoute();
        const id = route.params.id;
        const state = reactive({
            project_detail: null,
        });

        onMounted(() => {
            store.state.project_detail.length > 0
                ? (state.project_detail = ref(store.state.project_detail[0]))
                : store.dispatch('getProject', {
                      onRecieve: (project) => (state.project_detail = project),
                      id,
                  });
        });

        const goBack = () => router.back();

        return {
            state,
            goBack,
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
</style>
