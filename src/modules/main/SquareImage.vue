<template>
    <div>
        <!-- <img class="round-img" :src="require('@/assets/' + imgName + '')" :alt="alt" /> -->
        <img class="square-img" :src="imgName" :alt="alt" />
    </div>
</template>

<script>
export default {
    name: 'SquareImage',
    props: {
        imgName: {
            type: String,
            required: true
        },
        alt: String
    }
}
</script>

<style lang='scss' scoped>
@import '@/styles/components/squared_img';
</style>