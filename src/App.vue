<template>
    <div class="app">
        <div class="box">
            <button @click="goAbort">跳转页面111111</button>    
        </div>
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
        .box{
            display: flex;
        }
        background: red;
    }
</style>

<!-- <style lang="less" scoped>
    .app{
        .div{
            display: flex;
        }
    }
</style> -->
