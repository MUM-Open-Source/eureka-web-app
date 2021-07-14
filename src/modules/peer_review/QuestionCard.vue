<template>
  <tr>
    <div class="question-card pad--2 mar__b--2 mar__t--2">
      <span class="body">{{ question.id }}. {{ question.value }}</span>

      <br />
      <!-- https://github.com/craigh411/vue-star-rating -->
      <!-- <star-rating /> -->
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

// * {
//   margin: 0;
//   padding: 0;
// }
// .rate {
//   float: left;
//   height: 46px;
//   padding: 0 10px;
// }
// .rate:not(:checked) > input {
//   position: absolute;
//   top: -9999px;
// }
// .rate:not(:checked) > label {
//   float: right;
//   width: 1em;
//   overflow: hidden;
//   white-space: nowrap;
//   cursor: pointer;
//   font-size: 30px;
//   color: #ccc;
// }
// .rate:not(:checked) > label:before {
//   content: "★ ";
// }
// .rate > input:checked ~ label {
//   color: #ffc700;
// }
// .rate:not(:checked) > label:hover,
// .rate:not(:checked) > label:hover ~ label {
//   color: #deb217;
// }
// .rate > input:checked + label:hover,
// .rate > input:checked + label:hover ~ label,
// .rate > input:checked ~ label:hover,
// .rate > input:checked ~ label:hover ~ label,
// .rate > label:hover ~ input:checked ~ label {
//   color: #c59b08;
// }

/* Modified from: https://github.com/mukulkant/Star-rating-using-pure-css */
</style>
