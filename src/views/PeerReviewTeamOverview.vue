<template>
    <div class="page-pad">
        <div class="peer-review-team-overview-content text--center">
            <router-link :to="{ name: 'PeerReviewTeamList' }">
                <button class="back-button cursor__pointer">
                    <fa icon="angle-double-left" size="lg" />
                </button>
            </router-link>

            <div class="heading mar__b--1">
                {{ teamName }}
            </div>
            <div class="peer-review-team-overview-content__usercard pad--3">
                <PeerReviewUserCard
                    class="mar__b--2 card"
                    v-for="i in [1, 2, 3, 4, 5]"
                    :key="i"
                    :team_id="team_id"
                    :teamName="teamName"
                    :to_id="'Team Member ' + i"
                    :userName="'Team Member ' + i"
                    :userNumber="i"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import PeerReviewUserCard from '@/modules/peer-review/PeerReviewUserCard.vue';
import store from '@/store';

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
    setup() {
        onMounted(() => {
            // Fetch data if there's no peer review
            if (!store.state.peer_reviews.length) {
                store.dispatch('getPeerReview');
            }
        });

        return {
        };
    },
});
</script>

<style lang="scss" scoped>
.peer-review-team-overview-content {
    &__usercard {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
}

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
