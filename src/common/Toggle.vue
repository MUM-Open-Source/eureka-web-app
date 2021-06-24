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
.form__group--toggle {
    display: flex;
    flex-direction: column;
}
input[type=checkbox] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
}
input[type=checkbox]:focus {
    outline: 0;
}

.toggle {
    height: $toggle-height;
    width: $toggle-width;
    border-radius: $app-border-radius;
    display: inline-block;
    position: relative;
    margin: 0;
    margin-top: $toggle-margin-top;
    border: 2px solid $color-dark;
    transition: all $transition-duration-fast ease;
}
.toggle:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: $toggle-cicle-dimension;
    height: $toggle-cicle-dimension;
    border-radius: $toggle-cicle-border-radius;
    background: $color-dark;
    transition: all $transition-duration-fast cubic-bezier(0.5, 0.1, 0.75, 1.35);
}
.toggle:checked {
    border-color: $color-brand-alt;
    &:after {
        transform: translatex(20px);
        background: $color-brand;
    }
}
</style>