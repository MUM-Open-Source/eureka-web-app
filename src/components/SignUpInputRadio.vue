<template>
    <!-- Adapted from https://codepen.io/JiveDig/details/jbdJXR -->
    <p class="tagline mar__b--1">What kind of Monash student are you?</p>
    <div class="switch-field mar--auto text--center body">
        <input type="radio" id="future" name="student-type" value="future" required/>
        <label for="future">Future</label>
        <input type="radio" id="current" name="student-type" value="current" checked/>
        <label for="current">Current</label>
        <input type="radio" id="past" name="student-type" value="past"/>
        <label for="past">Past</label>
    </div>
</template>

<script>
export default {
    name: 'SignUpInputRadio'
}
</script>

<style lang='scss' scoped>
@import '@/styles/components/input_radio';
</style>