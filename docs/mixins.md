# Mixins

Eureka has used the `@mixin` directive to create reusable CSS code. To take advantage of these mixins, you will need to use the `@include` directive.

::: tip FILE LOCATION
The classes specified here exist at `/src/common/styles/_mixins.scss`.
:::

## Shadow

You can give an element a box shadow.

Shadow

<div class="shadow-example"></div>

Small Shadow

<div class="shadow-small-example"></div>

### Usage

```scss
@include shadow;
@include shadow--small;
```

### Example

```scss
div {
    @include shadow;
    width: 150px;
    height: 90px;
}
```

## Gradient Animation

You can give an element a gradient background that will animate upon hover.

<div class="gradient-example"></div>

### Usage

```scss
@include gradientAnimation($start, $end, $non-white: false);
```

### Example

```scss
div {
    @include gradientAnimation($color-brand, $color-brand-alt, true);
    width: 150px;
    height: 90px;
}
```

<style lang="scss" scoped>
@import "../src/common/styles/_mixins.scss";
@import "../src/common/styles/_variables.scss";

.gradient-example {
    @include gradientAnimation($color-brand, $color-brand-alt);
    width: 150px;
    height: 90px;
    margin-top: 10px;
}
.shadow-example {
    @include shadow;
    width: 150px;
    height: 90px;
}
.shadow-small-example {
    @include shadow--small;
    width: 150px;
    height: 90px;
}
</style>
