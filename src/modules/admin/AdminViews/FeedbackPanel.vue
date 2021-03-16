<template>
  <div className="outer-div">
    <FeedbackListTile
      v-for="satuFeedback in feedback"
      :key="satuFeedback.key"
      :feedback="satuFeedback"
    />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import store from "@/store";
import FeedbackListTile from "@/modules/admin/AdminPanelComponent/FeedbackListTile.vue";
export default {
  components: { FeedbackListTile },
  name: "FeedbackPanel",
  setup() {
    onMounted(() => {
      if (!store.state.feedback || store.state.feedback.length ===0) {
        store.dispatch("getFeedback");
      }
    });
    const feedback = ref(store.state.feedback);
    return {
      feedback,
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