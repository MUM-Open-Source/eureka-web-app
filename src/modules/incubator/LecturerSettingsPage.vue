<template>
  <div class="lecturer-settings">
    <label for="name">Workspace Name</label>
    <div
      v-for="error of v$.name.$errors.concat(v$.name.$silentErrors)"
      :key="error.$uid"
    >
      <div class="error-msg">{{ error.$message }}</div>
    </div>
    <input
      id="name"
      type="text"
      placeholder="Workspace Name"
      v-model="state.name"
    />

    <label for="max_member">Max Member Per Team</label>
    <div
      v-for="error of v$.maxMemberPerTeam.$errors.concat(
        v$.maxMemberPerTeam.$silentErrors
      )"
      :key="error.$uid"
    >
      <div class="error-msg">{{ error.$message }}</div>
    </div>
    <input
      id="max_member"
      type="number"
      placeholder="Max Member Per Team"
      v-model="state.maxMemberPerTeam"
      min="1"
    />

    <label for="max_number_of_teams">Max Number Of Teams</label>
    <div
      v-for="error of v$.maxNumberOfTeams.$errors.concat(
        v$.maxNumberOfTeams.$silentErrors
      )"
      :key="error.$uid"
    >
      <div class="error-msg">{{ error.$message }}</div>
    </div>
    <input
      id="max_number_of_teams"
      type="number"
      placeholder="Max Member Per Team"
      v-model="state.maxNumberOfTeams"
      min="1"
    />

    <label for="team_creation_deadline">Team Creation Deadline</label>
    <div
      v-for="error of v$.teamCreationDeadline.$errors.concat(
        v$.teamCreationDeadline.$silentErrors
      )"
      :key="error.$uid"
    >
      <div class="error-msg">{{ error.$message }}</div>
    </div>
    <input
      id="team_creation_deadline"
      type="date"
      placeholder="Team Creation Deadline"
      v-model="state.teamCreationDeadline"
    />

    <label for="team_adjourning_date">Team Adjourning Date</label>
    <div
      v-for="error of v$.teamAdjourningDate.$errors.concat(
        v$.teamAdjourningDate.$silentErrors
      )"
      :key="error.$uid"
    >
      <div class="error-msg">{{ error.$message }}</div>
    </div>
    <input
      id="team_adjourning_date"
      type="date"
      placeholder="Team Adjourning Date"
      v-model="state.teamAdjourningDate"
    />

    <label for="peer_review_day_duration">Peer Review Day Duration</label>
    <div
      v-for="error of v$.peerReviewDurationInDays.$errors.concat(
        v$.peerReviewDurationInDays.$silentErrors
      )"
      :key="error.$uid"
    >
      <div class="error-msg">{{ error.$message }}</div>
    </div>
    <input
      id="peer_review_day_duration"
      type="number"
      placeholder="Peer Review Day Duration"
      min="1"
      v-model="state.peerReviewDurationInDays"
    />

    <div style="margin-bottom: 10px">
      <label for="tags" style="margin-bottom: 4px">Tags</label>
      <TagInput id="tags" placeholder="Enter A tag" />
    </div>

    <div style="margin-bottom: 10px">
      <label for="tutorial-slots" style="margin-bottom: 4px"
        >Tutorial Slots</label
      >
      <TagInput id="tutorial-slots" placeholder="Tutorial Slots" />
    </div>

    <Button :text="'Create Workspace'" v-on:click="submitSettings($event)" />
  </div>
</template>

<script lang='ts'>
import TagInput from "../../common/TagInput.vue";
import { reactive } from "vue-demi";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Button from "../../common/Button.vue";
import { createWorkSpace } from "@/api/IncubatorApi";
import Swal from "sweetalert2";
export default {
  components: { TagInput, Button },
  name: "LecturerSettingsPage",
  setup() {
    const state = reactive({
      name: "",
      maxMemberPerTeam: null,
      maxNumberOfTeams: null,
      teamCreationDeadline: null,
      teamAdjourningDate: null,
      peerReviewDurationInDays: null,
      tags: [],
      tutorialSlots: [],
    });
    const rules = {
      name: { required },
      maxMemberPerTeam: { required },
      maxNumberOfTeams: { required },
      teamCreationDeadline: { required },
      teamAdjourningDate: { required },
      peerReviewDurationInDays: { required },
    };
    const v$ = useVuelidate(rules as any, state);

    const submitSettings = () => {
      if (!v$.value.$invalid) {
        createWorkSpace({
          workshopSettings: {
            name: state.name,
            maxNumberOfTeams: Number(state.maxNumberOfTeams) || 0,
            maxMemberPerTeam: Number(state.maxMemberPerTeam) || 0,
            teamCreationDeadline: new Date(state.teamCreationDeadline || ""),
            teamAdjourningDate: new Date(state.teamAdjourningDate || ""),
            peerReviewDurationInDays:
              Number(state.peerReviewDurationInDays) || 0,
            tutorialSlots: [],
            tags: [],
          },
          onSuccess: () => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Workshop Created",
              showConfirmButton: false,
              timer: 2000,
            });
          },
        });
      }
    };
    return { v$, state, submitSettings };
  },
};
</script>

<style lang='scss' scoped>
.lecturer-settings {
  display: flex;
  margin: auto;
  width: 40%;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;

  label {
    padding-left: 4px;
    margin-bottom: 4px;
  }

  input {
    margin-bottom: 10px;
    width: $tag-input-width;
    border: $tag-input-border-radius solid $color-bg-hover;
    height: $tag-input-height;
    box-sizing: border-box;
    padding: $tag-input-padding;
  }

  @media (max-width: 428px) {
    width: 100%;
    margin-left: auto;
  }
  .error-msg {
    color: red;
    padding-left: 5px;
  }
}
</style>