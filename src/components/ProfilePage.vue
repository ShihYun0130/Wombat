<template>
  <div id="profilePage">
    <div class="profile-name"> 陳漢威 Frank </div>
    <div class="profile-intro">
      <div class="grey-text">共完成 <span class="green-text">{{totalTaskAmount}}</span> 項公開任務</div>
      <div class="grey-text">總體評分: <span class="green-text">{{score}}</span> / 5</div>
    </div>

    <div class="horizontal-line"></div>

    <div v-for="task in taskList" :key="task.type" class="task-container">
      <img class="task-icon" :src="task.icon" />
      <div class="task-middle">
        <div class="grey-text f20">{{task.type}}</div>
        <div class="task-progress">
          <b-progress :value="task.levelPercentage" height="9px" variant="success"></b-progress>
        </div>
      </div>
      <div v-if="task.level > 0" class="green-text f20 task-level">LV.{{task.level}}</div>
      <div v-else class="grey-text f20 task-level">未標註</div>
    </div>

    <div class="go-to-task-button" @click="goToTaskPage">
      <img :src="dashboardIcon" />
      <div class="dashBoard-text">前往任務看板</div>
    </div>
  </div>
</template>

<script>
import dashboardIcon from '../assets/icons/dashboardIcon.png'

export default {
  name: "ProfilePage",
  components: {
  },
  data() {
    return {
      dashboardIcon,
      totalTaskAmount: 3,
      score: 4.2,
      taskList: [{
        icon: require('../assets/icons/classification.png'),
        type: "分類型",
        level: 2,
        levelPercentage: 30
      }, {
        icon: require('../assets/icons/textLabel.png'),
        type: "文字標註",
        level: 1,
        levelPercentage: 70
      }, {
        icon: require('../assets/icons/lock.png'),
        type: "圖文標註",
        level: 0,
        levelPercentage: 0
      }, {
        icon: require('../assets/icons/lock.png'),
        type: "問答標註",
        level: 0,
        levelPercentage: 0
      }, {
        icon: require('../assets/icons/lock.png'),
        type: "輪廓標註",
        level: 0,
        levelPercentage: 0
      }]
    }
  },
  methods: {
    goToTaskPage() {
      console.log('gototask')
      this.$router.push('/Tasks')
    }
  },
  mounted() {
    const title = ''
    const imgPath = 'https://images2.gamme.com.tw/news2/2012/31/97/p5_WnaadlKSW.jpg'
    this.$emit("setTitle", title)
    this.$emit("setProfilePic", imgPath)
  }
}
</script>

<style>
#profilePage {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  height: 82%;
  overflow: scroll;
}

.profile-name {
  font-size: 25px;
  color: rgb(51, 51, 51);
  font-weight: bold;
}

.profile-intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 150px;
  margin-top: 20px;
}

.grey-text {
  color: rgb(156, 156, 156);
  font-size: 16px;
  font-weight: bold;
}

.greyText {
  color: rgb(156, 156, 156);
  font-size: 16px;
  font-weight: bold;
}

.green-text {
  font-weight: bold;
  color: rgb(0, 195, 0);
}

.f20 {
  font-size: 20px;
}

.horizontal-line {
  width: 223px;
  height: 0px;
  border-bottom: 1px solid rgb(112, 112, 112, 0.16);
  margin: 12px;
}

.task-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  margin: 22px 0;
  width: 250px;
  height: 40%;
}

.task-middle {
  text-align: left;
  width: 100px;
}

.task-icon {
  width: 58px;
  margin-right: 15px;
}

.task-progress {
  margin-top: 8px;
}

.task-level {
  width: 60px;
  margin-left: 15px;
  text-align: left;
}

.go-to-task-button {
  width: 212px;
  height: 52px;
  border-radius: 30px;
  background: rgb(0, 195, 0);

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  box-shadow: 1px 3px 2px rgb(0, 0, 0, 0.13);

  position: fixed;
  bottom: 40px;
}

.dashBoard-text {
  font-size: 21px;
  font-weight: bold;
  color: white;
}

.go-to-task-button>img {
  width: 24px;
  margin-right: 7px;
}

#profilePage::-webkit-scrollbar {
    display: none;
}

</style>