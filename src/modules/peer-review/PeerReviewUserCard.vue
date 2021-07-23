<template>
    <section id="team">
        <!--container---------------->
        <div class="container">
            <!--box-1----------->
            <div class="box">
                <!--top-bar---------------->
                <div class="top-bar"></div>
                <!--img and details---------------->
                <div class="details">
                    <img alt="" src="@/assets/default-user-image.png" />
                    <span class="subheading">{{ userName }}</span>
                    <p>Details goes here.</p>
                </div>
                <div v-if="buttoncheck">
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
    background-color: #507bfc;
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
