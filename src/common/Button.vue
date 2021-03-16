<template>
    <button>{{ text }}</button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang='scss' scoped>
@import '@/styles/components/button';
</style>