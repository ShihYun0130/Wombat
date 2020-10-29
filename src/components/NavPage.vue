<template>
  <div id="navPage">
    <div class="navs">
      <div class="nav" @click="routeToProfile">
        個人資訊
      </div>
      <div class="nav" @click="routeToTask">
        任務看板
      </div>
      <img :src="cross" class="crossIcon" @click="closeNav" />
    </div>
  </div>
</template>

<script>
import cross from '../assets/icons/cross.png'

export default {
  name: "NavPage",
  props: {
  },
  data() {
    return {
      cross
    }
  },
  methods: {
    closeNav() {
      this.$emit("closeNav")
    },
    routeToProfile() {
      this.$router.push({ name: "profile" })
      this.$emit("closeNav")
    },
    routeToTask() {
      this.$router.push({ name: "tasks" })
      this.$emit("closeNav")
    }
  },
}
</script>

<style>
#navPage {
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 95%;
  z-index: 9;

  background: white;
}

.crossIcon {
  width: 20px;
  margin: 25px;

  opacity: 60%;
}

.navs {
  margin-bottom: 50px;
}
@keyframes fade-in { 
  from { 
    opacity: 0; 
  } to { 
    opacity: 1; 
  } 
}

.nav {
  margin: 30px;
  font-size: 20px;
  color: rgb(51, 51, 51);
}
</style>