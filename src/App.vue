<template>
  <div id="app">
    <!-- <div class="grey-back" /> -->
    <Header :title="title" @openNav="openAndCloseNav" />
    <div class="white-back">
      <router-view @setTitle="setTitle" ></router-view>
    </div>
    <transition name="slide-fade">
      <nav-page v-if="isOpen" @closeNav="openAndCloseNav" />
    </transition>
  </div>
</template>

<script>
import Header from '../src/components/Header'
import NavPage from '../src/components/NavPage'

export default {
  name: 'App',
  components: {
    Header,
    NavPage
  },
  data () {
    return {
      title: '',
      isOpen: false
    }
  },
  methods: {
    openAndCloseNav() {
      this.isOpen = !this.isOpen
    },
    setTitle() {
      this.title = this.$route.meta.title
    }
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

.slide-fade-enter-active {
  transition: all .3s ease;
  opacity: 30%;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}


</style>
