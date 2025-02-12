<template>
  <div id="taskInfoPage" class="justify-center-column">
    <div class="dark-grey bold-text f20">{{taskTitle}}</div>
    <div class="justify-start-row mt12 w100">
      <img :src="Logo" class="task-owner-logo" />
      <div class="align-start-column">
        <div class="bold-text white-grey-text f20">{{taskOwner}}</div>
        <div class="align-start-column">
          <div class="white-grey-text bold-text f13">招募日期：</div>
          <div class="white-grey-text bold-text f13">{{startDate}} - {{endDate}}</div>
        </div>
      </div>
    </div>

    <div class="horizontal-line"></div>

    <div class="p10">
      <div class="align-start-column m16">
        <div class="justify-start-row">
          <div class="dark-grey bold-text f20">報酬費用說明</div>
          <div class="shareIcon justify-center-row">
            <div class="white-text bold-text f12">分享任務</div>
            <img :src="shareIcon" />
          </div>
        </div>
        <div v-html="taskPay" class="bold-text white-grey-text f16 mt8"></div>
      </div>
      <div class="align-start-column m16">
        <div class="dark-grey bold-text f20">任務說明</div>
        <div class="bold-text white-grey-text f16 text-left mt8">{{taskDescription}}</div>
      </div>
      <div class="align-start-column m16">
        <div class="dark-grey bold-text f20">標註範例</div>
        <div v-if="this.taskType == 'classification'">
          <div class="bold-text white-grey-text f16 mt8" v-html="taskExQuestion"></div>
          <img :src="ques" class="w100" />
          <div class="bold-text white-grey-text f16 mt8" v-html="taskExAnswerHint"></div>
          <img :src="ans" class="w100" />
        </div>
        <div v-else>
          <iframe width="90%" src="https://www.youtube.com/embed/120lJsqHSJI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    </div>

    <div class="start-task-button" @click="startTask(taskId, taskTitle, taskType)">
      <div class="white-text f26 bold-text">開始任務</div>
    </div>
    
  </div>
</template>

<script>
import Logo from '../assets/icons/logo_placeholder.png'
import ques from '../assets/ques.png'
import ans from '../assets/ans.png'
import shareIcon from '../assets/icons/shareIcon.png'
import axios from "axios"
import * as config from "../../config"

export default {
  name: "TaskInfoPage",
  data() {
    return {
      Logo,
      ques,
      ans,
      shareIcon,
      taskTitle: "",
      taskOwner: "",
      startDate: "",
      endDate: "",
      taskPay: "任務報酬: <span style=\"color:rgb(0, 195, 0)\">$2.5</span> / 每10頁</br>* <span style=\"color:rgb(255, 78, 78)\">最低</span>至少須完成10頁",
      taskDescription: "",
      taskExQuestion: "範例問題",
      taskExQuesPic: '',
      taskExAnswerHint: "您應該點擊選擇:",
      taskExAnsPic: '',
      taskId: '',
      taskType: '',
      userProfile: {},
      payRule: 0,
      targetClass:[],
    }
  },
  methods: {
    startTask(taskId, taskTitle, taskType) {
      var currentPage = 1;
      var totalPage = 2;
      if(this.taskType == 'classification'){
        totalPage = totalPage * this.targetClass.length;
        this.$router.push({ path: '/classificationLabel', query: { taskType, taskId, taskTitle, currentPage, totalPage } });
      }
      else{
        this.$router.push({ path: '/NERTaskPage', query: { taskType, taskId, taskTitle, currentPage, totalPage } });
      }
    },
    async queryTaskInfo(){
      const response = await axios.post(`${config.API_DOMAIN}/task`,{
        taskId: this.taskId,
        userId: this.userProfile.userId,
      });
      console.log(response);
      var result = response.data.data;
      if(response.data.success){
        this.taskDescription = result.description;
        this.Logo = result.taskIcon ? result.taskIcon : this.Logo;
        this.ques = result.examplePic[0];
        this.ans = result.examplePic[1];
        this.taskTitle = result.taskTitle;
        this.taskOwner = result.taskOwner;
        this.startDate = result.startDate;
        this.endDate = result.endDate;
        this.taskPay = "任務報酬: <span style=\"color:rgb(0, 195, 0)\">$2.5</span> / 每10頁</br>* <span style=\"color:rgb(255, 78, 78)\">最低</span>至少須完成10頁";
        this.payRule = result.payRule;
        console.log(this.taskDescription);
      }

      //get all class
      const response2 = await axios.post(`${config.API_DOMAIN}/task/getQuestion`, 
      {
          taskId: this.taskId,
          userId: this.userProfile.userId,
      });
      if(response2.data.success){
        this.targetClass = response2.data.data;
      }
    }
  },
  async mounted() {
    let loader = this.$loading.show({
      color: 'rgb(0, 195, 0)',
      loader: 'dots',
      opacity: 1
    });

    const title = this.$route.meta.title
    this.$emit("setTitle", title)
    this.taskId = this.$route.query.id
    this.taskType = this.$route.query.type;
    console.log(this.taskId)

    console.log('mounted profile in task info', this.$store.state.userProfile)

    // LIFF login check
    if (!this.$store.state.isAuthenticated && !localStorage.getItem('isAuthenticated') == 'true') {
      console.log('taskSettingPage dispatch')
      this.$router.push('/')
    } else {
      console.log('profile in taskSettingPage', JSON.parse(localStorage.getItem('userProfile')))
      this.userProfile = JSON.parse(localStorage.getItem('userProfile'))
    }

    await this.queryTaskInfo();
    loader.hide();
  }
}
</script>

<style>
#taskInfoPage {
  padding: 26px;
}
.w100 {
  width: 100%;
}
.p10 {
  padding: 10px;
}
.text-left {
  text-align: left;
}
.shareIcon {
  background: rgb(185, 65, 255);
  width: 84px;
  height: 24px;
  border-radius: 58px;
  margin-left: 20px;
}
.shareIcon>img {
  width: 17px;
  margin-left: 4px;
} 
.justify-center-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.justify-center-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.justify-start-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.align-start-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.task-owner-logo {
  width: 86px;
  margin-right: 26px;
}
.dark-grey {
  color: rgb(112, 112, 112)
}
.bold-text {
  font-weight: bold;
}
.f12 {
  font-size: 12px;
}
.f13 {
  font-size: 13px;
}
.mt12 {
  margin-top: 12px;
}
.mt8 {
  margin-top: 8px;
}
.m16 {
  margin-bottom: 16px;
}
.start-task-button {
  width: 212px;
  height: 52px;
  border-radius: 30px;
  background: rgb(0, 195, 0);

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  box-shadow: 1px 3px 2px rgb(0, 0, 0, 0.13);
}
.white-text {
  color: white;
}
.f26 {
  font-size: 26px;
}
</style>