import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectImageList: [],
    answerIdList: [],
    taskOwner: '',
    taskType: '',
    taskIcon: '',
    taskStartDate: '',
    taskEndDate: '',
    taskTitle: '',
    taskDescription: '',
    taskPayRule: '',
    taskLeastPayLimitPage: '',
    labeledDataList: {},
    unlabeledDataList: [],
    sampleScreenshot: '',
    isAuthenticated: false,
    userProfile: {}
  },
  actions: {
    onSelectImageListChange({ commit }, imageList) {
      commit("setSelectedImageListData", imageList)
    },
    // liffLogin({ commit }) {
    //   console.log('liff login')
    //   liff.login({ redirectUri: "https://line-label.herokuapp.com/" })
    //   // liff.init()
    //   console.log('redirected back')
    //   commit('setAuthentication', true)
    // },
    // async getProfile({ commit }) {
    //   const userProfile = await liff.getProfile()
    //   console.log('userProfile', userProfile)
    //   commit('setProfile', userProfile)
    // },
    // async getProfile({ commit }) {
    //   if (!liff.isLoggedIn()) {
    //     console.log('has not logged in, store')
    //     liff.login({ redirectUri: "https://line-label.herokuapp.com/" })
    //     console.log('redirected back')
    //   } else if (!this.userProfile) {
    //     const userProfile = await liff.getProfile()
    //     console.log('userProfile', userProfile)
    //     commit('setProfile', userProfile)
    //   }
    // }
  },
  mutations:{
    setSelectedImageListData(state, imageList) {
      state.selectImageList = imageList;
    },
    setTaskSettingInfo(state, taskInfo) {
      console.log('taskInfo', taskInfo);
      state.taskOwner = taskInfo.taskOwner
      state.taskType = taskInfo.taskType
      state.taskIcon = taskInfo.taskIcon
      state.taskStartDate = taskInfo.taskStartDate
      state.taskEndDate = taskInfo.taskEndDate
      state.taskTitle = taskInfo.taskTitle
      state.taskDescription = taskInfo.taskDescription
      state.taskPayRule = taskInfo.taskPayRule
      state.taskLeastPayLimitPage = taskInfo.taskLeastPayLimitPage
    },
    pushToAnswerIdList(state, answerId) {
      state.answerIdList.push(answerId);
    },
    setLabelData(state, labelData) {
      console.log('labelData', labelData);
      state.labeledDataList = labelData.labeledDataList
      state.unlabeledDataList = labelData.unlabeledDataList
    },
    setSampleScreenshot(state, screenshot) {
      console.log('screenshot', screenshot)
      state.sampleScreenshot = screenshot
    },
    setAuthentication(state, isAuthenticated) {
      console.log('setAuthentication', isAuthenticated)
      state.isAuthenticated = isAuthenticated
    },
    setProfile(state, userProfile) {
      console.log('set profile', userProfile)
      state.userProfile = userProfile
      state.isAuthenticated = true
      if (!userProfile) {
        state.isAuthenticated = false
      }
    }
  },
  getters: {}
})