<template>
  <div id="app">
    <!-- <div class="grey-back" /> -->
    <div v-if="this.title === ''" class="profile-img">
      <img :src="profileImgPath ? profileImgPath : profile_default" />
    </div>

    <Header :title="title" @openNav="openAndCloseNav" />
    <div class="white-back">
      <router-view @setTitle="setTitle" @setProfilePic="setProfileImgPath" v-if="isRouterAlive"></router-view>
    </div>
    <!-- <div :class="{ 'app-nav-show': isOpen, 'app-nav-hide': !isOpen }">
      <NavPage v-if="isOpen" @closeNav="openAndCloseNav" />
    </div> -->
    <transition name="slide-fade">
      <NavPage v-if="isOpen" @closeNav="openAndCloseNav" />
    </transition>
  </div>
</template>

<script>
import Header from '../src/components/Header'
import NavPage from '../src/components/NavPage'
import profile_default from './assets/icons/profile_default.png'

export default {
  name: 'App',
  components: {
    Header,
    NavPage
  },
  provide() {
    return {
      reload: this.reload
    };
  }, 
  data () {
    return {
      profile_default,
      title: '',
      isOpen: false,
      profileImgPath: '',
      isRouterAlive: true,
    }
  },
  methods: {
    openAndCloseNav() {
      this.isOpen = !this.isOpen
    },
    setTitle(title) {
      console.log('title', title)
      this.title = title
    },
    setProfileImgPath(imgPath) {
      this.profileImgPath = imgPath
      console.log('App.vue profile img', imgPath)
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  },
  mounted() {
    console.log('mounted in app')
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
  -webkit-overflow-scrolling: touch
}

.slide-fade-enter {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
  opacity: 30%;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.profile-img {
  width: 134px;
  height: 134px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 3%;
  overflow: hidden;
  border-radius: 50%;
  /* background:  rgb(190, 190, 190); */

  border: 10px solid white;
  box-shadow: 1px 5px 6px rgb(0, 0, 0, 0.16);
  z-index: 10;
}

.profile-img > img {
  display: inline;
  margin: 0 auto;
  height: 100%;
  width: auto;
}

</style>
