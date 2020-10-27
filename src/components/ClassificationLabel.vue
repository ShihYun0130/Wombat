<template>
  <div class="classification">
    <div class="header">
      <i>
        <img class="small-icon" src="../assets/icons/compare-24px.svg">
      </i>
      <span>
        <h1 class="taskName">
          {{ taskName }}
        </h1>
      </span>
    </div>

    <h3>
        請問下列圖片哪些屬於
        <span style="color:rgb(0,195,0)">{{selectedClass}}</span>
        <span>?</span>
    </h3>
    <ImageCard :imgList="imgList" :rows="2"/>


  </div>
</template>

<script>
import ImageCard from './ImageCard.vue'
// import axios from "axios"

export default {
  name: 'Classification',
  components: {
    ImageCard
  },
  props: {
    msg: String,
    taskName: String,
  },
  data: function(){
    return{
        imgList:[
            {path:require('../assets/img/dog.png')},
            {path:require('../assets/img/cat.png')},
        ],
        selectedClass:'狗',
        rows:2,
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
</style>
