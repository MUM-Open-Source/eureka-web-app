<template>
    <div class="not-found">
        <img src="@/assets/not-found-icon.svg" class="pad__b--1" />
        <div class="">
            <div class="heading pad__b--1">404. Not found.</div>
            <div class="body">
                Eureka...no. Looks like the page you were looking for does not
                exist. Go back to the main page, thanks :D
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>

<style lang="scss" scoped>
.not-found {
    display: flex;
    align-items: center;
    position: fixed;
    top: $not-found-position-ratio;
    left: $not-found-position-ratio;
    transform: translate(
        -$not-found-position-ratio,
        -$not-found-position-ratio
    );
    img {
        width: $not-found-img-width;
        padding-right: $not-found-img-padding-right;
    }
}

@media (max-width: 765px) {
    .not-found {
        justify-content: center;
        flex-direction: column;
        text-align: center;
        img {
            width: $not-found-img-width-sm;
            padding-right: 0;
        }
    }
}
</style>
