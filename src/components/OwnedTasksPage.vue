<template>
  <div id="owned-tasks-page">
    <div class="dark-grey bold-text f20 justify-center-row w100">所有已上傳的任務</div>
    <div class="horizontal-line"></div>

    <div v-for="(task, index) in taskList" :key="index" class="my-own-task justify-start-row">
      <div v-if="task.taskType == 'classification'" class="task-list-img-icon mr15"></div>
      <div v-else class="task-list-text-icon mr15"></div>
      <div class="align-start-column">
        <div class="green-text">{{task.taskTitle === '' ? '範例任務' : task.taskTitle }}</div>
        <div class="grey-text f12">審核中</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios" 
import imageLabelIcon from '../assets/icons/imgLabel.png'
import textLabelIcon from '../assets/icons/textLabelNoBg.png'
import * as config from '../../config'
// import company_default from '../assets/icons/company_default.png'

export default {
  name: "OwnedTasksPage",
  data() {
    return {
      taskIcon: '',
      taskTitle: '範例任務',
      imageLabelIcon,
      textLabelIcon,
      taskList: [],
      userProfile: {}
    }
  },
  computed: {
    args: function() {
      // userId: this.userProfile.userId
      return {
        userId: this.userProfile.userId
      };
    }
  },
  methods: {
    async queryInfo(){
      console.log('own', this.args)
      const response = await axios.post(`${config.API_DOMAIN}/task/getMyTask`, this.args);
      console.log(response);
      if(response.data.success){
        this.taskList = response.data.data;
      }
    }
  },
  async mounted() {
    let loader = this.$loading.show({
      color: 'rgb(0, 195, 0)',
      loader: 'dots',
      opacity: 1
    });

    // LIFF login check
    if (!this.$store.state.isAuthenticated) {
      console.log('ownedTask dispatch')
      this.$router.push('/')
    } else {
      console.log('profile in ownedTask', this.$store.state.userProfile)
      this.userProfile = this.$store.state.userProfile
    }

    const title = this.$route.meta.title
    this.$emit("setTitle", title)
    this.taskIcon = this.$store.state.taskIcon
    this.taskTitle = this.$store.state.taskTitle
    await this.queryInfo()

    loader.hide()
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
.mr15 {
  margin-right: 15px;
}
.my-own-task {
  width: 90%;
  overflow: hidden;
  margin: 10px 0;
}
</style>