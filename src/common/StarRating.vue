<template>
    <div class="stars__container">
        <fa
            v-for="index in maxRating"
            :key="index"
            icon="star"
            size="2x"
            class="star__icon"
            :class="
                (hoverRating || currentRating) >= index
                    ? 'star__color--brand'
                    : 'star__color--grey'
            "
            @click="() => handleClick(index)"
            @mouseover="() => handleMouseOver(index)"
            @mouseleave="() => handleMouseLeave(index)"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
    name: 'StarRating',
    props: {
        maxRating: {
            type: Number,
            default: 5, // default limit is 5 stars
        },
    },
    emits: ['update-rating'],
    setup(_, { emit }) {
        let currentRating = ref(0);
        let hoverRating = ref(0);

        const handleClick = (value: number) => {
            currentRating.value = value;
            emit('update-rating', value);
        };
        const handleMouseOver = (value: number) => (hoverRating.value = value);
        const handleMouseLeave = () => (hoverRating.value = 0);

        return {
            currentRating,
            hoverRating,
            handleClick,
            handleMouseOver,
            handleMouseLeave,
        };
    },
});
</script>

<style lang="scss" scoped>
.stars__container {
    display: flex;
    justify-content: center;
    .star__icon {
        transition: all 0s;
        padding: $star-rating-icon-padding;
        transition: $transition-duration-fast;
        &:hover {
            transform: scale(1.1);
        }
    }
    .star__color {
        &--brand {
            color: $color-brand;
        }
        &--grey {
            color: $color-light;
        }
    }
}
</style>
