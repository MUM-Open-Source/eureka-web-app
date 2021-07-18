<template>
    <div class="outer-div">
        <div class="inner-div" v-if="true">
            <div class="heading text--center mar__t--3">Incubator</div>
            <TabsWrapper>
                <Tab title="Your Team"><YourIncubatorTeam /></Tab>
                <Tab title="Join A Team"><Accordian /></Tab>
                <Tab title="Peers">This is Tab 3</Tab>
                <Tab title="Your Details">This is Tab 4</Tab>
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
import YourIncubatorTeam from '@/modules/incubator/YourIncubatorTeam.vue';
import Accordian from '@/modules/incubator/Accordian.vue';

export default defineComponent({
    name: 'IncubatorNitin',
    components: { TabsWrapper, Tab, NotFound, YourIncubatorTeam, Accordian },
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

<style lang="scss" scoped>

</style>