<template>
  <div class="frame">
    <h2>The Incubator</h2>
    <Loader v-if="state.isLoading" />
    <div class="workspace-body" v-else>
      <div v-if="state.showList">
        <div class="empty-state" v-if="state.isEmpty">
          <img class="empty-image" src="@/assets/not-found-icon.svg" />
          <p>Seems like you don't have any workspace now</p>
          <p>Create One !</p>
        </div>

        <div class="workspace-list" v-if="!state.isEmpty">
          <div
            v-for="(data, index) in state.workspace"
            class="workspace-card"
            :key="index"
          >
            {{ data.name }}
          </div>
        </div>
      </div>

      <StudentJoinForm v-if="state.showStudentJoin" />
      <LecturerSettingsPage v-if="state.showSettingsPage" />

      <button class="floating-action-button" v-on:click="showAddWorkspace">
        <p v-if="state.showList">+</p>
        <p v-else><span class="material-icons"> arrow_back </span></p>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive } from "vue";
import Loader from "../common/Loader.vue";
import store from "../store";
// eslint-disable-next-line no-unused-vars
import { Incubator } from "../types/Incubator";
import { getAllStudentWorkspace } from "@/api/IncubatorApi";
import StudentJoinForm from "@/modules/incubator/StudentJoinForm.vue";
import LecturerSettingsPage from "@/modules/incubator/LecturerSettingsPage.vue";

export default {
  name: "Incubator",
  components: { Loader, StudentJoinForm, LecturerSettingsPage },
  setup() {
    const state = reactive<{
      isLoading: Boolean;
      canCreateRooms: Boolean;
      showList: Boolean;
      isEmpty: Boolean;
      showStudentJoin: Boolean;
      showSettingsPage: Boolean;
      workspace: Incubator[];
    }>({
      isLoading: true,
      canCreateRooms: false,
      showList: true,
      isEmpty: false,
      showStudentJoin: false,
      showSettingsPage: false,
      workspace: [],
    });

    onMounted(() => {
      getWorkspace();
    });

    const getWorkspace = () => {
      getAllStudentWorkspace(
        store.state.user?.uid || "",
        (data) => {
          state.workspace = data;
          state.isEmpty = state.workspace.length === 0;
          state.isLoading = false;
        },
        console.log
      );
    };

    const showAddWorkspace = () => {
      state.canCreateRooms
        ? (state.showSettingsPage = !state.showSettingsPage)
        : (state.showStudentJoin = !state.showStudentJoin);
      state.showList = !state.showList;
    };

    return {
      state,
      showAddWorkspace,
    };
  },
};
</script>

<style lang="scss" scoped>
.frame {
  max-width: 60vw;
  margin: auto;
  display: flex;
  padding: 10px 15px;
  flex-direction: column;
  align-items: center;

  @media (min-width: 428px) {
    max-width: 100vw;
  }

  .empty-state {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 60px;
    display: flex;
    height: 100%;

    p {
      @media (min-width: 428px) {
        font-size: 14px;
      }
    }

    .empty-image {
      margin-bottom: 20px;
      height: 100px;
    }
  }

  .settings-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .input {
      width: 20rem;
      margin-top: 1rem;
    }
  }
  .floating-action-button {
    @include shadow;
    margin: 50px;
    position: fixed;
    right: 0;
    bottom: 0;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: none;
    color: white;
    background-color: $color-brand;
    user-select: none;
    cursor: pointer;
    p {
      font-size: xx-large;
      margin: auto;
    }
  }
  .floating-action-button:hover {
    transform: scale(1.1);
    filter: brightness(1.1);
  }
  .floating-action-button:active {
    filter: brightness(1);
    transform: scale(1);
  }
}

.workspace-body {
  margin-top: 1rem;
  width: 100%;
}

.workspace-card {
  @include shadow;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  width: calc(100% - 40px);
  cursor: pointer;
  user-select: none;
}
.workspace-card:hover {
  transform: scale(1.02);
}
.workspace-card:active {
  transform: scale(1);
}
</style>