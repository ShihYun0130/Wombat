<template>
  <div id="PageNotFound"> 
    This page is not found, please check you are heading for a existed valid URL.
  </div>   
</template>

<script>
export default {
  name: "PageNotFound",
  mounted() {
    const title = ' '
    this.$emit("setTitle", title)
  }
}
</script>

<style>

</style>