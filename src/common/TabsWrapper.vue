<template>
  <div class="tabs">
      <ul class="tabs__header mar__b--1 pad--0">
            <li 
                v-for="title in tabTitles" 
                :key="title"
                :class="{ selected: title == selectedTitle}"
                class='cursor__pointer'
                @click="selectedTitle=title"
            >
                {{title}}
            </li>
      </ul>
      <div id="tabs__content" class="tabs__content">
        <slot />
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue';
export default defineComponent({
    setup(_, { slots }) {
        // array of all nodes inside Tab component slot
        const tabTitles = ref(slots.default!().map((tab) => tab.props!.title))
        const selectedTitle = ref(tabTitles.value[0])

        // to provide title to children slots
        provide("selectedTitle", selectedTitle)

        return {
            tabTitles,
            selectedTitle
        }
    }
})
</script>

<style lang="scss" scoped>
.tabs {
    width: $tab-wrapper-width;
    margin: $tab-wrapper-margin;
    &__header {
        list-style: none;
        display: flex;
        li {
            min-width: $tab-title-min-width;
            text-align: center;
            padding: $tab-title-padding;
            border-bottom: solid 2px $color-white;
            transition: $transition-duration all;
            &:hover {
                background-color: $color-side-nav-bg;
            }
            &.selected {
                border-bottom: solid 2px $color-brand;
                color: $color-brand;
                font-weight: $semibold;
            }
        }
    }
    &__content {
    }
}
</style>
