<template>
  <div id="task-example-page">
    <div class="dark-grey bold-text f20 justify-center-row w100">設定範例任務</div>

    <div class="horizontal-line"></div>

    <div v-if="!preview">
      <div class="grey-text f16 text-left mt8">這是我們幫您製作的範例任務圖片：</div>
      <img class="w100 mt12" :src="sampleTaskImage" />
    </div>
    <div v-else class="grey-text upload-preview mt12 w100">
        <img :src="preview" />
      </div>

    <div class="align-start-column text-left w100 mt20">
      <div class="grey-text f16 text-left mt8"> 您也可以重新上傳範例任務圖片：</div>
      <div class="f8 mt8 w100">
        <input class="upload-button-input" type="file" accept="image/*" @change="previewImage">
      </div>
    </div>

    <!-- <div class="dark-grey bold-text f20">範例題目</div>
    <div class="grey-text w100 text-left mt20">
      <div class="mt8"> 請輸入範例題目：</div>
      <div>
        <input class="task-name-input grey-text mt12 f16" />
      </div>
    </div>
    <div class="align-start-column text-left w100 mt20">
      <div class="grey-text f16 text-left mt8"> 請上傳範例任務頁面手機版截圖：</div>
      <div class="f8 mt8">
        <input class="upload-button-input" type="file" accept="image/*" @change="questionPreviewImage">
      </div>
      <div v-if="questionPreview" class="grey-text upload-preview mt12 w100">
        <img :src="questionPreview" />
      </div>
    </div>

    <div class="dark-grey bold-text f20 mt40">範例答案</div>
    <div class="align-start-column text-left w100 mt20">
      <div class="grey-text f16 text-left mt8"> 請上傳「成功完成」的範例題目任務頁面手機版截圖：</div>
      <div class="f8 mt8">
        <input class="upload-button-input" type="file" accept="image/*" @change="answerPreviewImage">
      </div>
      <div v-if="answerPreview" class="grey-text upload-preview mt12 w100">
        <img :src="answerPreview" />
      </div>
    </div> -->

    <div class="w100 justify-center-row">
      <div class="next-page-button" @click="nextPage">
        <div class="white-text f20 bold-text">完成囉!!</div>
      </div>
    </div>

    
  </div>
</template>

<script>
import axios from "axios"
import * as config from "../../config"

export default {
  name: "TaskExamplePage",
  data() {
    return {
      questionPreview: null,
      questionImage: null,
      answerPreview: null,
      answerImage: null,
      sampleTaskImage: "",
      preview: null,
      image: null,
      userProfile: {},
      taskOwner: null,
      taskType: null,
      taskIcon: null,
      taskStartDate: null,
      taskEndDate: null,
      taskTitle: null,
      taskDescription: null,
      taskPayRule: null,
      taskLeastPayLimitPage: null,
    }
  },
  computed:{
    getTaskInfo: function(){
      return {
        taskOwnerName: this.$store.state.taskOwner,
        taskOwnerId: this.$store.state.userProfile.userId,
        taskType: this.$store.state.taskType,
        taskIcon: this.$store.state.taskIcon,
        startDate: this.$store.state.taskStartDate,
        endDate: this.$store.state.taskEndDate,
        taskTitle: this.$store.state.taskTitle,
        description: this.$store.state.taskDescription,
        payRule: this.$store.state.taskPayRule,
        leastPayLimitPage: this.$store.state.taskLeastPayLimitPage,
        labeledDataList: this.$store.state.labeledDataList,
        unlabeledDataList: this.$store.state.unlabeledDataList,
        examplePic: [this.$store.state.sampleScreenshotOne, this.$store.state.sampleScreenshot],
      }
    },
  },
  methods: {
    questionPreviewImage (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.questionPreview = e.target.result;
        }
        this.questionImage = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    answerPreviewImage (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.answerPreview = e.target.result;
        }
        this.answerImage = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    async previewImage (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
      this.taskIcon = await this.convertFilesToString(this.image)
    },
    async sendTask() {
      const response = await axios.post(`${config.API_DOMAIN}/task/addTask`, this.getTaskInfo);
      console.log('send Task response', response);
      return response.data.success
    },
    async nextPage() {
      let loader = this.$loading.show({
        color: 'rgb(0, 195, 0)',
        loader: 'dots',
        opacity: 1
      });
      console.log(this.getTaskInfo);
      const isSendTask = await this.sendTask();
      console.log('isSendTask', isSendTask)
      loader.hide();
      if (isSendTask) {
        this.$router.push('/Success');
      }
      else {
        this.$router.push('/Failed');
      }
      
    }
  },
  mounted() {
    // LIFF login check
    if (!this.$store.state.isAuthenticated) {
      console.log('taskExamplePage dispatch')
      this.$router.push('/')
    } else {
      console.log('profile in taskExamplePage', this.$store.state.userProfile)
      this.userProfile = this.$store.state.userProfile
    }


    const title = this.$route.meta.title;
    this.$emit("setTitle", title);

    console.log('screenshot in example page', this.$store.state.sampleScreenshot);
    this.sampleTaskImage = this.$store.state.sampleScreenshot;
    this.getTaskInfo();
  }
}
</script>

<style>
#task-example-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 35px;
  flex-wrap: wrap;
}
.mt40 {
  margin-top: 40px;
}
</style>