<template>
    <button>{{ text }}</button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
button,
input[type='file']::-webkit-file-upload-button {
    @include gradientAnimation($color-brand, $color-brand-alt);
    @include shadow;
    font-family: inherit;
    display: block;
    padding: $btn-padding;
    color: $color-white;
    text-transform: uppercase;
    border: none;
    border-radius: $btn-border-radius;
    z-index: 0;
    &:focus {
        outline: 0;
    }
    &:hover {
        cursor: pointer;
    }
}
</style>
