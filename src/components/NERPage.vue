<template>
  <div id="NERTaskPage" class="justify-center-column p26" >
    <div class="task-header">
      <i>
        <img class="small-icon" style="margin-top:3px;" src="../assets/icons/textLabel.png">
      </i>
      <span>
        <div class="dark-grey bold-text f20">
          {{ taskTitle }}
        </div>
      </span>
    </div>

    <div class="p2">
        請標出下列文字分別屬於
        <span v-for="(item, index) in targetClass" :key="index" :style="{color:colorList[index]}" style="margin-right: 10px;">{{item}}</span>
        <span>的類別</span>
    </div>
    <div class="bold-text f18"> 你所選擇的 <span :style="{color: colorList[focusClass]}">{{targetClass[focusClass]}}</span> 為:</div>
    <div class="displayBlock" style="height: 40px" v-if="!currentSelectedText"></div>
    <div class="displayBlock" :style="{color: colorList[focusClass], border: '3px solid '+ colorList[focusClass]}" v-if="currentSelectedText">{{currentSelectedText}}</div>
    <div v-html="targetHtml" class='selectableText'></div>
    <div class="row-display">
      <div v-for="(item, index) in targetClass" :key="index">
        <div class="focusButton" :class="[selectedObject[item].color, {focus: focusClass == index && selectedObject[item].isEdit}]" style="margin-right: 10px;" @click="onClick(index)">{{item}}</div>
      </div>
    </div>
    <div style="width: 100%;">
      <div class="button-right">
        <button v-if="currentPage < totalPage" class="btn-lg" type="submit" @click="onSubmitAns(taskType, taskId, taskTitle, currentPage+1, totalPage)">下一題
        <span style="margin-left:6px; margin-top:-2px">
          <i class="inner-button-icon">
            <img src="../assets/icons/arrow_circle_down-24px.svg">
          </i>
        </span>
        </button>
        <button v-if="currentPage == totalPage" class="btn-lg red" type="submit" @click="onSubmitAns(taskType, taskId, taskTitle, currentPage+1, totalPage)">上傳答案
          <span style="margin-left:6px; margin-top:-2px">
            <i class="inner-button-icon">
              <img src="../assets/icons/arrow_circle_down-24px.svg">
            </i>
          </span>
        </button>
      </div>
    </div>


  </div>
</template>

<script>
import axios from "axios"
import $ from 'jquery'
import Vue from 'vue';
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
// Init plugin
Vue.use(Loading);

