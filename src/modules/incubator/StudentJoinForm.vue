<template>
  <div class="form" v-if="!state.showJoinWorkspaceForm">
    <input
      v-model="state.workspace"
      class="text-input"
      placeholder="Workspace Code"
    />
    <div
      v-for="error of v$.workspace.$errors.concat(v$.workspace.$silentErrors)"
      :key="error.$uid"
    >
      <div class="error-msg">{{ error.$message }}</div>
    </div>
    <Button class="submit-button" text="Join" @click="setShowJoinWorkspace" />
  </div>
  <StudentJoinWorkshopForm :workspaceData="state.workspaceData" v-else />
</template>

<script lang='ts'>
import Button from "@/common/Button.vue";
import { reactive } from "vue-demi";
import { useVuelidate } from "@vuelidate/core";
import { maxLength, minLength, required } from "@vuelidate/validators";
import StudentJoinWorkshopForm from "./StudentJoinWorkshopForm.vue";
import { getWorkspace } from "@/api/IncubatorApi";
import Swal from "sweetalert2";

export default {
  name: "StudentJoinForm",
  components: { Button, StudentJoinWorkshopForm },
  setup() {
    const state = reactive({
      workspace: "",
      showJoinWorkspaceForm: false,
      workspaceData: null,
    });
    const rules = {
      workspace: { required, minLength: minLength(6), maxLength: maxLength(6) },
    };
    const v$ = useVuelidate(rules, state);

    const setShowJoinWorkspace = () => {
      if (!v$.value.$invalid) {
        getWorkspace(
          state.workspace,
          (data) => {
            if (data.exists) {
              state.showJoinWorkspaceForm = !state.showJoinWorkspaceForm;
              state.workspaceData = data.data();
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "No workshop Found !",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          },
          () => {}
        );
      }
    };

    return { v$, state, setShowJoinWorkspace };
  },
};
</script>

<style lang='scss' scoped>
.form {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .submit-button {
    margin: 1rem;
  }

  .text-input {
    padding: 8px;
  }

  .error-msg {
    color: red;
  }
}
</style>