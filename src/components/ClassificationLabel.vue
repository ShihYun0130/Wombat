<template>
  <div class="classification">
    <div class="header">
      <i>
        <img class="small-icon" src="../assets/icons/compare-24px.svg">
      </i>
      <span>
        <h1 class="taskName p1">
          {{ taskName }}
          <span class="emph">{{currentPage}}</span>
          <span>/{{totalPage}}</span>
        </h1>
      </span>
    </div>

    <h3 class="p2">
        請問下列圖片哪些屬於
        <span class="emph">{{selectedClass}}</span>
        <span>?</span>
    </h3>
    <SelectableImageCard :imgList="imgList" :rows="2"/>
    <div>
      <button class="btn-lg" type="submit">下一題
      <i>
        <img src="../assets/icons/arrow_circle_down-24px.svg">
      </i>
      </button>
    </div>


  </div>
</template>

<script>
import SelectableImageCard from './SelectableImageCard.vue'
// import axios from "axios"

export default {
  name: 'Classification',
  components: {
    SelectableImageCard
  },
  props: {
    msg: String,
    taskName: String,
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
    }
  },
  mounted() {
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
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .emph{
    color:rgb(0,195,0)
  }
  .p1{
    color:rgb(82, 82, 82)
  }
  .p2{
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
  h3 {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .btn-lg{
    display: flex;
    justify-items: center;
    align-content: center;
    cursor: pointer;
    border:0;
    border-radius:30pt;
    background-color:rgb(0,195,0);
    font-size: 20pt;
    color: white;
    padding: 8pt 18pt;
    font-weight: bold;
    text-align: center;
  }
  .button-lg:hover{
    background-color:rgb(0, 149, 0);
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
</style>