export default {
  name: 'NERTaskPage',
  inject: ["reload"],
  props: {
    msg: String,
  },
  data: function(){
    return{
        targetClass:[],
        focusClass: 0,
        selectedObject:{},
        currentSelectedText:"",
        currentPage:0,
        totalPage:0,
        taskType: "",
        taskId: "",
        taskTitle: "",
        transactionId: "",
        selectedText: "",
        labelId:"",
        targetParagraph: "",
        targetHtml: "",
        colorList: ["#66C7F4", "#527cbb", "#345995", "#98A886", "#023C40", "#042A2B"],
        colorClassList: ["col1", "col2", "col3", "col4", "col5", "col6"],
        userProfile: {}
    }
  },
  computed: {
    selectableTexthtml: function() {
      return "<div ref='selectableText' class='selectableText'>" + this.targetParagraph + "</div>";
    },
    output: function() {
      var ans = {};
      for(var target of this.targetClass){
        ans[target] = this.selectedObject[target].selectedText;
      }
      if(this.currentPage == 1){
        return {
          taskType: "ner",
          userId: "userId01",
          taskId: "taskId02",
          labelId: this.labelId,
          NERObject: ans,
        };
      }
      else{
        return {
          taskType: "ner",
          userId: "userId01",
          taskId: "taskId02",
          labelId: this.labelId,
          NERObject: ans,
          transactionId: JSON.parse(localStorage.getItem('transactionId')),
        };
      }
    }
  },
  methods: {
      async onSubmitAns(taskType, taskId, taskTitle, currentPage, totalPage){
        this.$store.commit('pushToAnswerIdList', this.labelId);
        const response = await axios.post('http://140.112.107.210:8000/saveAnswer', this.output)
        if (response.data.success) 
        {
          console.log(response);
          console.log('LocaltransactionId', JSON.parse(localStorage.getItem('transactionId')));
          if(response.data.data && this.currentPage == 1) {
            this.transactionId = response.data.data.transactionId;
            await localStorage.setItem('transactionId', JSON.stringify(response.data.data.transactionId));
            console.log('transactionId', JSON.parse(localStorage.getItem('transactionId')));
          }
        }


        if(currentPage <= totalPage){
          this.$router.push({ path: '/NERTaskPage', query: { taskType, taskId, taskTitle, currentPage, totalPage}})
          this.reload();
        }
        else{
          this.$router.push({ path: '/Label-result', query: { taskType, taskId, taskTitle}})
        }
      },
      selectedHtml: function(entityName, selectedText, entityClass) {
        return `<button class='selectedTextBlock ${entityClass}' id="${entityName}"> ${selectedText} </button>`
      },
      // Function to get the Selected Text  
      getSelectedText() { 
        var target = this.targetClass[this.focusClass];
        if(this.selectedObject[target].selectedText != ""){
          alert("一個實體只能對應到一段文字，如果要變更請先刪除原圈選文字後再繼續");
          return false;
        }
        else if (this.focusClass >= this.targetClass.length){
          return false;
        }
        // window.getSelection 
        if (window.getSelection) { 
            this.selectedObject[target].selectedText = window.getSelection().toString()
        } 
        // document.getSelection 
        else if (document.getSelection) { 
            this.selectedObject[target].selectedText = document.getSelection().toString();
        } 
        // document.selection 
        else if (document.selection) { 
            this.selectedObject[target].selectedText = document.selection.createRange().text;
        } else{
          return false; 
        }
        if((/^ *$/.test(this.selectedObject[target].selectedText)))
        {
          return false;
        }
        this.targetHtml = this.targetHtml.replace(this.selectedObject[target].selectedText, this.selectedHtml(target, this.selectedObject[target].selectedText, this.selectedObject[target].color));
        return true;
      },
      onClick(targetIndex){
        this.focusClass = targetIndex;
        var target = this.targetClass[targetIndex];
        if(this.selectedObject[target].isEdit){
          if(targetIndex < this.targetClass.length)
            var isSuccess = this.getSelectedText();
          this.selectedObject[target].isEdit = false;
          if(this.focusClass < this.targetClass.length - 1 && isSuccess){
            this.focusClass += 1;
            this.selectedObject[this.targetClass[this.focusClass]].isEdit = true;
            this.currentSelectedText="";
          }
        }
        else{
          this.selectedObject[target].isEdit = true;
        }
        this.$forceUpdate();
      },
      onDeleteSelection(entityName){
        this.targetHtml = this.targetHtml.replace(this.selectedHtml(entityName, this.selectedObject[entityName].selectedText, this.selectedObject[entityName].color), this.selectedObject[entityName].selectedText);
        this.selectedObject[entityName].selectedText = "";
        this.$forceUpdate();
      },
      setInitialSelection(){
        var i;
        var cnt = 0;
        for(i of this.targetClass){
          this.selectedObject[i] = {
            selectedText:"",
            color:this.colorClassList[cnt],
            index: cnt++,
            isEdit: false,
          };
        }
        this.selectedObject[this.targetClass[0]].isEdit = true;
      },
      async queryTaskInfo(){
        // loading page
        let loader = this.$loading.show({
          // Optional parameters
          canCancel: true,
          onCancel: this.onCancel,
          opacity: 1,
        });
        //get all entitys
        const response = await axios.post('http://140.112.107.210:8000/task/getQuestion', 
        {
            taskId: this.taskId,
            userId: "userId01",
        });
        console.log(response.data.data);
        this.targetClass = response.data.data;
        //get paragraph
        const response2 = await axios.post('http://140.112.107.210:8000/task/getLabel', 
        {
            taskId: this.taskId,
            taskType: "ner",
            userId: "userId01",
            labelCount: 1,
            page: this.currentPage,
        });
        console.log(response2.data.data);
        this.labelId = response2.data.data.label.labelId;
        this.targetParagraph = response2.data.data.label.targetParagraph;
        console.log("labelId",this.labelId);
        document.addEventListener('selectionchange',() => {
            this.currentSelectedText = window.getSelection().toString();
        });
        this.targetHtml = this.selectableTexthtml;
        document.addEventListener("click", function(event){
          if(event.target.id != ""){
            if ($(event.target).hasClass('selectedTextBlock')){
              this.onDeleteSelection(event.target.id);
            }
          }
        }.bind(this));
        this.setInitialSelection();
        loader.hide();
      }
  },
  async mounted() {
    let loader = this.$loading.show({
      color: 'rgb(0, 195, 0)',
      loader: 'dots',
      opacity: 1
    });

    // LIFF login check
    // if (!this.$store.state.isAuthenticated) {
    //   console.log('NERPage dispatch')
    //   this.$router.push('/')
    //   // await this.$store.dispatch('getProfile')
    // } else {
    //   console.log('profile in NERPage', this.$store.state.userProfile)
    //   this.userProfile = this.$store.state.userProfile
    // }

    const title = this.$route.meta.title;
    this.taskTitle = this.$route.query.taskTitle;
    this.taskId = this.$route.query.taskId;
    this.taskType = this.$route.query.taskType;
    this.currentPage = parseInt(this.$route.query.currentPage);
    this.totalPage = parseInt(this.$route.query.totalPage);
    var customTitle = title+" <span style=\"color:rgb(0, 195, 0)\">"+this.currentPage+"</span> <span style=\"color:rgb(156, 156, 156)\">/"+this.totalPage+"</span>";
    this.$emit("setTitle", customTitle);
    await this.queryTaskInfo();

    loader.hide();
  }
}

