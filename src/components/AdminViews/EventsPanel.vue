<template>
  <div className="outer-div">
    <events-list-tile></events-list-tile>
    <events-list-tile></events-list-tile>
    <events-list-tile></events-list-tile>
  </div>
</template>

<script>
import EventsListTile from "../AdminPanelComponent/EventsListTile.vue";
export default {
  components: { EventsListTile },
  name: "EventsPanel",
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