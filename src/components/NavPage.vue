<template>
  <div id="navPage">
    <div class="navs">
      <div class="nav" @click="routeToProfile">
        個人資訊
      </div>
      <div class="nav" @click="routeToTask">
        任務看板
      </div>
      <div class="nav" @click="routeToTaskUpload">
        任務上傳
      </div>
      <div class="nav" @click="routeToMyTask">
        我的任務
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
      this.$router.push('Profile')
      this.$emit("closeNav")
    },
    routeToTask() {
      this.$router.push('/Tasks')
      this.$emit("closeNav")
    },
    routeToTaskUpload() {
      this.$router.push('/Task-setting')
      this.$emit("closeNav")
    },
    routeToMyTask() {
      this.$router.push('/My-tasks')
      this.$emit("closeNav")
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log('nextTick')
      document.getElementById('navPage').style.opacity = '95%'
      document.getElementsByClassName('crossIcon')[0].style.opacity = '60%'
    })
  }
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
  justify-content: flex-start;
  align-items: center;
  opacity: 95%;
  z-index: 20;

  background: white;
}

.crossIcon {
  width: 20px;
  margin: 45px;

  opacity: 60%;
}

.navs {
  margin-top: 100px;
}

.nav {
  margin: 30px;
  font-size: 20px;
  color: rgb(51, 51, 51);
  border-bottom: 1px solid rgb(201, 201, 201);
  padding-bottom: 10px;
}
</style>