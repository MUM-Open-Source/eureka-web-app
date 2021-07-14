<template>
  <div class="review-comment-card pad--2 mar__b--2 mar__t--2">
    <header>Short Summary</header>
    <div class="form__group field">
      <textarea
        wrap="soft"
        rows="5"
        class="form__field"
        :class="disabled ? 'form__field--disabled' : ''"
        :value="value"
        :placeholder="placeholder ? placeholder : label"
        :id="id"
        :disabled="disabled"
        @input="$emit('update:value', $event.target.value)"
        required
      />
      <label :for="id" class="form__label">{{ label }}</label>
    </div>
    <!-- <InputFieldWrapped
      label="Short Summary"
      type="text"
      id="reviewComment"
      class="mar__b--2"
    /> -->
  </div>
</template>

<script>
// import { computed } from 'vue';
// import store from '@/store';

export default {
  name: "ReviewCommentCard",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: String,
    id: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
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
  resize: none;
}

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
  padding: 7px 0px;
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
