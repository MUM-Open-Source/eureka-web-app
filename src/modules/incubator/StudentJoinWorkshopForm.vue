<template>
  <div class="form">
    <label for="sell-yourself">Sell Yourself</label>
    <textarea
      class="sell-yourself"
      id="sell-yourself"
      v-model="state.sellYourself"
      placeholder="Sell Yourself"
    ></textarea>
    <div
      v-for="error of v$.sellYourself.$errors.concat(
        v$.sellYourself.$silentErrors
      )"
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
import { minLength, required } from "@vuelidate/validators";

export default {
  name: "StudentJoinForm",
  components: { Button },
  setup() {
    const state = reactive({
      sellYourself: "",
    });
    const rules = {
      sellYourself: {
        required,
        minLength: minLength(50),
      },
    };
    const v$ = useVuelidate(rules, state);

    const joinWorkspace = () => {
      if (!v$.value.$invalid) {
        console.log(state.sellYourself);
      }
    };

    return { v$, state, joinWorkspace };
  },
};
</script>

<style lang='scss' scoped>
.form {
  display: flex;
  max-width: 40%;
  margin: auto;
  height: 100%;
  text-align: start;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  label {
    width: 100%;
    text-align: start;
    margin-bottom: 4px;
  }

  .submit-button {
    margin: 1rem;
  }

  .sell-yourself {
    text-align: justify;
    padding: 8px;
    width: calc(100% - 16px);
    height: 100px;
  }

  .error-msg {
    width: 100%;
    color: red;
  }

  @media (max-width: 428px) {
    width: 100%;
    max-width: 100%;
  }
}
</style>