<template>
    <div class="page-pad">
        <aside><img src="@/assets/error-logo.svg" width="200" height="200" /></aside>
        <div class="padding">
            <h1 class="header-padding">Eu-rrer 404: Not Found</h1>
            <p>Eure- wait. Something went wrong! Try another way, For the Eureka path is not easy</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style lang="scss" scoped>
.page-pad {
    display: flex;
    align-items: center;
    height: 80vh;
    max-width: 1000px;
    margin: 0 auto;
    > * {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    max-width: 500px;
    width: 100%;
  }
}

.padding {
    p {
        font-size: 20px;
        text-align: center;
    }
    h1 {
        font-size: 50px;
    }
}

.header-padding {
    padding-bottom: 0.8rem;
}
</style>
