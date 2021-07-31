# Alerts

There are 2 types of alerts currently in Eureka:

1. Pop-ups
1. Toasts

Both make use of the [SweetAlert2](https://sweetalert2.github.io/) package.

## Pop-ups

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

## Toasts

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
