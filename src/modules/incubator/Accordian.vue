<template>
    <div class="accordian">
        <div class="accordian__header" @click="toggleAccordian">
            <slot name="header"></slot>
            <fa
                icon="chevron-down"
                size="lg"
                :class="isOpen ? '' : 'face-side'"
            />
        </div>
        <div class="accordian__body" :class="isOpen ? '' : 'closed'">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Accordian',
    setup() {
        const isOpen = ref(false);
        const toggleAccordian = () => (isOpen.value = !isOpen.value);

        return {
            isOpen,
            toggleAccordian,
        };
    },
});
</script>

<style lang="scss" scoped>
.accordian {
    &__header {
        @include shadow--small;
        // background-color: burlywood;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        border-radius: $app-border-radius;
        .face-side {
            transform: rotate(-90deg);
        }
        &--details {
            display: flex;
            align-items: center;
            div {
                margin-right: 40px;
            }
        }
    }
    &__body {
        // border: solid 0.2px black;
        max-height: 1000px;
        min-height: 100%;
        overflow: scroll;
        transition: 0.5s all;
    }
    .closed {
        max-height: 0;
    }
}
</style>
