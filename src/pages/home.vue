<template>
  <div class="home">
      这是首页
      <span class="iconfont adolf-icon-twitter-square-fill"></span>
  </div>
</template>

<script>
import { locationPath } from '@/utils'
export default {
  created () {
    console.log(locationPath)
    this.getBanner()
  },
  methods: {
    getBanner () {
      this.$http.User.getBanner().then(res =>{
        console.log('res', res)
      })
    }
  }
}
</script>

<style>

</style>