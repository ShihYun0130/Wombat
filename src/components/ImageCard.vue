<template>
  <div class="imageCard">
    <div v-for="i in rows" :key="i" class="row">
        <div class="container">
            <div v-for="item in imgList" :key="item.path">
            <img class="label_img" :src="item.path">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios"
export default {
  name: 'ImageCard',
  props: {
    imgList: Array,
    rows: Number,
  },
  mounted() {
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
.row{
  margin-bottom: 10px;
}
.label_img {
  border-radius: 10px;
}
.container{
  display: flex;
  justify-content: center;
  width: 70%;
  /* height: 150px; */
  margin: auto;
}
.container div{
  display: flex;
  margin-right: 10px;
}
.container img{
  height: 100%;
  width: 100%;
}
</style>
