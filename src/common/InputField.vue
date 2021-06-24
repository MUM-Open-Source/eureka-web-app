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
// Credits: https://codepen.io/lucasyem/pen/ZEEYKdj
.form__group {
    position: relative;
    padding: 15px 0 0;
}

.form__field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid $color-light;
    outline: 0;
    font-size: $body-font-size;
    color: $color-dark;
    padding: 7px 6px;
    background: transparent;
    transition: border-color $transition-duration-fast;

    &::placeholder {
        color: transparent;
    }

    &:placeholder-shown ~ .form__label {
        font-size: $body-font-size;
        cursor: text;
        top: 20px;
    }

    &--disabled {
        background: $color-disabled;        
    }
}

.form__label {
    position: absolute;
    top: -5px;
    display: block;
    transition: $transition-duration-fast;
    font-size: $tagline-font-size;
    color: $color-dark;
    padding-left: 6px;
}

.form__field:focus {
    ~ .form__label {
        position: absolute;
        top: -5px;
        display: block;
        transition: $transition-duration-fast;
        font-size: $tagline-font-size;
        color: $color-brand;
        font-weight:700;    
    }
    &::placeholder {
        color: $color-light;
        font-weight:500;
    }
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, $color-brand, $color-brand-alt);
    border-image-slice: 1;
}

/* reset input */
.form__field{
    &:required,&:invalid { box-shadow:none; }
}

</style>