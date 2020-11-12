<template>
  <div id="failed-page">
    <sweetalert-icon class="mt60" icon="warning" />
    <div class="green-text f28">任務上傳失敗</div>
    <div class="grey-text mt12">請重新上傳任務<br>並檢查資料格式是否正確</div>
    
    <div class="w100 justify-center-row">
      <div class="go-to-my-task-button next-page-button" @click="goToTaskSetting">
        <div class="white-text f20 bold-text">重新上傳任務</div>
      </div>
    </div>
  </div>
</template>

<script>
import SweetalertIcon from 'vue-sweetalert-icons';

export default {
  name: "FailedPage",
  components: { SweetalertIcon },
  data() {
    return {
      userProfile: {}
    }
  },
  methods: {
    goToTaskSetting() {
      this.$router.push('/Task-setting')
    }
  },
  mounted() {
    // LIFF login check
    if (!this.$store.state.isAuthenticated) {
      console.log('successPage dispatch')
      this.$router.push('/')
    } else {
      console.log('profile in successPage', this.$store.state.userProfile)
      this.userProfile = this.$store.state.userProfile
    }

    const title = ' '
    this.$emit("setTitle", title)
  }
}
</script>

<style>
#failed-page {
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