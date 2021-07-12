<template>
    <div class="outer-div">
        <div class="inner-div" v-if="true">
            <div class="heading text--center mar__t--3">Incubator</div>
            <TabsWrapper>
                <Tab title="Your Team"><UserCard v-for="i in [1,2,3,4,5]" :key="i"/></Tab>
                <Tab title="Join A Team">This is Tab 2</Tab>
                <Tab title="Peers">This is Tab 3</Tab>
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
import UserCard from '@/modules/incubator/UserCard.vue';

export default defineComponent({
    name: 'IncubatorNitin',
    components: { TabsWrapper, Tab, NotFound, UserCard },
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