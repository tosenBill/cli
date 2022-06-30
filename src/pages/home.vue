<template>
  <div class="home">
      这是首页
  </div>
</template>

<script>
export default {
  created () {
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