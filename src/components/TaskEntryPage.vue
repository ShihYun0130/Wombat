<template>
  <div id="taskEntryPage">
    Task Entry Page
  </div>
</template>

<script>
export default {
  name: "TaskEntryPage",
  mounted() {
    const title = this.$route.meta.title
    this.$emit("setTitle", title)
  }
}
</script>

<style>

</style>