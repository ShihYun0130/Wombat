<template>
  <div class="justify-center-column p26">
    <div id="captureRange">
      <div class="task-header">
        <!-- <i>
          <img class="small-icon" src="../assets/icons/compare-24px.svg">
        </i> -->
        <span>
          <div class="dark-grey bold-text f20">
            {{ taskTitle }}
          </div>
        </span>
      </div>

      <div class="p2">
          請問下列圖片哪些包含
          <span class="emph">{{selectedClass}}</span>
          <span>?</span>
      </div>

      <SelectableImageCard :imgList="labelList"/>
    </div>

    <div v-if="!isExample" style="width: 100%;">
      <div class="button-right">
        <button class="btn-lg" type="submit" @click="onSubmitAns(taskType, taskId, taskTitle, currentPage+1, totalPage)">下一題
        <span style="margin-left:6px; margin-top:-2px;">
          <i class="inner-button-icon">
            <img src="../assets/icons/arrow_circle_down-24px.svg">
          </i>
        </span>
        </button>
      </div>
    </div>

    <div  v-else class="w100 justify-center-row">
      <div class="next-page-button" @click="nextPage">
        <div class="white-text f20 bold-text">下一步</div>
      </div>
    </div>

  </div>
</template>

<script>
import SelectableImageCard from './SelectableImageCard.vue'
import axios from "axios"
import html2canvas from 'html2canvas'

export default {
  name: 'Classification',
  inject: ["reload"],
  components: {
    SelectableImageCard
  },
  props: {
    msg: String,
  },
  data() {
    return{
        targetClass: [],
        selectedClass:"",
        currentPage:0,
        totalPage:0,
        taskTitle: "",
        labelList:[],
        taskId:"",
        taskType:"",
        isExample: false,
        userProfile: {}
    }
  }, 
  computed: {
    args: function() {
      const selectedList = this.$store.state.selectImageList;
      var parsedobj = JSON.parse(JSON.stringify(selectedList));
      var output = [];
      for(var item of parsedobj){
        output.push(item.labelId);
        this.$store.commit('pushToAnswerIdList', item.labelId);
      }
      return {
        userId: "",
        classification: this.selectedClass,
        labelIdList: output,
        taskId: this.taskId
      };
    }
  },
  methods: {
    onSubmitAns(taskType, taskId, taskTitle, currentPage, totalPage){
      console.log(this.args);
      axios
      .post('http://140.112.107.210:8000/saveAnswer',this.args)
      .then(response => console.log(response))
      .catch(function (error) { 
        console.log(error);
      });

      if(currentPage <= totalPage){
        this.$router.push({ path: '/classificationLabel', query: { taskType, taskId, taskTitle, currentPage, totalPage}})
        this.reload();
      }
      else{
        this.$router.push({ path: '/Label-result', query: { taskType, taskId, taskTitle}})
      }
    },
    async queryTaskInfo(){
      // loading page
      let loader = this.$loading.show({
        // Optional parameters
        canCancel: true,
        onCancel: this.onCancel,
      });
      //get all class
      const response = await axios.post('http://140.112.107.210:8000/task/getQuestion', 
      {
          taskId: this.taskId,
          userId: "userId01",
      });
      // console.log(response.data.data);
      this.targetClass = response.data.data;
      const response2 = await axios.post('http://140.112.107.210:8000/task/getLabel', 
      {
          taskId: this.taskId,
          taskType: "classification",
          userId: "userId01",
          labelCount: 2,
      });
      // console.log(response2.data.data);
      // this.labelId = response2.data.data.label.labelId;
      this.labelList = response2.data.data.labelList;
      console.log(this.labelList);
      // console.log("labelId",this.labelId);
      this.selectedClass = this.targetClass[this.currentPage];
      loader.hide();
    },
    nextPage() {
      html2canvas(document.querySelector("#captureRange")).then(canvas => {
        console.log('canvas', canvas.toDataURL())
        const base64String = canvas.toDataURL()
        this.$store.commit('setSampleScreenshot', base64String)
        this.$router.push('/Task-example')
      });
      
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from.name
    })
  },
  mounted() {
    console.log('prevRoute', this.prevRoute);

    // LIFF login check
    // if (!this.$store.state.isAuthenticated) {
    //   console.log('classLabelPage dispatch')
    //   this.$router.push('/')
    //   // await this.$store.dispatch('getProfile')
    // } else {
    //   console.log('profile in classLabelPage', this.$store.state.userProfile)
    //   this.userProfile = this.$store.state.userProfile
    // }

    if (this.prevRoute === "TaskUploadPage") {
      this.isExample = true
      const title = this.$route.meta.title;
      this.$emit("setTitle", title);
      this.selectedClass = this.$store.state.labeledDataList[0].category
      this.labelList.push({ 
        imagePath: this.$store.state.labeledDataList[0].labeledData,
        labelId: 0
      })
      this.labelList.push({ 
        imagePath: this.$store.state.unlabeledDataList[0],
        labelId: 1
      })
      this.$nextTick(() => {
        html2canvas(document.querySelector("#captureRange")).then(canvas => {
          console.log('canvas', canvas.toDataURL())
          const base64String = canvas.toDataURL()
          this.$store.commit('setSampleScreenshotOne', base64String)
        });
      })
    } else {
      const title = this.$route.meta.title;
      this.taskType = this.$route.query.taskType;
      this.taskTitle = this.$route.query.taskTitle;
      this.taskId = this.$route.query.taskId;
      this.currentPage = parseInt(this.$route.query.currentPage);
      this.totalPage = parseInt(this.$route.query.totalPage);
      var customTitle = title+" <span style=\"color:rgb(0, 195, 0)\">"+this.currentPage+"</span> <span style=\"color:rgb(156, 156, 156)\">/"+this.totalPage+"</span>";
      this.$emit("setTitle", customTitle);
      this.queryTaskInfo();
    }

    // this.selectedClass = "狗";
    // axios
    //   .get('https://www.runoob.com/try/ajax/json_demo.json')
    //   .then(response => (this.SelectedClass = response))
    //   .catch(function (error) { 
    //     console.log(error);
    //   });
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .task-header {
    display: flex;
    justify-content: center;
  }
  .emph{
    color:rgb(0,195,0)
  }
  .p1{
    color:rgb(82, 82, 82)
  }
  .p2{
    font-weight: bold;
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
    color:rgb(172, 172, 172)
  }
  .small-icon {
    width: 14pt;
    margin-right: 4px;
  }
  .taskName {
    font-size: 15pt;
    margin-top:8px;
  }
  .btn-lg{
    display: flex;
    justify-items: center;
    align-content: center;
    cursor: pointer;
    border:0;
    border-radius:30px;
    background-color:rgb(0,195,0);
    font-size: 26px;
    color: white;
    padding: 4pt 16px;
    font-weight: bold;
    text-align: center;
    padding-top: 10px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.24);
  }
  .btn-lg:hover{
    background-color:rgb(0, 149, 0);
    box-shadow: 0 4px 6px 0 rgba(0,0,0,0.24);
  }
  .inner-button-icon {
    margin-bottom: 5px;
  }
  .p26 {
    padding: 26px;
  }
  .button-right {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
</style>
