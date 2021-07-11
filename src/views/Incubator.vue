<template>
    <div class="outer-div">
        <div class="inner-div" v-if="true">
            <div class="heading text--center mar__t--3">Incubator</div>
            <TabsWrapper>
                <Tab title="Tab 1">This is Tab 1</Tab>
                <Tab title="Tab 2">This is Tab 2</Tab>
            </TabsWrapper>
        </div>
        <div class="inner-div" v-else>
            <NotFound />
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import TabsWrapper from '@/common/TabsWrapper.vue';
import Tab from '@/common/Tab.vue';
import NotFound from '@/views/NotFound.vue';

export default defineComponent({
    name: 'Incubator',
    components: { TabsWrapper, Tab, NotFound },
    setup() {
        // to keep track of the tab
        const tab = ref(0);

        const updateTab = (newTab: number) => tab.value = newTab;

        return {
            tab,
            updateTab
        }
    }
});
</script>

<style>

</style>