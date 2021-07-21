<template>
    <div v-for="error of silentError.concat(error)" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'ErrorMessageComponent',
    props: {
        silentError: Object,
        error: Object,
    },
};
</script>

<style lang="scss" scoped>
.error-msg {
    color: red;
    padding-left: 5px;
}
</style>
