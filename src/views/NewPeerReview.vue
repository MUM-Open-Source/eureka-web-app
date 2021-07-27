<template>
    <div class="page-pad">
        <div class="peer-review-content text--center">
            <button class="back-button" @click="handleBackButtonClick">
                <fa icon="angle-double-left" size="lg" />
            </button>

            <div class="heading peer-review-content__title">Peer Review</div>
            <div class="peer-review-content__to">
                <span class="subheading mar--1">Team:</span>
                <span class="body">{{ teamName }}</span>
                <br />
                <span class="subheading mar--1">To:</span>
                <span class="body">{{ to_id }}</span>
            </div>

            <QuestionCard
                v-for="(question, index) in ratingQuestions"
                :key="index"
                :question="question"
                :questionNumber="index + 1"
                @question-rating="handleRatingClick"
                class="mar__b--3"
            />

            <ReviewCommentCard
                v-for="(question, index) in textQuestions"
                :key="index"
                :question="question"
                :questionNumber="ratingQuestions.length + index + 1"
                :placeholder="'Input Text Here'"
                v-model:value="inputText[index]"
                class="mar__b--3"
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
        },
    },
    setup(props) {
        const ratingQuestions = [
            `How would you rate the overall performance of ${props.to_id}?`,
            `How well is ${props.to_id} able to collaborate and cooperate with the other teammates?`,
            `How well does ${props.to_id} demonstrate respect for the work and ideas of others?`,
            `How efficient is ${props.to_id} in completing assigned tasks and their general time management?`,
            `How well does ${props.to_id} perform in terms of punctuality and participation during meetings?`,
            `How is the leadership skills of ${props.to_id}?`,
            `How well is ${props.to_id} able to communicate and exchange ideas with others in the team?`,
            `How well does ${props.to_id} demonstrates a willingness to listen to what others have to say?`,
            `How willing is ${props.to_id} to accept responsibility for their own actions?`,
        ];

        const textQuestions = [
            `Share any general comments you have about your experience working with ${props.to_id}.`,
        ];

        const inputRatings: number[] = new Array(ratingQuestions.length);
        const inputText = reactive(new Array(textQuestions.length) as string[]);

        function handleRatingClick(questionIndex: number, value: number) {
            inputRatings[questionIndex] = value;
        }

        function handlePeerReviewClick() {
            const allMandatoryRatingsFilled = function() {
                for (let i = 0; i < inputRatings.length; i++) {
                    if (!Number.isInteger(inputRatings[i])) {
                        return false;
                    }
                }
                return true;
            };

            const allMandatoryFieldsFilled = function() {
                for (let i = 0; i < inputText.length; i++) {
                    if (
                        inputText[i] == undefined ||
                        inputText[i].length === 0
                    ) {
                        return false;
                    }
                }
                return true;
            };

            function totalRating(): number {
                let count: number = 0;
                for (let i = 0; i < inputRatings.length; i++) {
                    count += inputRatings[i];
                }
                return count;
            }

            function arrayToDictionaryHelper(
                input: (number | string)[],
                questions: string[]
            ) {
                const tempDict: { [id: string]: number | string } = {};
                for (let i = 0; i < input.length; i++) {
                    tempDict[questions[i]] = input[i];
                }
                return tempDict;
            }

            if (allMandatoryRatingsFilled() && allMandatoryFieldsFilled()) {
                const peerReview = {
                    // To be changed
                    team_id: props.team_id,
                    to_id: props.to_id,
                    rating_count: ratingQuestions.length,
                    text_count: textQuestions.length,
                    rating_sum: totalRating(),
                    rating_responses: arrayToDictionaryHelper(
                        inputRatings,
                        ratingQuestions
                    ),
                    text_responses: arrayToDictionaryHelper(
                        inputText,
                        textQuestions
                    ),
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
            ratingQuestions,
            textQuestions,
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
