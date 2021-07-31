# Vue File Stucture in Eureka

## Practices

When creating a new Vue component or view, we need to keep in mind the following practices:

-   Use TypeScript
-   Use scoped scss styling
-   Use the **Composition API** instead of ~~Options API~~ whenever possible

## Code Snippet

You can use the following code snippet as a starting point.

::: tip
Props, emits and components are optional and should be removed where not applicable.
:::

```md
<template>
    <div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: '',
    props: {},
    emits: [],
    components: {},
    setup(props, { emit }) {
        return {}
    },
});
</script>

<style lang="scss" scoped>
</style>
```
