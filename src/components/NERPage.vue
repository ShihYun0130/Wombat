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
        請問下列文字哪些屬於
        <span class="emph">{{targetClass}}</span>
        <span>?</span>
    </div>
    <div ref="selectableText" class="selectableText">{{targetParagraph}}</div>
    <div class="bold-text f18"> 你所選擇的 <span class="emph">{{targetClass}}</span> 為:</div>
    <div v-for="(item, index) in targetClass" :key="index" class="row-display">
      <div class="bold-text f18" style="margin-right: 10px;" @click="onEditItem(selectedObject[item].index)">{{item}}</div>
      <div class="selectedTextBlock" v-if="selectedObject[item].isShow" @click="saveSelected">
        {{selectedObject[item].selectedText}}
        <span><img class="small-icon" src="../assets/icons/delete.svg"></span>
      </div>
    </div>
    <!-- <button class="start-task-button" type="button" @click="saveSelected">
      <div class="white-text f26 bold-text">儲存</div>
    </button> -->
    <div style="width: 100%;">
      <div class="button-right">
        <button class="btn-lg" type="submit" @click="onSubmitAns">下一題
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

export default {
  name: 'NERTaskPage',
  props: {
    msg: String,
  },
  data: function(){
    return{
        targetClass:['人名', '企業名', '時間', '地點'],
        focusClass: 0,
        selectedObject:{},
        currentPage:1,
        totalPage:10,
        taskTitle: "",
        selectedText: "",
        targetParagraph: "Mark Elliot Zuckerberg is an American media magnate, internet entrepreneur, and philanthropist. He is known for co-founding Facebook, Inc in 2004.",
    }
  },
  computed: {
    // selectedObject: function() {

    // }
  },
  methods: {
      onSubmitAns(){
        axios
        .post('http://140.112.107.210:8000/saveAnswer',{
          userId: "",
          classification: this.targetClass,
          answer_picture: this.selectedObject,
          taskId: "1"
        })
        .then(response => console.log(response))
        .catch(function (error) { 
          console.log(error);
        });
      },
      // Function to get the Selected Text  
      getSelectedText() { 
        var target = this.targetClass[this.focusClass];
        // window.getSelection 
        if (window.getSelection) { 
            this.selectedObject[target].selectedText = window.getSelection().toString();
            this.selectedObject[target].isShow = true;
            console.log(this.selectedObject[target].isShow);
        } 
        // document.getSelection 
        else if (document.getSelection) { 
            this.selectedObject[target].selectedText = document.getSelection().toString();
            this.selectedObject[target].isShow = true;
        } 
        // document.selection 
        else if (document.selection) { 
            this.selectedObject[target].selectedText = document.selection.createRange().text;
            this.selectedObject[target].isShow = true;
        } else{
          // this.selectedObject[target].isShow = false;
          return; 
        }
        // console.log(this.selectedText.toString());
        // console.log(this.selectedObject)
        if((/^ *$/.test(this.selectedObject[target].selectedText)))
          this.selectedObject[target].isShow = false;
        this.$forceUpdate();
      },
      saveSelected(){
        this.focusClass += 1;
        // while (this.selectedObject[this.targetClass[this.focusClass]]!=""){
        //   this.focusClass += 1;
        // }
      },
      onEditItem(targetIndex){
        this.focusClass = targetIndex;
      },
      setInitialSelection(){
        var i;
        var cnt = 0;
        for(i of this.targetClass){
          this.selectedObject[i] = {
            selectedText:"",
            color:"",
            index: cnt++,
            isShow: false,
          };
        }
      }
  },
  mounted() {
    const title = this.$route.meta.title;
    var customTitle = title+" <span style=\"color:rgb(0, 195, 0)\">"+this.currentPage+"</span> <span style=\"color:rgb(156, 156, 156)\">/"+this.totalPage+"</span>";
    this.taskTitle = this.$route.query.taskTitle;
    this.$emit("setTitle", customTitle);

    document.addEventListener('selectionchange',() => {
        this.getSelectedText();
    });

    this.setInitialSelection();
  }
}

</script>

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
  .p26 {
    padding: 26px;
  }
  .button-right {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    position: fixed;
    bottom: 60px;
    right:40px;
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
    margin-top: 16px;
    margin-bottom: 16px;
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
</style>