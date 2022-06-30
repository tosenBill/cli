<template>
    <div class="app">
        <button @click="goAbort">跳转页面111111</button>
        <router-view></router-view>
        <img src="./assets/img/favicon.png" alt="">
        <img src="./assets/images/tree.jpg" alt="">
    </div>
</template>

<script>
export default {
    methods: {
        goAbort () {
            this.$router.push('/abort')
        }
    }
}
</script>

<style lang="scss" scoped>
    .app{
        background: red;
    }
</style>