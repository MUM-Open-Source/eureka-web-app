<template>
    <div class="under-maintenance">
        <div class="">
            <img src="@/assets/under_maintenance_illustration.svg" class="pad__b--1"/>
            <div class="subheading text--primary text--center">
                Flushing bugs out of the system!
            <br>
                Website under maintenance
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Maintenance'
}
</script>

<style lang="scss" scoped>
.under-maintenance {
    display: flex;
    align-items: center;
    position: fixed;
    top: $under-maintenance-position-ratio;
    left: $under-maintenance-position-ratio;
    transform: translate(-$under-maintenance-position-ratio,-$under-maintenance-position-ratio);
    img {
        width: $under-maintenance-img-width;
        padding-right: $under-maintenance-img-padding-right;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
}


@media (max-width: 765px) {
    .under-maintenance {
        justify-content: center;
        flex-direction: column;
        text-align: center;
        img {
            width: $under-maintenance-img-width-sm;
            padding-right: 0;
        }
    }
}

</style>
