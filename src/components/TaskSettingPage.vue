<template>
  <div id="taskSettingPage">
    <div class="dark-grey bold-text f20 justify-center-row w100">基本資料設定</div>
    <div class="horizontal-line"></div>
    <div class="grey-text text-left">
      <div class="dark-grey bold-text f20">第1步</div>
      <div class="mt8"> 請選擇要上傳的任務類別：</div>
      <div class="justify-center-row">
        <div class="task-type-button">圖片分類</div>
        <div class="task-type-button">文字分類</div>
      </div>
    </div>
    <div class="grey-text w100 text-left mt20">
      <div class="dark-grey bold-text f20">第2步</div>
      <div class="mt8"> 請輸入您要作為公開發佈此任務所顯示的企業或團隊名稱：</div>
      <div>
        <input class="task-name-input grey-text mt12 f16" />
      </div>
    </div>
    <div class="align-start-column text-left w100 mt20">
      <div class="dark-grey bold-text f20">第3步</div>
      <div class="grey-text f16 text-left mt8"> 請上傳您要作為公開發佈此任務所顯示的企業或團隊代表圖片：</div>
      <div class="f8 mt8 w100">
        <input class="upload-button-input" type="file" accept="image/*" @change="previewImage">
      </div>
      <div v-if="preview" class="grey-text upload-preview mt12 w100">
        <img :src="preview" />
      </div>
    </div>
    <div class="grey-text text-left w100 mt20">
      <div class="dark-grey bold-text f20">第4步</div>
      <div class="mt8"> 請選擇此任務的招募起始時間：</div>
      <div>
        <b-form-datepicker id="startDate" v-model="startDate" placeholder="尚未選擇起始時間" locale="zh"></b-form-datepicker>
      </div>
    </div>
    <div class="grey-text text-left w100 mt20">
      <div class="dark-grey bold-text f20">第5步</div>
      <div class="mt8"> 請選擇此任務的招募結束時間：</div>
      <div>
        <b-form-datepicker id="endDate" v-model="endDate" placeholder="尚未選擇結束時間" locale="zh"></b-form-datepicker>
      </div>
    </div>
    <div class="grey-text text-left w100 mt20">
      <div class="dark-grey bold-text f20">第6步</div>
      <div class="mt8"> 請輸入您要作為公開發佈此任務所顯示的任務名稱：</div>
      <div>
        <input class="task-name-input grey-text mt12 f16" />
      </div>
    </div>
    <div class="grey-text text-left w100 mt20">
      <div class="dark-grey bold-text f20">第7步</div>
      <div class="mt8"> 請為您的標註任務加上任務說明：</div>
      <div>
        <input class="task-name-input grey-text mt12 f16" />
      </div>
    </div>

    <div class="w100 justify-center-row">
      <div class="next-page-button" @click="nextPage">
        <div class="white-text f20 bold-text">下一階段</div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "TaskSettingPage",
  data() {
    return {
      preview: null,
      image: null,
      startDate: '',
      endDate: '',
    }
  },
  methods: {
    previewImage (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    nextPage() {
      this.$router.push('/Task-example')
    }
  },
  mounted() {
    const title = this.$route.meta.title
    this.$emit("setTitle", title)
  }
}
</script>

<style>
#taskSettingPage {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 35px;
  flex-wrap: wrap;
}
.text-center {
  text-align: center;
}
.task-type-button {
  background: rgb(0, 195, 0);
  padding: 10px 20px;
  margin: 10px;
  border-radius: 10px;
  color: white;
  box-shadow: 2px 2px 3px rgb(0, 0, 0, 0.16);
}
.task-name-input {
  border-bottom: 1px solid rgb(156, 156, 156);
  outline: none;
  width: 100%;
}
.upload-button-input {
  font-size: 15px;
}
.upload-preview>img {
  width: 100%;
}
.f20 {
  font-size: 20px;
}
.mt20 {
  margin-top: 20px;
}
.next-page-button {
  width: 180px;
  height: 42px;
  border-radius: 30px;
  background: rgb(0, 195, 0);

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  box-shadow: 1px 3px 2px rgb(0, 0, 0, 0.13);

  margin-top: 40px;
}
</style>