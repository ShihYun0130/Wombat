<template>
  <div id="task-upload-page">
    <div class="dark-grey bold-text f20 justify-center-row w100">上傳任務類別與圖檔</div>
    <div class="horizontal-line"></div>

    <div class="grey-text w100 text-left mt20">
      <div class="dark-grey bold-text f20">第1步</div>
      <!-- <div class="justify-start-row"> -->
        <div class="mt8"> 請輸入類別數量：</div>
          <div class="align-end-row">
            <input v-model="categoryNum" @change="changeCategoryNum" class="task-name-input grey-text mt12 f16" />
            <div class="category-number-button f14" :class="{ isClicked: isCheck }" @click="checkCategoryNum">確定</div>
            <div class="reset-button category-number-button f14" :class="{ isClicked: !isCheck }" @click="resetCategoryNum">重設</div>
          </div>
        </div>
        <div class="hint-text" v-if="!isNum">請輸入一個小於 10 的數字</div>
    <!-- </div> -->

    <div class="align-start-column text-left w100 mt20" v-if="isCheck">
      <div class="dark-grey bold-text f20">第2步</div>

      <div v-for="(idx, num) in categoryNumList" :key="idx">
        <div class="align-end-row w100 flex-nowrap">
          <div class="grey-text f16 text-left mt8"> 類別名稱：</div>
          <input v-model="categories[num]" class="task-name-input grey-text mt12 f16 w65" />
        </div>
        <div class="">
          <div class="grey-text f16 text-left mt8"> 上傳此類別範例圖檔：</div>
          <div class="f8 mt8">
            <input class="upload-button-input" type="file" accept=".jpg, .jpeg, .png" @change="previewImage">
          </div>
          <div v-if="preview[num]" class="grey-text upload-preview mt12 w80">
            <img :src="preview[num]" />
          </div>
        </div>
      </div>
    </div>

    <div class="align-start-column text-left w100 mt20" v-if="isCheck">
      <div class="dark-grey bold-text f20">第3步</div>
      <div class="">
        <div class="grey-text f16 text-left mt8"> 上傳其他未標註圖檔：</div>
        <div class="f8 mt8">
          <input class="upload-button-input" type="file" accept=".jpg, .jpeg, .png" multiple="multiple" @change="uploadMultipleImage">
        </div>
        <div v-if="multiplePreview.length" class="justify-start-row upload-multiple-preview grey-text upload-preview mt12">
          <img v-for="item in multiplePreview" :key="item" :src="item" class="mt8" />
        </div>
      </div>
    </div>

    <div class="w100 justify-center-row" v-if="isCheck">
      <div class="next-page-button" @click="nextPage">
        <div class="white-text f20 bold-text">去示範標註動作</div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: "TaskUploadPage",
  data() {
    return {
      isCheck: false,
      categoryNum: 0,
      categoryNumList: [],
      preview: [],
      image: [],
      categories: [],
      multiplePreview: [],
      multipleImage: [],
      labeledImageStringList: [],
      unlabeledImageStringList: [],
      isNum: true,
      userProfile: {}
    }
  },
  methods: {
    checkCategoryNum() {
      if (this.isCheck) return
      if (this.categoryNum === 0 || this.categoryNum > 10 || parseFloat(this.categoryNum).toString() == "NaN") {
        this.isNum = false
        return
      }
      this.isCheck = true
      this.isNum = true
      for(var i = 0; i < this.categoryNum; i++) {
        this.categoryNumList.push(i);
      }
    },
    changeCategoryNum(event) {
      this.isCheck = false
      this.categoryNumList = []
      this.categoryNum = event.target.value
    },
    resetCategoryNum() {
      this.isCheck = false
      this.categoryNum = 0
      this.categoryNumList = []
    },
    async previewImage(event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview.push(e.target.result);
        }
        this.image.push(input.files[0]);
        reader.readAsDataURL(input.files[0]);
      }
      this.labeledImageStringList.push(await this.convertFilesToString(input.files[0]))
    },
    async uploadMultipleImage(event) {
      let input = event.target;
      let count = input.files.length;
      let index = 0;
      if (input.files) {
        while(count --) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.multiplePreview.push(e.target.result);
          }
          this.multipleImage.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index ++;
        }
      }
      Promise.all(this.multipleImage.map(file => this.convertFilesToString(file)))
      .then(value => {
        Object.keys(value).forEach(key => {
          const user = value[key]
          this.unlabeledImageStringList.push(user)
        })
      })
    },
    async convertFilesToString(file) {
      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
      return await toBase64(file);
    },
    async nextPage() {
      if (this.categories.length != this.categoryNum || this.unlabeledImageStringList.length === 0) {
        console.log('categories', this.categories.length)
        console.log('category num', this.categoryNum)
        console.log('unlabeledImageStringList', this.unlabeledImageStringList.length)
        this.$toasted.show('請確認所有欄位都已完整填寫', {
          position: 'bottom-center',
          type: 'error',
          duration: 3000
        })
        return
      }
      this.convertFilesToString(this.multipleImage[0])
      const unlabeledList = JSON.parse(JSON.stringify(this.unlabeledImageStringList))
      console.log('unlabeledList', unlabeledList)
      const labeledImage = JSON.parse(JSON.stringify(this.labeledImageStringList))
      console.log('labeledImage', labeledImage)
      const labeledList = this.categories.map((item, idx) => {
        return {category: item, labeledData: labeledImage[idx]}
      })
      console.log('labeledList', labeledList[0])

      this.$store.commit('setLabelData', {
        labeledDataList: labeledList,
        unlabeledDataList: unlabeledList
      })

      this.$router.push('/classificationLabel')
    }
  },
  mounted() {
    // LIFF login check
    if (!this.$store.state.isAuthenticated) {
      console.log('taskUploadPage dispatch')
      this.$router.push('/')
    } else {
      console.log('profile in taskUploadPage', this.$store.state.userProfile)
      this.userProfile = this.$store.state.userProfile
    }

    const title = this.$route.meta.title
    this.$emit("setTitle", title)
  }
}
</script>

<style>
#task-upload-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 35px;
  flex-wrap: wrap;
}
input, input:before, input:after {
  -webkit-user-select: initial!important;
  -khtml-user-select: initial!important;
  -moz-user-select: initial!important;
  -ms-user-select: initial!important;
  user-select: initial!important;
}
.isClicked {
  filter: brightness(70%);
  box-shadow: 0px 0px 0px rgb(0, 0, 0, 0.16);
}
.reset-button {
  background: rgb(255, 76, 76)!important;
}
.hint-text {
  font-size: 10px;
  color: rgb(255, 76, 76);
}
.category-number-button {
  margin-left: 20px;
  background: rgb(0, 195, 0);
  padding: 5px 10px;
  white-space: nowrap;
  border-radius: 5px;
  color: white;
  box-shadow: 1px 3px 3px rgb(0, 0, 0, 0.13);
}
.align-end-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
}
.flex-nowrap {
  flex-wrap: nowrap;
}
.w65 {
  width: 65%;
}
.upload-multiple-preview {
  width: 90%;
  flex-wrap: wrap;
}
.upload-multiple-preview>img {
  height: 20px;
  max-width: 20px;
}
</style>