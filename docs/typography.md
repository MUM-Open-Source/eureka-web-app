# Typography

Eureka sets some basic global typography styles. Whether you're creating a heading or simply a paragraph, make sure you use the css classes covered here before using custom styles.

## Sizes

| Class         | Example                                         |
| ------------- | ----------------------------------------------- |
| heading       | <div class="heading">The Guinea Pig</div>       |
| subheading    | <div class="subheading">The Guinea Pig</div>    |
| body          | <div class="body">The Guinea Pig</div>          |
| tagline       | <div class="tagline">The Guinea Pig</div>       |
| tagline--bold | <div class="tagline--bold">The Guinea Pig</div> |

### Examples

```md
<div class="heading">The Guinea Pig</div>
<div class="subheading">The Guinea Pig</div>
<div class="body">The Guinea Pig</div>
<div class="tagline">The Guinea Pig</div>
<div class="tagline--bold">The Guinea Pig</div>
```

## Colours

| Class           | Example                                      |
| --------------- | -------------------------------------------- |
| text--white     | <div class="text--white inline">White</div>  |
| text--primary   | <div class="text--primary">Primary</div>     |
| text--secondary | <div class="text--secondary">Secondary</div> |
| text--accent    | <div class="text--accent">Accent</div>       |

### Examples

```md
<div class="body text--white">White</div>
<div class="body text--primary">Primary</div>
<div class="body text--secondary">Secondary</div>
<div class="body text--accent">Accent</div>
```

## Alignment

| Class         | Example                                           |
| ------------- | ------------------------------------------------- |
| text--center  | <div class="text--center">Centered Text</div>     |
| text--left    | <div class="text--left">Left-Aligned Text</div>   |
| text--right   | <div class="text--right">Right-Aligned Text</div> |
| text--justify | <div class="text--justify">Jusitified Text</div>  |

### Examples

```md
<div class="body text--center">Centered Text</div>
<div class="body text--left">Left-Aligned Text</div>
<div class="body text--right">Right-Aligned Text</div>
<div class="body text--justify">Jusitified Text</div>
```

## Special Text

| Class         | Example                                         |
| ------------- | ----------------------------------------------- |
| text--capsule | <div class="text--capsule inline">Capsule</div> |

### Examples

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
