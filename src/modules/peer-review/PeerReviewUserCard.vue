<template>
    <section id="team">
        <!--container---------------->
        <div class="container">
            <!--box----------->
            <div class="box">
                <!--top-bar---------------->
                <div class="top-bar"></div>
                <!--img and details---------------->
                <div class="details">
                    <img alt="" src="@/assets/default-user-image.png" />
                    <span class="subheading">{{ userName }}</span>
                    <p>Details goes here.</p>
                </div>
                <div v-if="checkIfDone">
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
                <div v-else>
                    <Button class="button-off" text="Do Peer Review" />
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import Button from '@/common/Button.vue';
import router from '@/router';
import store from '@/store';

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
    },
    setup(props) {
        function createNewPeerReview() {
            router.push({
                name: 'NewPeerReview',
                params: {
                    team_id: props.team_id,
                    teamName: props.teamName,
                    to_id: props.to_id,
                },
            });
        }

        const peerReviews = reactive(store.state.peer_reviews);
        const checkToId: string[] = [];

        const checkIfDone = computed(() => {
            peerReviews.forEach(eachPeerReviews => {
                if (eachPeerReviews.team_id === props.team_id) {
                    checkToId.push(eachPeerReviews.to_id);
                }
            });

            if (checkToId.includes(props.to_id)) {
                return false;
            } else {
                return true;
            }
        });

        return {
            createNewPeerReview,
            checkIfDone,
        };
    },
});
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}
.box {
    width: 266px;
    height: 340px;
    background-color: #ffffff;
    box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-radius: 10px;
    margin: 20px;
    position: relative;
}
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.top-bar {
    width: 50%;
    height: 4px;
    position: absolute;
    left: 50%;
    top: 0px;
    transform: translateX(-50%);
    background-color: $color-brand;
    border-radius: 0px 0px 10px 10px;
}
.details {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.details img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    object-position: center;
    margin: 25px 0 25px 0;
}
.button-off {
    opacity: 30%;
    &:hover {
        cursor: default;
    }
}
</style>
