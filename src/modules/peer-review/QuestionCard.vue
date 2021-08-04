<template>
    <div class="question-card pad--2 mar__b--2 mar__t--2">
        <div class="question-card__format mar__b--1">
            <span class="body">{{ question }}</span>
        </div>
        <StarRating @update-rating="onClickChild" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import StarRating from '@/common/StarRating.vue';

export default defineComponent({
    name: 'QuestionCard',
    components: { StarRating },
    props: ['questionNumber', 'question'],
    emits: ['question-rating'],
    setup(props, { emit }) {
        function onClickChild(value: number) {
            emit('question-rating', props.questionNumber - 1, value);
        }

        return {
            onClickChild,
        };
    },
});
</script>

<style lang="scss" scoped>
.question-card {
    @include shadow;
    position: relative;
    border-radius: $app-border-radius;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
}
</style>
