<template>
  <div id="taskSettingPage">
    <div class="dark-grey bold-text f20 justify-center-row w100">基本資料設定</div>
    <div class="horizontal-line"></div>
    <div class="grey-text text-left">
      <div class="dark-grey bold-text f20">第1步</div>
      <div class="mt8"> 請選擇要上傳的任務類別：</div>
      <div class="justify-center-row">
        <div class="task-type-button" :class="{ isSelected: isImageLabel }" @click="selectImageLabel">圖片分類</div>
        <div class="task-type-button" :class="{ isSelected: isTextLabel }" @click="selectTextLabel">文字分類</div>
      </div>
    </div>
    <div class="grey-text w100 text-left mt20">
      <div class="dark-grey bold-text f20">第2步</div>
      <div class="mt8"> 請輸入您要作為公開發佈此任務所顯示的企業或團隊名稱：</div>
      <div>
        <input v-model="taskOwner" class="task-name-input grey-text mt12 f16" />
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
        <b-form-datepicker id="startDate" v-model="taskStartDate" placeholder="尚未選擇起始時間" locale="zh"></b-form-datepicker>
      </div>
    </div>
    <div class="grey-text text-left w100 mt20">
      <div class="dark-grey bold-text f20">第5步</div>
      <div class="mt8"> 請選擇此任務的招募結束時間：</div>
      <div>
        <b-form-datepicker id="endDate" v-model="taskEndDate" placeholder="尚未選擇結束時間" locale="zh"></b-form-datepicker>
      </div>
    </div>
    <div class="grey-text text-left w100 mt20">
      <div class="dark-grey bold-text f20">第6步</div>
      <div class="mt8"> 請輸入您要作為公開發佈此任務所顯示的任務名稱：</div>
      <div>
        <input v-model="taskTitle" class="task-name-input grey-text mt12 f16" />
      </div>
    </div>
    <div class="grey-text text-left w100 mt20">
      <div class="dark-grey bold-text f20">第7步</div>
      <div class="mt8"> 請為您的標註任務加上任務說明：</div>
      <div>
        <input v-model="taskDescription" class="task-name-input grey-text mt12 f16" />
      </div>
    </div>

    <div class="grey-text text-left w100 mt20">
      <div class="dark-grey bold-text f20">第8步</div>
      <div class="mt8"> 請輸入此任務的單位價格（元/筆）：</div>
      <div>
        <input v-model="taskPayRule" class="task-name-input grey-text mt12 f16" />
      </div>
    </div>
    <div class="grey-text text-left w100 mt20">
      <div class="dark-grey bold-text f20">第9步</div>
      <div class="mt8"> 請輸入標註員可以獲得報酬所需完成的最少資料筆數：</div>
      <div>
        <input v-model="taskLeastPayLimitPage" class="task-name-input grey-text mt12 f16" />
      </div>
    </div>

    <div class="w100 justify-center-row">
      <div class="next-page-button" @click="nextPage">
        <div class="white-text f20 bold-text">下一階段</div>
      </div>
    </div>

    

    <!-- <div id="screenshot"></div> -->
    
  </div>
</template>

<script>
import html2canvas from 'html2canvas'

export default {
  name: "TaskSettingPage",
  data() {
    return {
      preview: null,
      image: null,
      taskOwner: '',
      taskType: '',
      taskIcon: '',
      taskStartDate: '',
      taskEndDate: '',
      taskTitle: '',
      taskDescription: '',
      taskPayRule: '',
      taskLeastPayLimitPage: '',
      isImageLabel: false,
      isTextLabel: false,
      isError: true
    }
  },
  methods: {
    selectImageLabel() {
      this.isImageLabel = true
      this.isTextLabel = false
      this.taskType = 'classification'
      console.log('image label')
    },
    selectTextLabel() {
      this.isTextLabel = true
      this.isImageLabel = false
      this.taskType = 'ner'
      console.log('text label')
    },
    async convertFilesToString(file) {
      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
      console.log('setting base', await toBase64(file))
      return await toBase64(file);
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
    nextPage() {
      if (this.taskOwner === '' || this.taskType === '' || this.taskIcon === '' || this.taskStartDate === '' || this.taskTitle === '' || this.taskDescription === '' || this.taskPayRule === '' || this.taskLeastPayLimitPage === '') {
        this.$toasted.show('請確認所有欄位都已完整填寫', {
          position: 'bottom-center',
          type: 'error',
          duration: 3000
        })
        return
      }
      this.$store.commit('setTaskSettingInfo', {
        taskOwner: this.taskOwner,
        taskType: this.taskType,
        taskIcon: this.taskIcon,
        taskStartDate: this.taskStartDate,
        taskEndDate: this.taskEndDate,
        taskTitle: this.taskTitle,
        taskDescription: this.taskDescription,
        taskPayRule: this.taskPayRule,
        taskLeastPayLimitPage: this.taskLeastPayLimitPage,
      })
      this.$router.push('/Task-upload')
    },
    shot() {
      html2canvas(document.querySelector("#taskSettingPage")).then(canvas => {
        console.log('canvas', canvas.toDataURL())
        document.getElementById('screenshot').appendChild(canvas)
      });
    }
  },
  mounted() {
    const title = this.$route.meta.title
    this.$emit("setTitle", title)
    console.log('screenshot', this.$store.state.sampleScreenshot)
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
  box-shadow: 3px 3px 4px rgb(0, 0, 0, 0.16);
}
.isSelected {
  filter: brightness(80%);
  box-shadow: 0px 0px 0px rgb(0, 0, 0, 0.16);
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