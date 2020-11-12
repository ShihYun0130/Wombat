<template>
  <div id="labelResultPage">
    <div class="dark-grey bold-text f36">恭喜! 您已完成</div>
    <div class="grey-text f20 mt18"><span class="green-text f20">{{taskTitle}}</span>任務</div>
    <div class="progress-circle-container mt36">
      <v-progress-circular
        :rotate="-90"
        :size="185"
        :width="16"
        :value="accuracy"
        color="rgb(0, 195, 0)"
        >
        <v-col v-show="true">
          <div class="white-grey-text bold-text f20">精準度</div>
        <div class="green-text f36">{{accuracy.toFixed(1)}}%</div>
        </v-col>
      </v-progress-circular>
      <div class="small-circle" v-show="true"></div>
    </div>

    <div class="white-grey-text bold-text f24 mt-18">+ {{expValue}}% exp.</div>

    <div class="space-between-row w80 mt28">
      <img class="w58" :src="imageLabelIcon" />
      <div class="w100px text-left">
        <div class="grey-text f20">{{taskCategory}}</div>
        <div class="result-task-progress mt5">
          <b-progress :value="taskLevelPercentage" height="9px" variant="success"></b-progress>
        </div>
      </div>
      <div class="green-text f20 result-task-level">LV.{{taskLevel}}</div>
    </div>

    <div class="dark-grey bold-text f24 mt48">請對這項任務進行評價</div>
    <div class="mt8">
      <star-rating 
        star-size=30
        rounded-corners=true
        padding=1
        inactive-color="rgb(219, 219, 219)"
        :show-rating="false"
      />
    </div>

    <div class="go-back-to-task-button" @click="goToTaskPage">
      <img :src="dashboardIcon" />
      <div class="dashBoard-text">返回任務看板</div>
    </div>

  </div>
</template>

<script>
import imageLabelIcon from '../assets/icons/classification.png'
import StarRating from 'vue-star-rating'
import dashboardIcon from '../assets/icons/dashboardIcon.png'
import axios from "axios"
import * as config from "../../config"


export default {
  name: "LabelResultPage",
  components: {
    StarRating
  },
  data() {
    return {
      imageLabelIcon,
      dashboardIcon,
      taskType: "",
      taskCategory: "分類型",
      accuracy: 0,
      expValue: 0,
      taskLevelPercentage: 0,
      taskLevel: 1,
      taskId: "",
      taskTitle: "",
      userProfile: {}
    }
  },
  computed: {
    args: function() {
                // labelIdList: this.$store.state.answerIdList

      return {
          taskId: this.taskId,
          userId: this.userProfile.userId,
          taskType: this.taskType,
          transactionId: JSON.parse(localStorage.getItem('transactionId'))
      }
    }
  },
  methods: {
    goToTaskPage() {
      console.log('gototask')
      this.$router.push('/Tasks')
    },
    async initialResult() {
      console.log(this.args);
      //get all entitys
      const response = await axios.post(`${config.API_DOMAIN}/accuracy`, this.args);
      console.log(response);
      if(response.data.success){
        var result = response.data.data;
        this.accuracy = result.accuracy * 100;
        this.taskLevelPercentage = result.levelPercentage;
        this.expValue = result.taskExpValue;
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
      console.log('LabelResultPage dispatch')
      this.$router.push('/')
    } else {
      console.log('profile in LabelResultPage', this.$store.state.userProfile)
      this.userProfile = this.$store.state.userProfile
    }

    const title = this.$route.meta.title
    this.$emit('setTitle', title)
    this.taskType = this.$route.query.taskType;
    this.taskId = this.$route.query.taskId;
    this.taskTitle = this.$route.query.taskTitle;
    console.log(this.taskType);
    await this.initialResult();

    loader.hide();
  }
}
</script>

<style>
#labelResultPage {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 28px;
}
.progress-circle-container {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
}
.mt5 {
  margin-top: 5px;
}
.mt-18 {
  margin-top: -18px;
}
.mt18 {
  margin-top: 18px;
}
.mt28 {
  margin-top: 28px;
}
.mt36 {
  margin: 36px;
}
.mt48 {
  margin-top: 48px;
}
.f24 {
  font-size: 24px;
}
.f36 {
  font-size: 36px;
}
.small-circle {
  position: absolute;
  width: 140px;
  height: 140px;
  border:rgb(219, 219, 219) solid 4px;
  border-radius: 100%;
}
.w58 {
  width: 50px;
}
.w100px {
  width: 100px;
}
.w80 {
  width: 80%;
}
.space-between-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.go-back-to-task-button {
  width: 212px;
  height: 52px;
  border-radius: 30px;
  background: rgb(0, 195, 0);
  margin-top: 30px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  box-shadow: 1px 3px 2px rgb(0, 0, 0, 0.13);
  bottom: 40px;
}
.go-back-to-task-button>img {
  margin-right: 6px;
  width: 24px;
}
</style>