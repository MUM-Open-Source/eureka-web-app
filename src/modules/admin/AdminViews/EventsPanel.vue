<template>
  <div classs="outer-div">
    <div class="button-div">
      <i
        v-if="!showAddEvent"
        class="material-icons add-button"
        v-on:click="toggleAddEvent"
        >add</i
      >
      <i
        v-if="showAddEvent"
        class="material-icons add-button"
        v-on:click="toggleAddEvent"
        >clear</i
      >
    </div>
    <div v-if="showAddEvent" class="data">
      <h2>Add a New Event</h2>
      <h4>Photo</h4>
      <input type="text" v-model="image_url" />
      <h4>Name</h4>
      <input type="text" v-model="name" />
      <h4>Date</h4>
      <input type="text" v-model="dates" />
      <h4>Organizer</h4>
      <input type="text" v-model="organizer" />
      <h4>Type</h4>
      <input type="text" v-model="type" />
      <h4>Description</h4>
      <textarea type="text" v-model="description" />
      <Button text="Done" v-on:click="addEvent" />
    </div>

    <EventsListTile
      v-for="event in filteredEvents"
      :key="event.key"
      :event="event"
    />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import store from "@/store";
import Swal from "sweetalert2";
import EventsListTile from "@/modules/admin/AdminPanelComponent/EventsListTile.vue";
import Button from "@/common/Button.vue";
export default {
  components: { EventsListTile, Button },
  name: "EventsPanel",
  data() {
    return {
      showAddEvent: false,
      image_url: "",
      name: "",
      dates: "",
      organizer: "",
      type: "",
      description: "",
    };
  },
  methods: {
    toggleAddEvent() {
      this.showAddEvent = !this.showAddEvent;
    },
    addEvent() {
      console.log({
        image_url: this.image_url,
        name: this.name,
        dates: this.dates,
        organizer: this.organizer,
        type: this.type,
        description: this.description,
      });
      if (
        this.image_url.trim().length >= 5 &&
        this.name.trim().length >= 5 &&
        this.dates.trim().length >= 5 &&
        this.organizer.trim().length >= 5 &&
        this.type.trim().length >= 5 &&
        this.description.trim().length >= 5
      ) {
        store.dispatch("addEvents", {
          id: Date.now().toString(),
          image_url: this.image_url,
          name: this.name,
          dates: this.dates,
          organizer: this.organizer,
          type: this.type,
          description: this.description,
        });
        Swal.fire("Added!", "A new event has been added !", "success");
        this.image_url = "";
        this.name = "";
        this.dates = "";
        this.organizer = "";
        this.type = "";
        this.description = "";
        this.showAddEvent = false;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Empty Fields or Length is not more than 5 characters",
        });
      }
    },
  },
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

.button-div {
  position: absolute;
  top: 60px;
  right: 10px;
}

.add-button {
  width: fit-content;
  color: white;
  background-color: #4f7dd8;
  padding: 10px;
  margin: 10px;
  border-radius: 100%;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
  cursor: pointer;
}

.add-button:hover {
  filter: brightness(1.2);
}

h2 {
  padding-bottom: 20px;
}

input,
textarea {
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-top: 2px;
  margin-bottom: 10px;
  border: none;
  outline: none;
  padding: 15px;
}

img {
  border-radius: 10px;
  height: 100px;
  width: 100px;
  margin: 8px;
  object-fit: cover;
}

.data {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  transition: 1s;
}
</style>