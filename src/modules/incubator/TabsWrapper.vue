<template>
  <div class="tabs">
      <ul class="tabs__header">
            <li 
                v-for="title in tabTitles" 
                :key="title"
                :class="{ selected: title == selectedTitle}"
                @click="selectedTitle=title"
            >
                {{title}}
            </li>
      </ul>
      <slot />
  </div>
</template>

<script>
import { ref, provide } from 'vue';
export default {
    setup(_, { slots }) {
        // array of all nodes inside Tab component slot
        const tabTitles = ref(slots.default().map((tab) => tab.props.title))
        const selectedTitle = ref(tabTitles.value[0])

        provide("selectedTitle", selectedTitle)

        return {
            tabTitles,
            selectedTitle
        }
    }
}
</script>

<style lang='scss' scoped>
.tabs {
    width: 100%;
    margin: 0 auto;
    &__header {
        margin-bottom: 10px;
        list-style: none;
        padding: 0;
        display: flex;
        li {
            width: 80px;
            text-align: center;
            padding: 10px 20px;
            // margin-right: 10px;
            // background-color: #ddd;
            // border-radius: 5px;
            border-bottom: solid 2px white;
            cursor: pointer;
            transition: 0.5s all;
            &:hover {
                background-color: rgb(240, 240, 240);
            }
            &.selected {
                border-bottom: solid 2px $color-brand;
                // background-color: #0984e3;
                color: $color-brand;
                font-weight: $semibold;
            }
        }
    }
}
</style>
