<template>
    <div class="page-pad">
        <div class="PR-current-team-overview-content text--center">
            <button class="back-button" @click="handleBackButton">
                <fa icon="angle-double-left" size="lg" />
            </button>

            <div class="heading PR-current-team-overview-content__title">Joined Team</div>
            <PeerReviewTeamCard
                class="mar__b--2"
                v-for="i in [1, 2, 3, 4, 5]"
                :key="i"
                :team_id="'Team ' + i"
                :teamNumber="i"
                :teamName="'Team ' + i"
                :buttoncheck="true"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PeerReviewTeamCard from '@/modules/peer-review/PeerReviewTeamCard.vue';

export default defineComponent({
    name: 'PeerReviewTeamOverview',
    components: { PeerReviewTeamCard },
    props: {
        // team_id: {
        //     type: String,
        //     required: true,
        // }
    },
    setup() {},
});
</script>

<style lang="scss" scoped>
.PR-current-team-overview-content {
    margin-left: auto;
    margin-right: auto;

    &__title {
        margin-bottom: 50px;
        font-size: 36px;
    }
}

.back-icon {
    font-size: 36px;
}

button {
    &:hover {
        transform: scale(1.2);
        cursor: pointer;
    }
}

.back-button {
    @include gradientAnimation($color-brand, $color-brand-alt);
    @include shadow;
    display: block;
    color: $color-white;
    border: none;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    z-index: 0;
    &:focus {
        outline: 0;
    }
}
</style>
