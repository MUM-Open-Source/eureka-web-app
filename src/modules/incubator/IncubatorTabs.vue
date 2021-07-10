<template>  
    <div>
        <div class="top-button-bar">
            <FlatButton
                @click="changeTab(0)"
                v-bind:enabled="currentTab === 0"
                text="Overview"
            />
            <FlatButton
                @click="changeTab(1)"
                v-bind:enabled="currentTab === 1"
                text="Users"
            />
            <FlatButton
                @click="changeTab(2)"
                v-bind:enabled="currentTab === 2"
                text="Events"
            />
            <FlatButton
                @click="changeTab(3)"
                v-bind:enabled="currentTab === 3"
                text="Feedback"
            />
        </div>
        <!-- <div class="bottom-div">
            <feedback-panel v-if="currentTab === 3"></feedback-panel>
            <user-panel v-if="currentTab === 1"></user-panel>
        </div> -->
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import FlatButton from '@/modules/admin/FlatButton.vue';

export default defineComponent({
    name: 'IncubatorTabs',
    components: { FlatButton },
    emits: ['on-tab-change'],
    setup(props, { emit }) {
        const currentTab = ref(0);

        const changeTab = (number: number) => {
            currentTab.value = number;
            emit('on-tab-change', number);
        }

        return {
            currentTab,
            changeTab
        }
    }
});
</script>

<style lang="scss">
.top-button-bar {
  margin: 8px;
  display: flex;
  flex-direction: row;
}
</style>


