<template>
    <div class="tagline error-msg pad--1 mar__b--1">
        {{ errors[0].$message }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ErrorMessageComponent',
    props: {
        errors: {
            type: Array as any,
            required: true,
            default() {
                return [{ $message: 'Invalid Input' }];
            },
        },
    },
});
</script>

<style lang="scss" scoped>
.error-msg {
    color: $color-error;
    background-color: $color-error-bg;
}
</style>
