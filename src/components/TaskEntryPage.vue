<template>
  <div id="taskEntryPage">
    <div class="task-page-info"> 請從下方選擇任務點擊進入 </div>
    <div class="horizontal-line"></div>
    <div class="task-list-container">
      <div v-for="task in allTaskList" :key="task.id" class="task-item" @click="goToDetailPage(task.taskId, task.taskType)">
        <div v-if="task.taskType == 'classification'" class="task-list-img-icon"></div>
        <div v-else class="task-list-text-icon"></div>
        <div class="task-list-right">
          <div class="grey-text f16">{{task.taskTitle}}</div>
          <div class="white-grey-text f14">{{task.taskOwnerName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imageLabelIcon from '../assets/icons/imgLabel.png'
import textLabelIcon from '../assets/icons/textLabelNoBg.png'
import axios from "axios"
import * as config from '../../config'

export default {
  name: "TaskEntryPage",
  data() {
    return {
      allTaskList: [],
      imageLabelIcon,
      textLabelIcon,
      userProfile: {}
    }
  },
  methods: {
    goToDetailPage(id, type) {
      this.$router.push({ path: '/Task-info', query: { id , type}})
    },
    async queryTaskInfo(){
      // get all entitys
      const type = this.$route.query.taskType
      if(type){
        const response = await axios.post(`${config.API_DOMAIN}/taskType`, {taskType: type});
        console.log(response);
        this.allTaskList = response.data.data;
        return;
      }
      const response = await axios.get(`${config.API_DOMAIN}/tasks`);
      console.log(response);
      this.allTaskList = response.data.data;
    }
  },
  async mounted() {
    // LIFF login check
    if (!this.$store.state.isAuthenticated) {
      console.log('taskInfoPage dispatch')
      this.$router.push('/')
    } else {
      console.log('profile in taskInfoPage', this.$store.state.userProfile)
      this.userProfile = this.$store.state.userProfile
    }
    let loader = this.$loading.show({
      color: 'rgb(0, 195, 0)',
      loader: 'dots',
      opacity: 1
    });

    const title = this.$route.meta.title;
    this.$emit("setTitle", title);
    await this.queryTaskInfo();

    loader.hide();
  }
}
</script>

<style>
#taskEntryPage {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

#taskEntryPage::-webkit-scrollbar {
  display: none;
}

.task-page-info {
  font-size: 20px;
  font-weight: bold;
  color: rgb(129, 129, 129);

  margin-top: 22px;
}

.horizontal-line {
  width: 223px;
  height: 0px;
  border-bottom: 1px solid rgb(112, 112, 112, 0.16);
  margin: 16px;
}

.task-list-img-icon {
  background: url('../assets/icons/imgLabel.png') no-repeat;
  background-color: rgb(185, 65, 255);
  border-radius: 100%;
  width: 35px;
  height: 35px;
  background-size: 24px;
  background-position: 50% 50%;
}

.task-list-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.f16 {
  font-size: 16px;
}

.f14 {
  font-size: 14px;
}

.white-grey-text {
  color: rgb(190, 190, 190);
}

.task-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  margin-bottom: 25px;
}

.task-list-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  margin-left: 20px;
}

.task-list-text-icon {
  background: url('../assets/icons/textLabelNoBg.png') no-repeat;
  background-color: rgb(134, 207, 134);
  border-radius: 100%;
  width: 35px;
  height: 35px;
  background-size: 24px;
  background-position: 50% 50%;
}
</style>