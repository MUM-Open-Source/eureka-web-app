## Getting Started

### Git Workflow

There are certain practices that should be followed when contributing to Eureka's code base. These are discussed in detail here.

After following the [README](https://github.com/MUM-Open-Source/eureka-web-app#readme) instructions on GitHub, you're set to make your contribution.

#### Creating a Feature Branch

Make sure you're on the develop branch. To create your feature branch, run the following:

```bash
git pull
git checkout -b feature/your-feature
```

#### Add your contribution

Make the necessary contributions then commit all your changes and push your branch:

```bash
git add *
git commit -m "feat(navigation): descriptive commit message"
git push -u origin feature/your-feature
```

:::tip
You are encouraged to follow Vue's [Git Commit Message Convention](https://github.com/vuejs/vue-next/blob/master/.github/commit-convention.md) which makes it easier to understand the commit.
:::

#### Submitting a PR

You need to create a Pull Request for your feature branch by opening the repository on GitHub and creating a PR into Eureka's `develop` branch (it would be selected by default).

In the PR, make sure to elaborate on the changes you've made and include supporting material such as how to test the feature or photo attachments for visual elements. This will help facilitate a smoother and more efficient review process.

### Common Elements

It is important to be aware of some common elements that have been made available for use during development.

:::tip
Common elements can be found in the `/src/common/` directory.
:::

#### Common Components

The components available are:

-   Button
-   ~~InputField~~ (deprecated)
-   Loader
-   StarRating
-   TagInput
-   Toggle

#### Common Styles

The styles are discussed in the sections that follow.

### Vue File Stucture in Eureka

In the interest of standardization and quick setup, a recommended file structure has been discussed here.

#### Practices

When creating a new Vue component or view, we need to keep in mind the following practices:

-   Use TypeScript
-   Use scoped scss styling
-   Use the **Composition API** instead of ~~Options API~~ whenever possible
-   Use the class `page-pad` in the root `div` for every new view (page)

#### Code Snippet

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

## Common Variables

Eureka has standardized certain stlyes through the use of scss variables. These variables are accessible by any file in the codebase within the `<style>` tags.

::: tip FILE LOCATION
The classes specified here exist at `/src/common/styles/_variables.scss`.
:::

### Colors

<div class="color-brand">$color-brand</div>
<div class="color-brand-alt">$color-brand-alt</div>
<div class="color-dark">$color-dark</div>
<div class="color-light">$color-light</div>
<div class="color-white">$color-white</div>
<div class="color-side-nav-bg">$color-side-nav-bg</div>
<div class="color-bg-hover">$color-bg-hover</div>
<div class="color-disabled">$color-disabled</div>

#### Examples

```scss
.username {
    color: $color-brand;
}
.custom-menu {
    background-color: $color-dark;
}
```

### Transition Durations

While applying transitions, ensure to use one of the following durations:

-   `$transition-duration` which takes 0.5s
-   `$transition-duration-fast` which takes 0.2s

#### Examples

```scss
.button {
    transition: all ease $transition-duration;
}
```

### Border Radius

There are 2 options of border radius available to use within Eureka:

-   `$app-border-radius` which is 18px
-   `$app-border-radius-sm` which is 9px

#### Examples

```scss
.button {
    border-radius: $app-border-radius;
}
```

### Font Sizes & Weights

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

## Typography

Eureka sets some basic global typography styles. Whether you're creating a heading or simply a paragraph, make sure you use the css classes covered here before using custom styles.

::: tip FILE LOCATION
The classes specified here exist at `/src/common/styles/_font.scss`.
:::

### Sizes

| Class         | Example                                         |
| ------------- | ----------------------------------------------- |
| heading       | <div class="heading">The Guinea Pig</div>       |
| subheading    | <div class="subheading">The Guinea Pig</div>    |
| body          | <div class="body">The Guinea Pig</div>          |
| tagline       | <div class="tagline">The Guinea Pig</div>       |
| tagline--bold | <div class="tagline--bold">The Guinea Pig</div> |

#### Examples

```md
<div class="heading">The Guinea Pig</div>
<div class="subheading">The Guinea Pig</div>
<div class="body">The Guinea Pig</div>
<div class="tagline">The Guinea Pig</div>
<div class="tagline--bold">The Guinea Pig</div>
```

### Colours

| Class           | Example                                      |
| --------------- | -------------------------------------------- |
| text--white     | <div class="text--white inline">White</div>  |
| text--primary   | <div class="text--primary">Primary</div>     |
| text--secondary | <div class="text--secondary">Secondary</div> |
| text--accent    | <div class="text--accent">Accent</div>       |

#### Examples

```md
<div class="body text--white">White</div>
<div class="body text--primary">Primary</div>
<div class="body text--secondary">Secondary</div>
<div class="body text--accent">Accent</div>
```

### Alignment

| Class         | Example                                           |
| ------------- | ------------------------------------------------- |
| text--center  | <div class="text--center">Centered Text</div>     |
| text--left    | <div class="text--left">Left-Aligned Text</div>   |
| text--right   | <div class="text--right">Right-Aligned Text</div> |
| text--justify | <div class="text--justify">Jusitified Text</div>  |

#### Examples

```md
<div class="body text--center">Centered Text</div>
<div class="body text--left">Left-Aligned Text</div>
<div class="body text--right">Right-Aligned Text</div>
<div class="body text--justify">Jusitified Text</div>
```

### Special Text

| Class         | Example                                         |
| ------------- | ----------------------------------------------- |
| text--capsule | <div class="text--capsule inline">Capsule</div> |

#### Examples

```md
<div class="text--capsule">Capsule</div>
```

<style lang="scss" scoped>
@import "../src/common/styles/_font.scss";
.text--white {
    background-color: black;
}
.inline {
    display: inline;
}
</style>

## Spacing

It is important that elements are properly spaced out to ensure a clean UI. You should be able to add the necessary spacing for any element based on the classes described here.

::: tip FILE LOCATION
The classes specified here exist at `/src/common/styles/_spacing.scss`.
:::

### Page Padding

Every page or "view" in Eureka is wrapped in the `page-pad` class. This should be a standard practice when creating new pages.

::: tip
Use the `page-pad` class for every new page.
:::

#### Example

```md
<template>
    <div class="page-pad"> // wrap your page content in this div 
        <div class="your-content">The Guinea Pig</div>
    </div>
</template>
```

### Margins & Padding

The **property** applies the type of spacing:

-   `mar` - applies `margin`
-   `pad` - applies `padding`

The _optional_ **direction** designates the side the property applies to:

-   `__t` - applies the spacing for `margin-top` and `padding-top`
-   `__b` - applies the spacing for `padding-bottom` and `padding-bottom`
-   `__l` - applies the spacing for `margin-left` and `padding-left`
-   `__r` - applies the spacing for `padding-right` and `padding-right`

The _optional_ **multiplier** controls the increment of the property by 10px:

-   `--auto` - automatically sets the `margin` or `padding`
-   `--0` - sets `margin` or `padding` to 0px
-   `--1` - sets `margin` or `padding` to 10px
-   `--2` - sets `margin` or `padding` to 20px
-   `--3` - sets `margin` or `padding` to 30px
-   `--4` - sets `margin` or `padding` to 40px
-   `--5` - sets `margin` or `padding` to 50px

::: tip
If you don't specify a multipler, a small spacing of 5px will be the default value.
:::

#### Examples

```md
<div class="mar"></div>
<div class="mar--auto"></div>
<div class="mar--0"></div>
<div class="mar__t--1"></div>
<div class="pad--2"></div>
<div class="pad__b--3"></div>
<div class="pad__r"></div>
```

#### BONUS: Horizontal Centering Example

:bulb: You can horizontally center an element by giving it a fixed-width and the `mar--auto` class.

<div class="spacing-example pad--1">
    <div class="spacing-inner mar--auto" style="width: 200px;">Centered Element</div>
</div>

```md
<div class="mar--auto" style="width: 200px;">
    Centered Element
</div>
```

<style lang="scss" scoped>
@import "../src/common/styles/_font.scss";
@import "../src/common/styles/_spacing.scss";
.spacing-example {
    background-color: #C5E1A5;
    border: 1px solid #C5E1A5;
}
.spacing-inner {
    background-color: #FFF;
}
</style>

## Icons

There are 2 methods for creating icons:

1. Font Awesome
1. SVGs

### Font Awesome

1. Find the icon you want to use from the [Font Awesome website](https://fontawesome.com/v6.0/icons).
1. Import the icon in the `src/main.ts` file if it isn't already and append it to the rest of the icons under `library.add(..)`. Now, the icon should be globally accessible within the project.
1. Use the icon in your code.

:::tip
You can refer to [vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome/blob/2.x/README.md) for documentation.
:::

#### Examples

```md
<!-- Solid Icon -->

<fa 
    icon="book" 
    size="md" 
/>

<!-- Regular Icon -->

<fa
    :icon="['far', 'calendar-alt']"
    size="md"
/>
```

### SVGs

In case you can't find an icon from Font Awesome, you can look up an SVG of the icon from one of the following resources and add it to the `src/assets` folder. You should now be able to access the svg icon like an inage.

#### SVG Resources

-   [Flaticon](https://www.flaticon.com/)
-   [Tabler Icons](https://tablericons.com/)
-   [Hero Icons](https://heroicons.dev/)

## Cursor

All cursor variations used are mentioned here.

::: tip FILE LOCATION
The classes specified here exist at `/src/common/styles/_cursor.scss`.
:::

### Classes

-   `cursor__default`
-   `cursor__pointer` :point_up_2:

#### Example

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

## Mixins

Eureka has used the `@mixin` directive to create reusable CSS code. To take advantage of these mixins, you will need to use the `@include` directive.

::: tip FILE LOCATION
The classes specified here exist at `/src/common/styles/_mixins.scss`.
:::

### Shadow

You can give an element a box shadow.

Shadow

<div class="shadow-example"></div>

Small Shadow

<div class="shadow-small-example"></div>

#### Usage

```scss
@include shadow;
@include shadow--small;
```

#### Example

```scss
div {
    @include shadow;
    width: 150px;
    height: 90px;
}
```

### Gradient Animation

You can give an element a gradient background that will animate upon hover.

<div class="gradient-example"></div>

#### Usage

```scss
@include gradientAnimation($start, $end, $non-white: false);
```

#### Example

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

## Alerts

There are 2 types of alerts currently in Eureka:

1. Pop-ups
1. Toasts

Both make use of the [SweetAlert2](https://sweetalert2.github.io/) package.

### Pop-ups

Pop-ups are usually displayed after an action has been successful or not such as submitting a form or deleting something.

:::tip
Refer to the [SweetAlert2](https://sweetalert2.github.io/) documentation for more configuration options.
:::

```js
import Swal from 'sweetalert2';

Swal.fire({
    icon: 'success',
    title: 'Action successful',
    text: 'Your profile is updated!',
});
```

### Toasts

These are small unobtrusive alerts that is usually displayed at the bottom corners of the screeen.

:::tip
Refer to the [mixin example](https://sweetalert2.github.io/#mixin) from SweetAlert2 for more configuration options.
:::

```js
import Swal from 'sweetalert2';

Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
}).fire({
    icon: 'success',
    title: 'Action successful',
});
```
