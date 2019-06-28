<template>
<div class="container" id="app">
    hello world
    <p class="page-name">{{name}}</p>
</div>
</template>

<script>
  export default {
    data() {
      return {
        name: "App.vue"
      }
    }
  }
</script>

<style scoped lang="less">
.container {
    color: red;
    font-size: 40px;
    .page-name {
        color: blue;
        font-size: 50px;
    }
}
</style>
