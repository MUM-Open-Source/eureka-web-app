<template>
    <div class="form__group field">
        <input :type="type" class="form__field" 
        :class="(disabled)?'form__field--disabled':''" 
        :value="value" 
        :placeholder="placeholder?placeholder:label" 
        :id="id" 
        :disabled="disabled" required 
        :min="min"
        :max="max"/>
        <label :for="id" class="form__label">{{ label }}</label>
    </div>
</template>

<script>
export default {
    name: 'ProfileInputField',
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
        },
        min:{
            type:String,
        },
        max:{
            type:String,
        }
    }

}
</script>

<style lang='scss' scoped>
@import '@/styles/components/form';
.form {
    &__field{
        width:150%;
    }
    &__label{
        font-size: 107%;
        font-family: inherit;
        font-weight: bold;
        color: #2858b8;
    }
}

</style>