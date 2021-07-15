<template>
  <div class="form">
    <div class="section">
      <label for="tags">Tags</label>
      <Multiselect
        class="multiselect"
        v-model="state.selectedTags"
        mode="tags"
        placeholder="Tags"
        :options="state.tags"
        :createTag="true"
      />
      <div
        v-for="error of v$.selectedTags.$errors.concat(
          v$.selectedTags.$silentErrors
        )"
        :key="error.$uid"
      >
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <div class="section">
      <label for="tutorial-slot">Tutorial</label>
      <Multiselect
        class="multiselect"
        v-model="state.selectedTutorial"
        placeholder="Tutorial"
        :options="state.tutorial"
      />
      <div
        v-for="error of v$.selectedTutorial.$errors.concat(
          v$.selectedTutorial.$silentErrors
        )"
        :key="error.$uid"
      >
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <div class="section">
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
    </div>

    <Button class="submit-button" text="Join" @click="joinWorkspace" />
  </div>
</template>

<script lang='ts'>
import Button from "@/common/Button.vue";
import { reactive } from "vue-demi";
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import Multiselect from "@vueform/multiselect";
import { studentJoinWorkspace } from "@/api/IncubatorApi";
import router from "@/router";

export default {
  name: "StudentJoinForm",
  components: { Button, Multiselect },
  props: {
    workspaceData: Object,
  },
  setup(props: any) {
    const state = reactive({
      sellYourself: "",
      tags: props.workspaceData?.tags || [],
      tutorial: props.workspaceData?.tutorialSlots || [],
      selectedTags: [],
      selectedTutorial: null,
    });
    const rules = {
      selectedTutorial: {
        required,
      },
      selectedTags: {
        required,
      },
      sellYourself: {
        required,
        minLength: minLength(50),
      },
    };
    const v$ = useVuelidate(rules, state);

    const joinWorkspace = () => {
      if (!v$.value.$invalid) {
        studentJoinWorkspace({
          workspaceCode: props.workspaceData.code || "none",
          onSuccess: () => {
            router.push(`/incubator/${props.workspaceData.code}`);
          },
          sellYourself: state.sellYourself,
          tags: state.selectedTags.map((index: number) => state.tags[index]),
          tutorialSlots: state.tutorial[state.selectedTutorial || 0],
        });
      }
    };

    return { v$, state, joinWorkspace };
  },
};
</script>

<style lang='scss' scoped>
@import "@/common/styles/filter";
.form {
  display: flex;
  max-width: 40%;
  margin: auto;
  height: 100%;
  text-align: start;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  .section {
    width: 100%;
    margin-top: 1rem;
  }

  label {
    width: 100%;
    text-align: start;
    margin-bottom: 4px;
  }

  .submit-button {
    margin: 1rem;
  }

  .multiselect {
    width: 100%;
  }

  .sell-yourself {
    border: $tag-input-border-radius solid $color-bg-hover;
    box-sizing: border-box;
    text-align: justify;
    padding: 8px;
    width: 100%;
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