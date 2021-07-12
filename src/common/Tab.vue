<template>
    <div class="tab-content pad--3" v-show="title == selectedTitle">
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
    @include shadow--subtle;
    // max-height: $tab-content-min-height;
    border-radius: $app-border-radius-sm;
}
</style>