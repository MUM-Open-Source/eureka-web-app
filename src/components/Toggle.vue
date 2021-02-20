<template>
    <div class="form__group--toggle">
        <label :for="id">{{ label }}</label>
        <input :id="id" type="checkbox" class="toggle">
    </div>
</template>

<script>
export default {
    name: 'Toggle',
    props: {
        id: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang='scss' scoped>
@import '@/styles/components/toggle';
</style>