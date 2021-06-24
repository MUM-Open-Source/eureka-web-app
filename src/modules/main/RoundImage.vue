<template>
    <div>
        <!-- <img class="round-img" :src="require('@/assets/' + imgName + '')" :alt="alt" /> -->
        <img class="round-img" :src="src" :alt="alt" />
    </div>
</template>

<script>
export default {
    name: 'RoundImage',
    props: {
        src: {
            type: String,
            required: true
        },
        alt: String
    }
}
</script>

<style lang='scss' scoped>
.round-img {
    @include shadow;
    width: $round-img-width;
    height: auto;
    border-radius: 50%;
}
</style>