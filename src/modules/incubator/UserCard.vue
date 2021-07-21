<template>
    <div class="user__card pad--2">
        <div class="user__card--details">
            <!-- Details -->
            <div class="user__card--row">
                <!-- name -->
                <div class="subheading user__card--name">Nitin Mathew</div>
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
            <!-- rating -->
            <div class="user__card--rating mar__b--1">
                <img 
                    class="star__icon" 
                    v-for="index in [1,2,3]" 
                    :key="index" 
                    src="@/assets/star-filled.svg" 
                />
                <img 
                    class="star__icon" 
                    v-for="index in [4,5]" 
                    :key="index" 
                    src="@/assets/star-empty.svg" 
                />
            </div>
            <!-- bio -->
            <div class="body">
                A hardworking individual with passions rising in the east and setting in the west.
                A hardworking individual with passions rising in the east and setting in the west.
                A hardworking individual with passions rising in the east and setting in the west.
                A hardworking individual with passions rising in the east and setting in the west.
            </div>
            <!-- Team -->
            <div class="tagline user__card--team mar__t--1">
                <fa 
                    icon="users" 
                    size='md'
                    class="user__card--team-icon"
                />
                No Team
            </div>
        </div>
        <!-- Action items -->
        <div class="user__card--actions">
            <fa 
                :icon="['far', 'flag']" 
                size='2x'
                class="user__card--icon cursor__pointer"
            />
            <fa 
                :icon="['far', 'envelope']" 
                size='2x'
                class="user__card--icon cursor__pointer"
            />
            <fa 
                :icon="['far', 'paper-plane']" 
                size='2x'
                class="user__card--icon cursor__pointer"
            />
        </div>
    </div>
</template>

<script lang="ts">
export default {

}
</script>

<style lang="scss" scoped>
.user__card {
    @include shadow--small;
    display: flex;
    border-radius: $app-border-radius-sm;
    &--name {
        margin-right: 15px;
    }
    &--details {
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
    &--team {
        display: flex;
        align-items: center;
        &-icon {
            margin-right: 5px;
        }
    }
    &--actions {
        display: flex;
        align-items: center;
    }
    &--icon {
        width: 30px;
        margin: 5px;
        transition: all $transition-duration-fast;
        &:hover {
            color: $color-brand;
        }
    }
}
</style>