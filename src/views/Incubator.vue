<template>
  <div class="frame">
    <h2>The Incubator</h2>
    <Loader v-if="isLoading" />
    <div class="workspace-body" v-else>
      <div class="empty-state" v-if="isEmpty">
        <img class="empty-image" src="@/assets/not-found-icon.svg" />
        <p>Seems like you don't have any workspace now</p>
        <p>Create One !</p>
      </div>

      <div class="workspace-list" v-if="!isEmpty && showList">
        <div
          v-for="(data, index) in workspace"
          class="workspace-card"
          :key="index"
        >
          {{ data.name }}
        </div>
      </div>

      <div class="student-join" v-if="showStudentJoin">
        <InputField
          :id="'workspace-code'"
          :label="'Workspace Code'"
          :type="'text'"
        />
        <Button class="button" :text="'Join'" />
      </div>

      <div class="settings-page" v-if="showSettingsPage">
        <InputField
          v-for="(field, index) in lecturerSettings"
          class="input"
          :key="index"
          :id="`${index} ${field.title}`"
          :label="field.title"
          :type="field.type"
        />
        <Button
          class="button"
          style="margin: 10px"
          :text="'Create'"
          v-on:click="addWorkspace"
        />
      </div>

      <button class="floating-action-button" v-on:click="showAddWorkspace">
        <p v-if="showList">+</p>
        <p v-else><span class="material-icons"> arrow_back </span></p>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import Loader from "../common/Loader.vue";
import InputField from "../common/InputField.vue";
import Button from "../common/Button.vue";
import store from "../store";
// eslint-disable-next-line no-unused-vars
import { Incubator } from "../types/Incubator";
import { createWorkSpace, getAllWorkspace } from "../api/IncubatorApi";

export default {
  name: "Incubator",
  components: { Loader, InputField, Button },
  setup() {
    const isLoading = ref(true);
    const canCreateRooms = ref(true);
    const showList = ref(true);
    const isEmpty = ref(false);
    const showStudentJoin = ref(false);
    const showSettingsPage = ref(false);
    const workspace = ref<Incubator[]>([]);
    const lecturerSettings = ref([
      {
        title: "Workspace name",
        type: "text",
      },
      {
        title: "Max Members Per Team",
        type: "number",
      },
      {
        title: "Max Number Of Teams",
        type: "number",
      },
      {
        title: "Team Creation Deadline",
        type: "date",
      },
      {
        title: "Team Adjourning Date",
        type: "date",
      },
    ]);

    onMounted(() => {
      getWorkspace();
      setTimeout(() => {
        isLoading.value = false;
      }, 2000);
    });

    const getWorkspace = () => {
      getAllWorkspace(
        store.state.workspace,
        (data) => {
          const arrayData: Incubator[] = [];
          data.forEach((res: any) => {
            arrayData.push(res.data() as Incubator);
          });
          workspace.value = arrayData;
        },
        console.log
      );
    };

    const addWorkspace = () => {
      const incubator: Incubator = {
        code: "",
        name: "First Workshop",
        workspaceOwnerId: "",
        maxNumberOfTeams: 1,
        maxMemberPerTeam: 2,
        teamCreationDeadline: new Date(),
        teamAdjourningDate: new Date(),
        peerReviewDurationInDays: 2,
        workspaceMembers: [],
        tutorialSlots: [],
        groups: [],
        tags: [],
      };
      createWorkSpace(incubator, console.log, console.log);
    };

    const showAddWorkspace = () => {
      canCreateRooms.value
        ? (showSettingsPage.value = !showSettingsPage.value)
        : (showStudentJoin.value = !showStudentJoin.value);
      showList.value = !showList.value;
    };

    return {
      isLoading,
      lecturerSettings,
      canCreateRooms,
      workspace,
      addWorkspace,
      showAddWorkspace,
      showSettingsPage,
      showStudentJoin,
      showList,
      isEmpty,
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
  .student-join {
    margin: 50px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .button {
      margin-top: 10px;
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
    position: absolute;
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