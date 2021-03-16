<template>
    <button><slot></slot></button>
</template>

<script>
export default {
    name: 'IconButton',    
}
</script>

<style lang='scss' scoped>
    button{        
        border: none;
        padding-top: 2px;
        outline: none;
        background-color: transparent; 
        margin: 4px;               
        height: 40px;
        width: 40px;
        border-radius: 100%;
        cursor: pointer;
    }
    button:hover{
        background-color: #F0F0F0;        
    }
</style>