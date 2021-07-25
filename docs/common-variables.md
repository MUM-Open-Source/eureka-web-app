# Common Variables

Eureka has standardized certain stlyes through the use of scss variables. These variables are accessible by any file in the codebase within the `<style>` tags.

::: tip FILE LOCATION
The classes specified here exist at `/src/common/styles/_variables.scss`.
:::

## Colors

<div class="color-brand">$color-brand</div>
<div class="color-brand-alt">$color-brand-alt</div>
<div class="color-dark">$color-dark</div>
<div class="color-light">$color-light</div>
<div class="color-white">$color-white</div>
<div class="color-side-nav-bg">$color-side-nav-bg</div>
<div class="color-bg-hover">$color-bg-hover</div>
<div class="color-disabled">$color-disabled</div>

### Examples

```scss
.username {
    color: $color-brand;
}
.custom-menu {
    background-color: $color-dark;
}
```

## Transition Durations

While applying transitions, ensure to use one of the following durations:

-   `$transition-duration` which takes 0.5s
-   `$transition-duration-fast` which takes 0.2s

### Examples

```scss
.button {
    transition: all ease $transition-duration;
}
```

## Border Radius

There are 2 options of border radius available to use within Eureka:

-   `$app-border-radius` which is 18px
-   `$app-border-radius-sm` which is 9px

### Examples

```scss
.button {
    border-radius: $app-border-radius;
}
```

## Font Sizes & Weights

For all typography, the following is the standardization applied:

::: warning
You shouldn't be using this unless you're modifying something in the `_fonts.scss` file.
:::

```scss
// font size
$heading-font-size: 27px;
$subheading-font-size: 22px;
$tagline-font-size: 16px;
$side-nav-font-size: 14px;
$body-font-size: 18px;

// font weight
$thin: 200;
$normal: 400;
$semibold: 600;
$bold: 900;
```

<style lang="scss" scoped>
@import "../src/common/styles/_variables.scss";
.color {
    &-brand {
        color: $color-brand;
        &-alt {
            color: $color-brand-alt;
        }
    }
    &-dark {
        color: $color-dark;
    }
    &-light {
        color: $color-light;
    }
    &-white {
        color: $color-white;
        background-color: $color-dark;
    }
    &-side-nav-bg {
        color: $color-side-nav-bg;
        background-color: $color-dark;
    }
    &-bg-hover {
        color: $color-bg-hover;
        background-color: $color-dark;
    }
    &-disabled {
        color: $color-disabled;
        background-color: $color-dark;
    }
}
</style>
