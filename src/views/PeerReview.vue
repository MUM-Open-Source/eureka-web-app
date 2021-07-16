<template>
  <div class="page-pad">
    <div class="peer-review-content text--center">
      <div class="heading peer-review-content__title">Peer Review</div>
      <table>
        <QuestionCard
          v-for="question in questions"
          :key="question.id"
          :question="question"
        />

        <tr>
          <ReviewCommentCard
            v-model:value="inputValues.shortSummary"
            class="mar__b--2"
            label="Short Review"
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
// import { ref, onMounted } from 'vue';
// import store from '@/store';
import QuestionCard from "@/modules/peer_review/QuestionCard.vue";
import ReviewCommentCard from "@/modules/peer_review/ReviewCommentCard.vue";
import Button from "@/common/Button.vue";
import { reactive } from "@vue/reactivity";
import Swal from "sweetalert2";

export default {
  name: "PeerReview",
  components: { QuestionCard, ReviewCommentCard, Button },
  setup() {
    const questions = [
      {
        id: 1,
        value:
          "lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet",
      },
      { id: 2, value: "Is he/she a freeloader?" },
      { id: 3, value: "Do you like he/she?" },
    ];

    const inputValues = reactive({
      question1: 1,
      question2: 3,
      question3: 2,
      shortSummary: "",
    });

    function handlePeerReview() {
      const allMandatoryFieldsFilled = () =>
        inputValues.shortSummary.length === 0;

      if (allMandatoryFieldsFilled()) {
        Swal.fire({
          icon: "error",
          title: "Please fill all the mandatory fields",
          text: "Fill up please",
          // text: "They are marked with an asterisk (*) for your convenience",
        });
      } else {
        console.log(inputValues.question1);
        console.log(inputValues.question2);
        console.log(inputValues.question3);
        console.log(inputValues.shortSummary);
      }
    }

    return {
      handlePeerReview,
      questions,
      inputValues,
    };
  },
};
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
</style>
