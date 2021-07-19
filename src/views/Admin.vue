<template>
    <div class="outer-div">
        <div class="inner-div" v-if="isAdmin">
            <div class="heading text--center mar__t--3">Mission Control</div>
            <admin-button-bar :onTabChange="num => changeTabs(num)" />
            <div class="panel-div mar__t--1">
                <overview-panel v-if="tab === 0" />
                <user-panel v-if="tab === 1" />
                <events-panel v-if="tab === 2" />
                <feedback-panel v-if="tab === 3" />
            </div>
        </div>
        <div class="inner-div" v-else>
            <NotFound />
        </div>
    </div>
</template>

<script>
import AdminButtonBar from '@/modules/admin/AdminPanelComponent/AdminButtonBar.vue';
import EventsPanel from '@/modules/admin/AdminViews/EventsPanel.vue';
import FeedbackPanel from '@/modules/admin/AdminViews/FeedbackPanel.vue';
import OverviewPanel from '@/modules/admin/AdminViews/OverviewPanel.vue';
import UserPanel from '@/modules/admin/AdminViews/UserPanel.vue';
import NotFound from '@/views/NotFound.vue';
import store from '@/store';
import { computed, ref } from 'vue';

export default {
    components: {
        AdminButtonBar,
        FeedbackPanel,
        OverviewPanel,
        UserPanel,
        EventsPanel,
        NotFound,
    },
    name: 'Admin',
    setup() {
        // to keep track of the tab
        const tab = ref(0);

        const changeTabs = newTab => {
            tab.value = newTab;
        };

        const isAdmin = computed(() =>
            store.state.user_data?.roles.includes('admin')
        );

        return {
            tab,
            changeTabs,
            isAdmin,
        };
    },
};
</script>

<style lang="scss">
.outer-div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 60px);
    width: 100%;
    .inner-div {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 95%;
        height: 100%;
        .panel-div {
            overflow-y: scroll;
            height: calc(100% - 16px);
            width: calc(100% - 16px);
        }
    }
}
</style>
