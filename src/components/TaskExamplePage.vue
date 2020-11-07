<template>
  <div id="task-example-page">
    <div class="dark-grey bold-text f20 justify-center-row w100">設定範例任務</div>

    <div class="horizontal-line"></div>

    <div class="dark-grey bold-text f20">範例題目</div>
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
    </div>

    <div class="w100 justify-center-row">
      <div class="next-page-button" @click="nextPage">
        <div class="white-text f20 bold-text">快完成囉!!</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskExamplePage",
  data() {
    return {
      questionPreview: null,
      questionImage: null,
      answerPreview: null,
      answerImage: null
    }
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
    nextPage() {
      this.$route.push('/Data-upload')
    }
  },
  mounted() {
    const title = this.$route.meta.title
    this.$emit("setTitle", title)
  }
}
</script>

<style>
#task-example-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 35px;
  flex-wrap: wrap;
}
.mt40 {
  margin-top: 40px;
}
</style>