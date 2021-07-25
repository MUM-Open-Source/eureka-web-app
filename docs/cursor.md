# Cursor

All cursor variations used are mentioned here.

::: tip FILE LOCATION
The classes specified here exist at `/src/common/styles/_cursor.scss`.
:::

## Classes

-   `cursor__default`
-   `cursor__pointer` :point_up_2:

### Example

<div class="cursor__pointer example">Hover Over Me</div>

```md
<div class="body cursor__pointer">Hover Over Me</div>
```

<style lang="scss" scoped>
@import "../src/common/styles/_cursor.scss";
@import "../src/common/styles/_mixins.scss";
.example {
    @include shadow--small;
    padding: 10px;
    width: 200px;
    text-align: center;
    margin-top: 10px;
}
</style>
