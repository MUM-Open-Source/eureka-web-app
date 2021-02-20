<template>
    <div class="form__group field">
        <input :type="type" class="form__field" :class="(disabled)?'form__field--disabled':''" :value="value" :placeholder="placeholder?placeholder:label" :id="id" :disabled="disabled" required />
        <label :for="id" class="form__label">{{ label }}</label>
    </div>
</template>

<script>
export default {
    name: 'InputField',
    props: {
        label: {
            type: String,
            required: true
        },
        value: String,
        placeholder: String,
        type: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }

}
</script>

<style lang='scss' scoped>
@import '@/styles/components/form';
</style>