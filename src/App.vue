<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {}
  }
}
</script>
<style lang="scss">
  #app {
    width: 100%;
    min-height: calc(100vh);
    background: #f5f5f5;
    position: relative;
    z-index: 1;
  }
</style>
