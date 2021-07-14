<template>
    <div class="user__card pad--2 mar__b--1">
        <div class="user__card--details">
            <!-- Details -->
            <div class="user__card--row mar__b--1">
                <!-- name -->
                <div class="subheading user__card--project">Project 1</div><span class="user__card--name">(Dr Lillian)</span>
                <!-- tags -->
                <div class="user__card--tags">
                    <div
                        v-for="item in ['Data Science', 'Python']"
                        :key="item"
                        class="tagline text--capsule cursor__default">
                        {{ item }}
                    </div>
                </div>
            </div>
            <!-- bio -->
            <div class="body">
                A hardworking individual with passions rising in the east and setting in the west.
                A hardworking individual with passions rising in the east and setting in the west.
                A hardworking individual with passions rising in the east and setting in the west.
                A hardworking individual with passions rising in the east and setting in the west.
            </div>
        </div>
        <!-- Status -->
        <div class="user__card--actions">
            <div class="tagline text--capsule cursor__default">Approved</div>
        </div>
    </div>
</template>

<script>

export default {
}
</script>

<style lang="scss" scoped>
.user__card {
    @include shadow--small;
    display: flex;
    border-radius: $app-border-radius;
    &--project {
        margin-right: 15px;
    }
    &--name {
        margin-right: 12px;
    }
    &--row {
        display: flex;
        align-items: center;
    }
    &--tags {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    &--rating {
        display: flex;
        .star__icon {
            width: $star-icon-width;
            margin-right: $star-icon-margin-right;
        }
    }
    &--actions {
        display: flex;
        height: 2.5rem;
        align-self: center;
    }
    &--icon {
        width: 30px;
        margin: 5px;
    }
}
</style>
