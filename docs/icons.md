# Icons

There are 2 methods for creating icons:

1. Font Awesome
1. SVGs

## Font Awesome

1. Find the icon you want to use from the [Font Awesome website](https://fontawesome.com/v6.0/icons).
1. Import the icon in the `src/main.ts` file if it isn't already and append it to the rest of the icons under `library.add(..)`. Now, the icon should be globally accessible within the project.
1. Use the icon in your code.

:::tip
You can refer to [vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome/blob/2.x/README.md) for documentation.
:::

### Examples

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

## SVGs

In case you can't find an icon from Font Awesome, you can look up an SVG of the icon from one of the following resources and add it to the `src/assets` folder. You should now be able to access the svg icon like an inage.

### SVG Resources

-   [Flaticon](https://www.flaticon.com/)
-   [Tabler Icons](https://tablericons.com/)
-   [Hero Icons](https://heroicons.dev/)
