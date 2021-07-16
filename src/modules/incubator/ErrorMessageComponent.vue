<template>
  <div v-for="error of state.errors" :key="error.$uid">
    <div class="error-msg">{{ error.$message }}</div>
  </div>
</template>


<script lang="ts">
import { reactive } from "vue-demi";
export default {
  name: "ErrorMessageComponent",
  props: {
    silentError: Array,
    error: Array,
  },
  setup(props: any) {
    const state = reactive({
      erros: props.error.concat(props.silentError),
    });
    return {
      state,
    };
  },
};
</script>

<style  lang="scss" scoped>
.error-msg {
  color: red;
  padding-left: 5px;
}
</style>
