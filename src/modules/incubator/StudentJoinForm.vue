<template>
  <div class="form">
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

    <Button class="submit-button" text="Join" @click="joinWorkspace" />
  </div>
</template>

<script lang='ts'>
import Button from "@/common/Button.vue";
import { reactive } from "vue-demi";
import { useVuelidate } from "@vuelidate/core";
import { maxLength, minLength, required } from "@vuelidate/validators";
import router from "@/router";

export default {
  name: "StudentJoinForm",
  components: { Button },
  setup() {
    const state = reactive({
      workspace: "",
    });
    const rules = {
      workspace: { required, minLength: minLength(4), maxLength: maxLength(4) },
    };
    const v$ = useVuelidate(rules, state);

    const joinWorkspace = () => {
      if (!v$.value.$invalid)
        router.push({ path: `/incubator/${state.workspace}` });
    };
    return { v$, state, joinWorkspace };
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