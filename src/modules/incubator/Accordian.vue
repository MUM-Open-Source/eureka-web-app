<template>
    <div class="accordian">
        <div class="accordian__header" @click="toggleAccordian">
            <div class="accordian__header--details">
                <div>Hello World</div>
                <div>2/5 members</div>
                <div>We need an angular developer</div>
                <Button text="Join" />
            </div>
                <fa 
                    icon="chevron-down"
                    size="lg"
                    :class="isOpen ? '' : 'face-side'"
                />
        </div>
        <div 
            class="accordian__body"
            :class="isOpen ? '' : 'closed'"
        >
            <UserCard />
            <UserCard />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UserCard from '@/modules/incubator/UserCard.vue';
import Button from '@/common/Button.vue';

export default defineComponent({
    name: "Accordian",
    components: { UserCard, Button },
    setup() {
        const isOpen = ref(false);
        const toggleAccordian = () => isOpen.value = !isOpen.value;

        return {
            isOpen,
            toggleAccordian
        }
    }
})
</script>

<style lang="scss" scoped>
.accordian {
    &__header {
        background-color: burlywood;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
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
        border: solid 1px black;
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