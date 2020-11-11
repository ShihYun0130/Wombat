<template>
  <div id="owned-tasks-page">
    <div class="dark-grey bold-text f20 justify-center-row w100">所有已上傳的任務</div>
    <div class="horizontal-line"></div>

    <div class="my-own-task justify-start-row">
      <img class="mr10 w60" :src="taskIcon === '' ? company_default : taskIcon" />
      <div class="align-start-column">
        <div class="green-text">{{taskTitle === '' ? '範例任務' : taskTitle }}</div>
        <div class="grey-text f12">審核中</div>
      </div>
    </div>
  </div>
</template>

<script>
import company_default from '../assets/icons/company_default.png'
export default {
  name: "OwnedTasksPage",
  data() {
    return {
      taskIcon: '',
      taskTitle: '範例任務',
      company_default,
      userProfile: {}
    }
  },
  mounted() {
    // LIFF login check
    // if (!this.$store.state.isAuthenticated) {
    //   console.log('ownedTask dispatch')
    //   this.$router.push('/')
    //   // await this.$store.dispatch('getProfile')
    // } else {
    //   console.log('profile in ownedTask', this.$store.state.userProfile)
    //   this.userProfile = this.$store.state.userProfile
    // }

    const title = this.$route.meta.title
    this.$emit("setTitle", title)
    this.taskIcon = this.$store.state.taskIcon
    this.taskTitle = this.$store.state.taskTitle
  }
}
</script>

<style>
#owned-tasks-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 30px;
  flex-wrap: wrap;
}
.w60 {
  width: 60px;
}
.mr10 {
  margin-right: 10px;
}
.my-own-task {
  width: 90%;
  overflow: hidden;
}
</style>