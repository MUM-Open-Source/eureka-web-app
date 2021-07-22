<template>
    <div class="user__card pad--2">
        <div class="user__card--details">
            <!-- Details -->
            <div class="user__card--row">
                <!-- name -->
                <div class="subheading user__card--name">
                    {{ userNumber }}. {{ userName }}
                </div>
                <div
                    class="tagline user__card--actions mar__t--1"
                    v-if="buttoncheck"
                >
                    <router-link
                        :to="{
                            name: 'NewPeerReview',
                            params: {
                                team_id: team_id,
                                to_id: to_id,
                                teamName: teamName,
                            },
                        }"
                    >
                        <Button text="Do Peer Review" />
                    </router-link>
                </div>
                <div class="tagline user__card--actions mar__t--1" v-else>
                    <Button
                        class="user__card--buttonOff"
                        text="Do Peer Review"
                    />
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
    name: 'PeerReviewUserCard',
    components: { Button },
    props: {
        // Need to be changed
        team_id: {
            type: String,
            required: true,
        },
        teamName: {
            type: String,
            required: true,
        },
        to_id: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        userNumber: {
            type: Number,
            required: true,
        },
        buttoncheck: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    setup(props) {
        function createNewPeerReview() {
            console.log('Team ID: ' + props.team_id);
            console.log('To student ID: ' + props.to_id);
            router.push({
                name: 'NewPeerReview',
                params: {
                    team_id: props.team_id,
                    teamName: props.teamName,
                    to_id: props.to_id,
                },
            });
        }

        return {
            createNewPeerReview,
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