</script>

<style>
  .task-header {
    display: flex;
    justify-content: center;
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
  .p26 {
    padding: 26px;
  }
  .button-right {
    display: flex;
    justify-content: flex-end;
    margin-top: 60px;
  }
  .selectableText {
    font-size: 20px;
    -webkit-user-select: text;  /* Chrome all / Safari all */
    -moz-user-select: text;     /* Firefox all */
    -ms-user-select: text;      /* IE 10+ */
    user-select: text;          /* Likely future */   
    margin-bottom: 20px; 
  }
  .f18{
    font-size:18px;
  }
  .selectedTextBlock{
    background-color: rgb(0, 195, 0);
    font-weight: bold;
    font-size: 20px;
    color: white;
    padding: 5px 10px;
    border-radius: 6px;
    margin: 5px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.253),0 5px 6px 0 rgba(0, 0, 0, 0.137);
    transition: 1s;
  }
  .focusButton{
    background-color: rgb(0, 195, 0);
    font-weight: bold;
    font-size: 20px;
    color: white;
    padding: 5px 10px;
    border-radius: 6px;
    margin: 5px;
    transition: 1s;
  }
  .focus{
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.589),0 5px 6px 0 rgba(0, 0, 0, 0.137);
    filter: brightness(110%);
    transition: 1s;
  }
  .displayBlock {
    font-weight: bold;
    font-size: 20px;
    padding: 2px 5px;
    border-radius: 4px;
    margin: 15px;
  }
  .row-display{
    display: flex;
    align-items: center;
  }
  .blue{
    background-color: rgb(185, 65, 255);
  }
  .red{
    background-color: rgb(255, 78, 78);
  }
  .emph{
    color: rgb(0, 195, 0);
  }
  .col1{
    background-color: #66C7F4;
  }
  .col2{
    background-color: #527cbb;
  }
  .col3{
    background-color: #345995;
  }
  .col4{
    background-color: #98A886;
  }
  .col5{
    background-color: #023C40;
  }
  .col6{
    background-color: #042A2B;
  }
</style>