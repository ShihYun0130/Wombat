<template>
  <div id="taskEntryPage">
    Task Entry Page
  </div>
</template>

<script>
export default {
  name: "TaskEntryPage",
  mounted() {
    this.$emit("setTitle")
  }
}
</script>

<style>

</style>