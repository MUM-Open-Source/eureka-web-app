<template>
  <div className="outer-div">
    <EventsListTile
      v-for="event in filteredEvents"
      :key="event.key"
      :event="event"
    />
  </div>
</template>

<script>
import EventsListTile from "../AdminPanelComponent/EventsListTile.vue";
import store from "@/store";
import { onMounted, ref } from "vue";
export default {
  components: { EventsListTile },
  name: "EventsPanel",
  setup() {
    onMounted(() => {
      if (!store.state.events.length) {
        store.dispatch("getEvents");
      }
    });

    const filteredEvents = ref(store.state.events);
    return {
      filteredEvents,
    };
  },
};
</script>

<style lang='css' scoped>
.outer-div {
  display: relative;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>