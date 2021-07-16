<template>
  <tr>
    <div class="question-card pad--2 mar__b--2 mar__t--2">
      <div class="question-card__format">
        <span class="subheading">{{ question.id }}. </span>
        <span class="body">{{ question.value }}</span>
      </div>

      <br />
      
    </div>
  </tr>
</template>

<script>
// import StarRating from "vue-star-rating"
// import { computed } from 'vue';
// import store from '@/store';

export default {
  name: "QuestionCard",
  // components: { StarRating },
  components: {},
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  setup() {},
};
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