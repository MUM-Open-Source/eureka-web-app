<template>
  <div className="outer-div">
    <FeedbackListTile
      v-for="feedback in feedbacks"
      :key="feedback.key"
      :feedback="feedback"
    />
  </div>
</template>

<script>
import FeedbackListTile from "../../components/AdminPanelComponent/FeedbackListTile.vue";
import store from "@/store";
import { onMounted, ref } from "vue";
export default {
  components: { FeedbackListTile },
  name: "FeedbackPanel",
  setup() {
    onMounted(() => {
      if (!store.state.feedbacks || store.state.feedbacks.length ===0) {
        store.dispatch("getFeedbacks");
      }
    });
    const feedbacks = ref(store.state.feedbacks);
    return {
      feedbacks,
    };
  },
};
</script>

<style lang='css' scoped>
.outer-div {
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>