<template>
    <div class="page-pad">
        <div class="text--center">
            <button class="back-button cursor__pointer" @click="handleBackButton">
                <fa icon="angle-double-left" size="lg" />
            </button>

            <div class="heading mar__b--3">Joined Team</div>
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
button {
    &:hover {
        transform: scale(1.2);
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
