<template>
  <div id="app">
    <!-- <div class="grey-back" /> -->
    <Header :title="title"/>
    <div class="white-back">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '../src/components/Header'

export default {
  name: 'App',
  components: {
    Header,
  },
  data () {
    return {
      title: ''
    }
  },
  mounted() {
    this.title = this.$route.meta.title
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  height: 100vh;
}
.grey-back {
  background-color: transparent;
  height: 10%;
}
.white-back {
  height: 88%;
  background-color: rgb(255, 255, 255);;
  margin: 0 21px;
  border-top-right-radius: 61px;
  border-top-left-radius: 61px;
  box-shadow: 0 3px 6px rgb(0, 0, 0, 0.16);
  overflow: scroll;
}

body {
  background: rgb(246, 246, 246);
}

body { margin: 0 !important; }
</style>
