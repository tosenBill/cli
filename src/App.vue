<template>
    <div class="app">
        <div class="box">
            <button @click="goAbort">跳转页面</button>    
        </div>
        <router-view></router-view>
        <img src="./assets/img/favicon.png" alt="">
        <img src="./assets/images/tree.jpeg" alt="">
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
        .box{
            display: flex;
        }
        background: red;
    }
</style>
