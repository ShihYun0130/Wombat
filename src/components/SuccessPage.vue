<template>
  <div id="success-page">
    <sweetalert-icon class="mt60" icon="success" />
    <div class="green-text f28">任務上傳成功</div>
    <div class="grey-text mt12">待任務審核完畢後<br>會自動發佈到任務列表中</div>
    
    <div class="w100 justify-center-row">
      <div class="go-to-my-task-button next-page-button" @click="goToMyTask">
        <div class="white-text f20 bold-text">前往我的任務</div>
      </div>
    </div>
  </div>
</template>

<script>
import SweetalertIcon from 'vue-sweetalert-icons';

export default {
  name: "SuccessPage",
  components: { SweetalertIcon },
  data() {
    return {
      userProfile: {}
    }
  },
  methods: {
    goToMyTask() {
      this.$router.push('/My-tasks')
    }
  },
  mounted() {
    // LIFF login check
    if (!this.$store.state.isAuthenticated && !localStorage.getItem('isAuthenticated') == 'true') {
      console.log('taskSettingPage dispatch')
      this.$router.push('/')
    } else {
      console.log('profile in taskSettingPage', JSON.parse(localStorage.getItem('userProfile')))
      this.userProfile = JSON.parse(localStorage.getItem('userProfile'))
    }

    const title = ' '
    this.$emit("setTitle", title)
  }
}
</script>

<style>
#success-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.go-to-my-task-button {
  width: 50%;
}
.mt60 {
  margin-top: 60px!important;
}
.f28 {
  font-size: 28px;
}
.w90 {
  width: 90%;
}
</style>