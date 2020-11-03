<template>
  <div id="taskInfoPage" class="justify-center-column">
    <div class="dark-grey bold-text f20">{{taskTitle}}</div>
    <div class="justify-start-row mt12 w100">
      <img :src="lineLogo" class="task-owner-logo" />
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
        <div class="bold-text white-grey-text f16 mt8" v-html="taskExQuestion"></div>
        <img :src="ques" class="w100" />
        <div class="bold-text white-grey-text f16 mt8" v-html="taskExAnswerHint"></div>
        <img :src="ans" class="w100" />
      </div>
    </div>

    <div class="start-task-button" @click="startTask(taskId, taskTitle)">
      <div class="white-text f26 bold-text">開始任務</div>
    </div>
  </div>
</template>

<script>
import lineLogo from '../assets/icons/lineLogo.png'
import ques from '../assets/ques.png'
import ans from '../assets/ans.png'
import shareIcon from '../assets/icons/shareIcon.png'

export default {
  name: "TaskInfoPage",
  data() {
    return {
      lineLogo,
      ques,
      ans,
      shareIcon,
      taskTitle: "CLAS - 手寫數字圖片分類",
      taskOwner: "LINE CORP.",
      startDate: "2020/10/24",
      endDate: "2020/11/14",
      taskPay: "任務報酬: <span style=\"color:rgb(0, 195, 0)\">$2.5</span> / 每10頁</br>* <span style=\"color:rgb(255, 78, 78)\">最低</span>至少須完成10頁",
      taskDescription: "手寫數字的大型數據庫，通常用於訓練各種圖像處理系統。該數據庫還廣泛用於機器學習領域的培訓和測試。它是通過“重新混合”來自NIST原始數據集的樣本而創建的。創作者認為，由於NIST的訓練數據集是從美國人口普查局員工那裡獲得的。",
      taskExQuestion: "請問下列圖片哪些屬於<span style=\"color:rgb(0, 195, 0)\">數字2</span>?",
      taskExQuesPic: '',
      taskExAnswerHint: "您應該點擊選擇:",
      taskExAnsPic: '',
      taskId: '',
    }
  },
  methods: {
    startTask(id, taskTitle) {
      this.$router.push({ path: '/NERTaskPage', query: { id, taskTitle}})
    }
  },
  mounted() {
    const title = this.$route.meta.title
    this.$emit("setTitle", title)
    this.taskId=this.$route.query.id
    console.log(this.taskId)
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

  position: fixed;
  bottom: 40px;
}
.white-text {
  color: white;
}
.f26 {
  font-size: 26px;
}
</style>