

<template>
    <div class = "body">
        <div class="under-maintenance">
            <div class="">
                <img src="@/assets/under_maintenance_illustration.svg" class="pad__b--1"/>
                <div class="bodytext">
                    Flushing bugs out of the system!
                <br>
                    Website under maintenance
                </div>
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

div {
  background-image: url("../assets/warning_sign.svg");
  background-repeat: repeat-x; 
}

.bodytext {
    font-size: 25px;
    color: rgb(253, 0, 0);
    text-align: center;
    font-weight: bold;
    background-image: url("../assets/warning_sign.svg");
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
