<template>
    <div class="tab-content" v-show="title == selectedTitle">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
    props: ['title'],
    setup() {
        // receive title from TabsWrapper
        const selectedTitle = inject("selectedTitle")

        return {
            selectedTitle
        }
    }
})
</script>

<style lang='scss' scoped>
.tab-content {
    min-height: 400px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 3px 5px 5px rgba(0,0,0,0.05);
}
</style>