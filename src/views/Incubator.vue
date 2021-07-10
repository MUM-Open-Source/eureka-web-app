<template>
    <div class="outer-div">
        <div class="inner-div" v-if="true">
            <div class="heading text--center mar__t--3">Incubator</div>
            <IncubatorTabs @on-tab-change="updateTab" />
            <TabsWrapper>
                <Tab title="Tab 1">This is Tab 1</Tab>
                <Tab title="Tab 2">This is Tab 2</Tab>
            </TabsWrapper>
            <!-- <div class="panel-div mar__t--1">
                <overview-panel v-if="tab === 0" />
                <user-panel v-if="tab === 1" />
                <events-panel v-if="tab === 2" />
                <feedback-panel v-if="tab === 3" />
            </div> -->
        </div>
        <div class="inner-div" v-else>
            <NotFound />
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import IncubatorTabs from '@/modules/incubator/IncubatorTabs.vue';
import Tab from '@/modules/incubator/Tab.vue';
import TabsWrapper from '@/modules/incubator/TabsWrapper.vue';
import NotFound from '@/views/NotFound.vue';

export default defineComponent({
    name: 'Incubator',
    components: { IncubatorTabs, Tab, TabsWrapper, NotFound },
    setup() {
        // to keep track of the tab
        const tab = ref(0);

        const updateTab = (newTab: number) => tab.value = newTab;

        // const isAdmin = computed(() => store.state.user_data?.roles.includes("admin"));

        return {
            tab,
            updateTab,
            // isAdmin
        }
    }
});
</script>

<style>

</style>