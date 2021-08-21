<template>
    <div class="pad--5 something-info">
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

export default defineComponent({
    components: { List },
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

        return {
            state,
        };
    },
});
</script>

<style lang="scss">
.something-info {
    display: flex;
    justify-content: space-between;

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
