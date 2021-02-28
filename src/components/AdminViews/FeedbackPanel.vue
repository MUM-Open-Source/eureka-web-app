<template>
  <div className="outer-div">
    <FeedbackListTile
      :event="event"
      :v-for="(event, index) in filteredEvents"
      :key="index"
    />
  </div>
</template>

<script>
import FeedbackListTile from "../../components/AdminPanelComponent/FeedbackListTile.vue";
export default {
  components: { FeedbackListTile },
  name: "FeedbackPanel",
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