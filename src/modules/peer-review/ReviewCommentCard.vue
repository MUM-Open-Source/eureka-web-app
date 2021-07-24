<template>
    <div class="review-comment-card pad--2 mar__b--2 mar__t--2">
        <header class="subheading">{{ questionNumber }}. {{ question }}</header>
        <div class="form__group field">
            <textarea
                class="body"
                wrap="soft"
                rows="5"
                required
                :placeholder="placeholder"
                :value="value"
                @input="$emit('update:value', $event.target.value)"
            />
            <label :for="id" class="form__label">{{ label }}</label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ReviewCommentCard',
    props: ['placeholder', 'value', 'question', 'questionNumber'],
};
</script>

<style lang="scss" scoped>
.review-comment-card {
    @include shadow;
    position: relative;
    border-radius: $app-border-radius;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
}

// Credits: https://codepen.io/lucasyem/pen/ZEEYKdj
textarea {
    resize: vertical;
    outline: none;
    border-color: $color-bg-hover;
    width: 100%;
    font-size: $body-font-size;
}

.form__group {
    position: relative;
    padding: 15px 0 0;
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
        font-weight: 700;
    }
    &::placeholder {
        color: $color-light;
        font-weight: 500;
    }
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, $color-brand, $color-brand-alt);
    border-image-slice: 1;
}

/* reset input */
.form__field {
    &:required,
    &:invalid {
        box-shadow: none;
    }
}
</style>
