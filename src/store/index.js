import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
      selectImageList: [],
      taskOwner: '',
      taskType: '',
      taskIcon: '',
      taskStartDate: '',
      taskEndDate: '',
      taskTitle: '',
      taskDescription: '',
      taskPayRule: '',
      taskLeastPayLimitPage: '',
      answerIdList: [],
    },
    actions:{
      onSelectImageListChange({commit}, imageList) {
        commit("setSelectedImageListData", imageList)
      }
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
      }
    },
    getters:{}
})