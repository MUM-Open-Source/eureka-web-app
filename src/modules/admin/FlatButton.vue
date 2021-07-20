<template>
    <div style="margin: 0; padding: 0">
        <div :class="{ 'choosen-text': enabled }" class="button">
            {{ text }}
        </div>
        <div v-if="enabled" class="enabled-underline"></div>
    </div>
</template>

<script>
export default {
    name: 'FlatButton',
    props: {
        text: {
            type: String,
            required: true,
        },
        enabled: {
            type: Boolean,
            required: false,
        },
    },
};
</script>

<style lang="css" scoped>
.button {
    cursor: pointer;
    font-size: 18px;
    padding: 10px;
    text-align: center;
    border: none;
    background-color: transparent;
    outline: none;
}

.choosen-text {
    font-size: 18px;
    color: #4f7dd8;
    font-weight: 700;
}
.button:hover {
    background-color: #f0f0f0;
}
.underline {
    height: 1px;
    width: 100%;
    background-color: black;
}
.enabled-underline {
    height: 2px;
    background-color: #4f7dd8;
}
</style>
