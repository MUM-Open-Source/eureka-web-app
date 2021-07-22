<template>
    <div class="user__card pad--2">
        <div class="user__card--details">
            <!-- Details -->
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
                    <Button class="user__card--buttonOff" text="Enter Team" />
                </div>
            </div>
            <!-- Action items -->
        </div>
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
            console.log("Team_ID: " + props.team_id);
            router.push({
                name: 'PeerReviewTeamOverview',
                params: {
                    team_id: props.team_id,
                    teamName: props.teamName!,
                }
            })
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
    display: flex;
    border-radius: $app-border-radius-sm;
    &--name {
        margin-right: 15px;
    }
    &--row {
        display: flex;
        align-items: center;
    }
    &--actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        &-icon {
            margin-right: 5px;
        }
    }
    &--icon {
        width: 30px;
        margin: 5px;
        transition: all $transition-duration-fast;
        &:hover {
            color: $color-brand;
        }
    }
    &--buttonOff {
        opacity: 30%;
        &:hover {
            cursor: default;
        }
    }
}
</style>
