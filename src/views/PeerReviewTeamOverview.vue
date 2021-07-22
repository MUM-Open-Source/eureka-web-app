<template>
    <div class="page-pad">
        <div class="PR-current-team-overview-content text--center">
            <router-link :to="{ name: 'PeerReviewTeamList' }">
                <button class="back-button">
                    <fa icon="angle-double-left" size="lg" />
                </button>
            </router-link>

            <div class="heading PR-current-team-overview-content__title">
                {{ teamName }}
            </div>
            <PeerReviewUserCard
                class="mar__b--2"
                v-for="i in [1, 2, 3, 4, 5]"
                :key="i"
                :team_id="team_id"
                :teamName="teamName"
                :to_id="'Team Member ' + i"
                :userName="'Team Member ' + i"
                :userNumber="i"
                :buttoncheck="true"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PeerReviewUserCard from '@/modules/peer-review/PeerReviewUserCard.vue';

export default defineComponent({
    name: 'PeerReviewTeamOverview',
    components: { PeerReviewUserCard },
    props: {
        team_id: {
            type: String,
            required: true,
        },
        teamName: {
            type: String,
            required: true,
        },
    },
    setup() {},
});
</script>

<style lang="scss" scoped>
.PR-current-team-overview-content {
    margin-left: auto;
    margin-right: auto;

    &__title {
        margin-bottom: 15px;
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
    &:focus {
        outline: 0;
    }
}
</style>
