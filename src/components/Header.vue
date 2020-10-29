<template>
  <div id="header">
    <img :src="menuIcon" class="menu-icon" @click="openNav" />
    <div class="title">{{ title }}</div>
    <div class="fake-top-right"></div>
  </div>
</template>

<script>
import menuIcon from '../assets/icons/menu.png'

export default {
  name: "Header",
  props: {
    title: String
  },
  data() {
    return {
      menuIcon
    }
  },
  methods: {
    openNav() {
      this.$emit("openNav")
    }
  }
}
</script>

<style>
#header {
  height: 12%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 21px;
}

.title {
  font-size: 30px;
  font-weight: bold;
  color: rgb(51, 51, 51);
}

.menu-icon {
  width: 50px;
  height: auto;
}

.fake-top-right {
  width: 50px;
  height: auto;
  background: transparent;
}
</style>