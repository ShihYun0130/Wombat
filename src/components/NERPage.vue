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
        <span class="emph">{{selectedClass}}</span>
        <span>?</span>
    </div>
    <div ref="selectableText" class="selectableText">{{targetParagraph}}</div>
    <div class="bold-text f18"> 你所選擇的 <span class="emph">{{selectedClass}}</span> 為:</div>
    <div class="selectedTextBlock" v-if="isShow">{{selectedText}}</div>
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
        selectedClass:'主體',
        currentPage:1,
        totalPage:10,
        taskTitle: "",
        selectedText: "",
        isShow: false,
        targetParagraph: "Mark Elliot Zuckerberg is an American media magnate, internet entrepreneur, and philanthropist. He is known for co-founding Facebook, Inc in 2004.",
    }
  }, methods: {
      onSubmitAns(){
        axios
        .post('http://140.112.107.210:8000/saveAnswer',{
          userId: "",
          classification: this.selectedClass,
          answer_picture: this.selectedText,
          taskId: "1"
        })
        .then(response => console.log(response))
        .catch(function (error) { 
          console.log(error);
        });
      },
      // Function to get the Selected Text  
      getSelectedText() { 
        // window.getSelection 
        if (window.getSelection) { 
            this.selectedText = window.getSelection();
            this.isShow = true;
        } 
        // document.getSelection 
        else if (document.getSelection) { 
            this.selectedText = document.getSelection();
            this.isShow = true;
        } 
        // document.selection 
        else if (document.selection) { 
            this.selectedText = document.selection.createRange().text;
            this.isShow = true;
        } else{
          this.isShow = false;
          return; 
        }
        // console.log(this.selectedText.toString());
        if((/^ *$/.test(this.selectedText)))
          this.isShow = false;
        this.$forceUpdate();
      },
  },
  mounted() {
    const title = this.$route.meta.title;
    var customTitle = title+" <span style=\"color:rgb(0, 195, 0)\">"+this.currentPage+"</span> <span style=\"color:rgb(156, 156, 156)\">/"+this.totalPage+"</span>";
    this.taskTitle = this.$route.query.taskTitle;
    this.$emit("setTitle", customTitle);

    document.addEventListener('selectionchange',() => {
        this.getSelectedText();
    });
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
</style>