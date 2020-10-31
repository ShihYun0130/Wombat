<template>
  <div class="justify-center-column p26" >
    <div class="task-header">
      <i>
        <img class="small-icon" src="../assets/icons/compare-24px.svg">
      </i>
      <span>
        <div class="dark-grey bold-text f20">
          {{ taskTitle }}
        </div>
      </span>
    </div>

    <div class="p2">
        請問下列圖片哪些屬於
        <span class="emph">{{selectedClass}}</span>
        <span>?</span>
    </div>
    <SelectableImageCard :imgList="imgList" :rows="2"/>
    <div style="width: 100%;">
      <div class="button-right">
        <button class="btn-lg" type="submit" @click="onSubmitAns">下一題
        <span style="margin-left:6px;">
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
import SelectableImageCard from './SelectableImageCard.vue'
import axios from "axios"

export default {
  name: 'Classification',
  components: {
    SelectableImageCard
  },
  props: {
    msg: String,
  },
  data: function(){
    return{
        imgList:[
            {src:require('../assets/img/dog.png'), id:1},
            {src:require('../assets/img/cat.png'), id:2},
        ],
        selectedClass:'狗',
        rows:2,
        currentPage:1,
        totalPage:10,
        taskTitle: "",
    }
  }, methods: {
    onSubmitAns(){
      axios
      .post('http:140.112.107.210:8000/1/saveAnswer',{
        
      })
      .then(response => console.log(response))
      .catch(function (error) { 
        console.log(error);
      });
    }
  },
  mounted() {
    const title = this.$route.meta.title;
    var customTitle = title+" <span style=\"color:rgb(0, 195, 0)\">"+this.currentPage+"</span> <span style=\"color:rgb(156, 156, 156)\">/"+this.totalPage+"</span>";
    this.taskTitle = this.$route.query.taskTitle;
    this.$emit("setTitle", customTitle);
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
