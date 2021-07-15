<template>
    <div class="message">
        <span v-if="!sender">{{ name }}</span>
        <div class ="text w-3/4"> :class="">
        <slot />
        </div>
    </div>
</template>

<script lang= 'ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
      name : {
          type: String,
          default: ''
      },
      sender: {
          type: Boolean,
          default: false
      }

  }
})
</script>