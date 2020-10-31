import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
      selectImageList: []
    },
    actions:{
      onSelectImageListChange({commit}, imageList){
        commit("setSelectedImageListData", imageList)
      }
    },
    mutations:{
      setSelectedImageListData(state, imageList){
        state.selectImageList = imageList;
      }
    },
    getters:{}
})