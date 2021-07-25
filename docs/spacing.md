# Spacing

## Page Padding

-   `page-pad`

```md
<div class="page-pad"> // wrap your page content in this div 
    <div class="your-content">The Guinea Pig</div>
</div>
```

## Margins & Padding

The **property** applies the type of spacing:

-   `mar` - applies `margin`
-   `pad` - applies `padding`

The _optional_ **direction** designates the side the property applies to:

-   `__t` - applies the spacing for `margin-top` and `padding-top`
-   `__b` - applies the spacing for `padding-bottom` and `padding-bottom`

The **multiplier** controls the increment of the property by 10px:

-   `--auto` - automatically sets the `margin` or `padding`
-   `--0` - sets `margin` or `padding` to 0px
-   `--1` - sets `margin` or `padding` to 10px
-   `--2` - sets `margin` or `padding` to 20px
-   `--3` - sets `margin` or `padding` to 30px
-   `--4` - sets `margin` or `padding` to 40px
-   `--5` - sets `margin` or `padding` to 50px

### Examples

```md
<div class="mar--auto"></div>
<div class="mar--0"></div>
<div class="mar__t--1"></div>
<div class="pad--2"></div>
<div class="pad__b--3"></div>
```

### Horizontal Centering Example

You can horizontally center an element by giving it a fixed-width and the `mar--auto` class.

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