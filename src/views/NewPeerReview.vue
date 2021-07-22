<template>
    <div class="page-pad">
        <div class="peer-review-content text--center">
                <button class="back-button" @click="handleBackButtonClick">
                    <fa icon="angle-double-left" size="lg" />
                </button>

            <div class="heading peer-review-content__title">Peer Review</div>
            <QuestionCard
                v-for="(question, index) in questions"
                :key="index"
                :question="question"
                :questionNumber="index + 1"
                @question-rating="handleRatingClick"
                class="mar__b--3"
            />

            <ReviewCommentCard
                v-model:value="inputText['summary']"
                class="mar__b--3"
                :placeholder="'Input Text Here'"
            />

            <Button
                text="Submit"
                class="mar--auto mar__t--3 mar__b--1"
                @click="handlePeerReviewClick"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import store from '@/store';
import QuestionCard from '@/modules/peer-review/QuestionCard.vue';
import ReviewCommentCard from '@/modules/peer-review/ReviewCommentCard.vue';
import Button from '@/common/Button.vue';
import Swal from 'sweetalert2';
import router from '@/router';

export default defineComponent({
    name: 'NewPeerReview',
    components: { QuestionCard, ReviewCommentCard, Button },
    props: {
        // To be changed when props are available
        team_id: {
            type: String,
            required: true,
        },
        to_id: {
            type: String,
            required: true,
        },
        teamName: {
            type: String,
            required: true,
        }
    },
    setup(props) {
        const questions = [
            'lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet',
            'Is he/she a freeloader?',
            'Do you like he/she?',
        ];

        var inputRatings: number[] = new Array(questions.length);
        var inputText = reactive({} as { [id: string]: string });

        function handleRatingClick(questionIndex: number, value: number) {
            inputRatings[questionIndex] = value;
        }

        function handlePeerReviewClick() {
            const allMandatoryRatingsFilled = function() {
                for (var i = 0; i < inputRatings.length; i++) {
                    if (!Number.isInteger(inputRatings[i])) {
                        return false;
                    }
                }
                return true;
            };

            const allMandatoryFieldsFilled = () =>
                inputText['summary'].length !== 0;

            function totalRating(): number {
                var count: number = 0;
                for (var i = 0; i < inputRatings.length; i++) {
                    count += inputRatings[i];
                }
                return count;
            }

            function arrayToDictionaryHelper() {
                const tempDict: { [id: string]: number } = {};
                for (var i = 0; i < inputRatings.length; i++) {
                    tempDict[questions[i]] = inputRatings[i];
                }
                return tempDict;
            }

            if (allMandatoryRatingsFilled() && allMandatoryFieldsFilled()) {
                const peerReview = {
                    // To be changed
                    team_id: props.team_id,
                    to_id: props.to_id,
                    rating_count: questions.length,
                    rating_sum: totalRating(),
                    responses: arrayToDictionaryHelper(),
                    summary: inputText,
                };
                store.dispatch('newPeerReview', peerReview);
                router.push({
                name: 'PeerReviewTeamOverview',
                params: {
                    team_id: props.team_id,
                    teamName: props.teamName,
                },
            });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Please fill all the mandatory fields',
                    text: 'Fill up please',
                });
            }
        }

        function handleBackButtonClick() {
            console.log("Team ID: " + props.team_id)
            console.log("Team Name: " + props.teamName)
            router.push({
                name: 'PeerReviewTeamOverview',
                params: {
                    team_id: props.team_id,
                    teamName: props.teamName,
                },
            });
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Peer Review is not saved.',
            });
        }

        return {
            questions,
            inputText,
            handlePeerReviewClick,
            handleRatingClick,
            handleBackButtonClick,
        };
    },
});
</script>

<style lang="scss" scoped>
.peer-review-content {
    margin-left: auto;
    margin-right: auto;

    &__title {
        margin-bottom: 15px;
        font-size: 36px;
    }
}

table {
    width: 100%;
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
