<template>
    <div class="page-pad">
        <div class="peer-review-content text--center">
            <button class="back-button" @click="handleBackButton">
                <fa icon="angle-double-left" size="lg"/>
            </button>

            <div class="heading peer-review-content__title">Peer Review</div>
            <table>
                <QuestionCard
                    v-for="(question, index) in questions"
                    :key="index"
                    :question="question"
                    :questionNumber="index + 1"
                    @question-rating="handleClick"
                />

                <tr>
                    <ReviewCommentCard
                        v-model:value="inputValues.shortSummary"
                        class="mar__b--2"
                        label="Short Summary"
                        id="short_review"
                    />
                </tr>
            </table>

            <!-- <pre :style="{ 'text-align': 'left' }">{{
        JSON.stringify(inputValues, null, 2)
      }}</pre> -->

            <div>
                <Button
                    text="Submit"
                    class="mar--auto mar__t--3 mar__b--1"
                    @click="handlePeerReview"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import QuestionCard from '@/modules/peer_review/QuestionCard.vue';
import ReviewCommentCard from '@/modules/peer_review/ReviewCommentCard.vue';
import Button from '@/common/Button.vue';
import { reactive } from '@vue/reactivity';
import Swal from 'sweetalert2';
import router from '@/router';

export default defineComponent({
    name: 'PeerReview',
    components: { QuestionCard, ReviewCommentCard, Button },
    props: {
        // team_id: {
        //   type: String,
        //   required: true,
        //   defaut: "0",
        // },
        // to_id: {
        //   type: String,
        //   required: true,
        //   defaut: "2",
        // },
    },
    setup() {
        const questions = [
            'lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet',
            'Is he/she a freeloader?',
            'Do you like he/she?',
        ];

        var inputRatings: number[] = new Array(questions.length);

        const inputValues = reactive({
            shortSummary: '',
        });

        function handleClick(questionIndex: number, value: number) {
            inputRatings[questionIndex] = value;
        }

        function handlePeerReview() {
            const allMandatoryRatingsFilled = function() {
                for (var i = 0; i < inputRatings.length; i++) {
                    if (!Number.isInteger(inputRatings[i])) {
                        return false;
                    }
                }
                return true;
            };

            const allMandatoryFieldsFilled = () =>
                inputValues.shortSummary.length !== 0;

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
                    team_id: '0',
                    to_id: '1',
                    rating_count: questions.length,
                    rating_sum: totalRating(),
                    responses: arrayToDictionaryHelper(),
                    summary: inputValues.shortSummary,
                };
                store.dispatch('newPeerReview', peerReview);
                router.push('PR-TeamOverview');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Please fill all the mandatory fields',
                    text: 'Fill up please',
                    // text: "They are marked with an asterisk (*) for your convenience",
                });
            }
        }

        function handleBackButton() {
            Swal.fire({
                title: 'Are you sure?',
                text: "Your current changes won't be saved!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, take me back.',
            }).then(result => {
                if (result.isConfirmed) {
                    router.push('PR-TeamOverview');
                }
            });
        }

        return {
            questions,
            inputValues,
            handlePeerReview,
            handleClick,
            handleBackButton,
        };
    },
});
</script>

<style lang="scss" scoped>
.peer-review-content {
    margin-left: auto;
    margin-right: auto;

    &__title {
        text-decoration: underline;
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
    // padding: 5px 5px 2px 15px;
    // margin-left: 25px;
    color: $color-white;
    border: none;
    // border-radius: $btn-border-radius;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    &:focus {
        outline: 0;
    }
}
</style>
