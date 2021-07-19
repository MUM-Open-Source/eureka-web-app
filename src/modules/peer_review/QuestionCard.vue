<template>
  <tr>
    <div class="question-card pad--2 mar__b--2 mar__t--2">
      <div class="question-card__format">
        <span class="subheading">{{ questionNumber }}. </span>
        <span class="body">{{ question }}</span>
      </div>

      <br />
      <StarRating @update-rating="onClickChild" />
    </div>
  </tr>
</template>

<script lang="ts">
// @ts-check
import { defineComponent } from "vue";

import StarRating from "@/common/StarRating.vue";
// import { defineProps } from '@vue/runtime-core';
// import { computed } from 'vue';
// import store from '@/store';

export default defineComponent({
  name: "QuestionCard",
  components: { StarRating },
  props: {
    questionNumber: {
      type: Number,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
  },
  emits: ['question-rating'],
  setup(props, { emit }) {

    function onClickChild(value: number) {
      emit("question-rating", props.questionNumber-1, value)
      // store.dispatch("newPeerReview", updatedPeerReviewQuestionRating);
    }

    return {
      onClickChild,
    };
  },
});
</script>

<style lang="scss" scoped>
tr {
  width: 100%;
}

.question-card {
  @include shadow;
  position: relative;
  border-radius: $app-border-radius;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
}
</style>
