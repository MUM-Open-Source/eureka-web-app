<template>
    <Accordian v-for="i in 5" :key="i" class="mar__b--1">
        <template #header>
            <div class="accordian__header--details">
                <div>Hello World</div>
                <div>2/5 members</div>
                <div>We need an angular developer</div>
                <Button text="Join" />
            </div>
        </template>
        <template #body>
            <div>
                <UserCard v-for="i in 2" :key="i" class="mar--1" />
            </div>
        </template>
    </Accordian>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Accordian from '@/modules/incubator/Accordian.vue';
import UserCard from '@/modules/incubator/UserCard.vue';
import Button from '@/common/Button.vue';

export default defineComponent({
    name: 'JoinIncubatorTeam',
    components: {
        Accordian,
        UserCard,
        Button,
    },
    setup() {
        // to keep track of the tab
        const tab = ref(0);

        const updateTab = (newTab: number) => (tab.value = newTab);

        return {
            tab,
            updateTab,
        };
    },
});
</script>

<style lang="scss" scoped>
.accordian {
    &__header {
        &--details {
            display: flex;
            align-items: center;
            div {
                margin-right: 40px;
            }
        }
    }
}
</style>
