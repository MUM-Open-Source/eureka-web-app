<template>
    <div class="user__card pad--2">
        <div class="user__card--row">
            <!-- name -->
            <div class="subheading user__card--name">
                {{ teamNumber }}. {{ teamName }}
            </div>
            <div
                class="tagline user__card--actions mar__t--1"
                v-if="buttoncheck"
            >
                <Button text="Enter Team" @click="handleEnterTeam" />
            </div>
            <div class="tagline user__card--actions mar__t--1" v-else>
                <Button class="user__card--buttonOff cursor__default" text="Enter Team" />
            </div>
        </div>
        <!-- Action items -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/common/Button.vue';
import router from '@/router';

export default defineComponent({
    name: 'PeerReviewTeamCard',
    components: { Button },
    props: {
        team_id: {
            type: String,
            required: true,
        },
        teamNumber: {
            type: Number,
            required: true,
        },
        teamName: {
            type: String,
            requred: true,
        },
        buttoncheck: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    setup(props) {
        function handleEnterTeam() {
            router.push({
                name: 'PeerReviewTeamOverview',
                params: {
                    team_id: props.team_id,
                    teamName: props.teamName!,
                },
            });
        }

        return {
            handleEnterTeam,
        };
    },
});
</script>

<style lang="scss" scoped>
.user__card {
    @include shadow--small;
    border-radius: $app-border-radius-sm;
    &--row {
        display: flex;
        justify-content: space-between;
    }
    &--actions {
        display: flex;
        margin-top: 0px;
        align-items: center;
    }
    &--buttonOff {
        opacity: 30%;
    }
}
</style>
