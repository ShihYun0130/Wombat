<template>
  <div id="taskEntryPage">
    <div class="task-page-info"> 請從下方選擇任務點擊進入 </div>
    <div class="horizontal-line"></div>
    <div class="task-list-container">
      <div v-for="task in allTaskList" :key="task.id" class="task-item" @click="goToDetailPage(task.id, task.type)">
        <div v-if="task.type == 'imageLabel'" class="task-list-img-icon"></div>
        <div v-else class="task-list-text-icon"></div>
        <div class="task-list-right">
          <div class="grey-text f16">{{task.title}}</div>
          <div class="white-grey-text f14">{{task.owner}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imageLabelIcon from '../assets/icons/imgLabel.png'
import textLabelIcon from '../assets/icons/textLabelNoBg.png'

export default {
  name: "TaskEntryPage",
  data() {
    return {
      allTaskList: [{
        id: 'taskId01',
        type: "imageLabel",
        title: "CLAS - 手寫數字圖片分類",
        owner: "LINE CORP."
      }, {
        id: 'taskId01',
        type: "imageLabel",
        title: "CLAS - 毛毛蟲圖片分類",
        owner: "LINE CORP."
      }, {
        id: 'taskId01',
        type: "imageLabel",
        title: "CLAS - 鳶尾花圖片分類",
        owner: "LINE CORP."
      }, {
        id: 'taskId01',
        type: "imageLabel",
        title: "CLAS - 水草圖片分類",
        owner: "LINE CORP."
      }, {
        id: 'taskId02',
        type: "textLabel",
        title: "NER - 電台廣播語料庫",
        owner: "北科大教育廣播電台"
      }, {
        id: 'taskId02',
        type: "textLabel",
        title: "NER - 台語語音語料庫",
        owner: "北科大教育廣播電台"
      }, {
        id: 'taskId02',
        type: "textLabel",
        title: "NER - 地區用語關聯庫",
        owner: "台大社會所"
      }, {
        id: 'taskId02',
        type: "textLabel",
        title: "NER - 電台廣播語料庫",
        owner: "北科大教育廣播電台"
      }, {
        id: 'taskId02',
        type: "textLabel",
        title: "NER - 台語語音語料庫",
        owner: "北科大教育廣播電台"
      }, {
        id: 'taskId02',
        type: "textLabel",
        title: "NER - 地區用語關聯庫",
        owner: "台大社會所"
      }],
      imageLabelIcon,
      textLabelIcon,
      userProfile: {}
    }
  },
  methods: {
    goToDetailPage(id, type) {
      this.$router.push({ path: '/Task-info', query: { id , type}})
    }
  },
  mounted() {
    const title = this.$route.meta.title
    this.$emit("setTitle", title)

    // LIFF login check
    // if (!this.$store.state.isAuthenticated) {
    //   console.log('taskEntryPage dispatch')
    //   this.$router.push('/')
    //   // await this.$store.dispatch('getProfile')
    // } else {
    //   console.log('profile in taskEntryPage', this.$store.state.userProfile)
    //   this.userProfile = this.$store.state.userProfile
    // }
  }
}
</script>

<style>
#taskEntryPage {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

#taskEntryPage::-webkit-scrollbar {
  display: none;
}

.task-page-info {
  font-size: 20px;
  font-weight: bold;
  color: rgb(129, 129, 129);

  margin-top: 22px;
}

.horizontal-line {
  width: 223px;
  height: 0px;
  border-bottom: 1px solid rgb(112, 112, 112, 0.16);
  margin: 16px;
}

.task-list-img-icon {
  background: url('../assets/icons/imgLabel.png') no-repeat;
  background-color: rgb(185, 65, 255);
  border-radius: 100%;
  width: 35px;
  height: 35px;
  background-size: 24px;
  background-position: 50% 50%;
}

.task-list-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.f16 {
  font-size: 16px;
}

.f14 {
  font-size: 14px;
}

.white-grey-text {
  color: rgb(190, 190, 190);
}

.task-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  margin-bottom: 25px;
}

.task-list-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  margin-left: 20px;
}

.task-list-text-icon {
  background: url('../assets/icons/textLabelNoBg.png') no-repeat;
  background-color: rgb(134, 207, 134);
  border-radius: 100%;
  width: 35px;
  height: 35px;
  background-size: 24px;
  background-position: 50% 50%;
}
</style>