import { createStore } from "vuex";

export default createStore({
  state: {
    SiteName: "",
  },
  mutations: {
    selectSite(state, SiteName) {
      state.SiteName = SiteName;
    },
  },
  getters: {
    getSiteName(state) {
      return state.SiteName;
    },
  },
  actions: {},
  modules: {},
});
