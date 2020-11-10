import Vue from "vue";
import Vuex from "vuex";
import liff from '@line/liff';

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
    userProfile: {}
  },
  actions: {
    onSelectImageListChange({ commit }, imageList) {
      commit("setSelectedImageListData", imageList)
    },
    async login({ commit }) {
      await liff.init({ liffId: '1655218168-VQrDOZBE' });
      if (!liff.isLoggedIn()) {
        console.log('liff login')
        liff.login({ redirectUri: "https://line-label.herokuapp.com/" },)
        // liff.init()
        console.log('redirected back')
      }
      const userProfile = await liff.getProfile()
      console.log('userProfile', userProfile)
      commit('setProfile', userProfile)
    }
  },
  mutations: {
    setSelectedImageListData(state, imageList) {
      state.selectImageList = imageList;
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
      }
    },
    setProfile(state, userProfile) {
      console.log('set profile', userProfile)
      state.userProfile = userProfile
    }
  },
  getters: {}
})