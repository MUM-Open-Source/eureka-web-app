<template>
    <div>
        <UserCard class="mar__b--2" v-for="i in [1, 2, 3, 4, 5]" :key="i" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserCard from '@/modules/incubator/UserCard.vue';

export default defineComponent({
    name: 'IncubatorPeers',
    components: { UserCard },
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped></style>
