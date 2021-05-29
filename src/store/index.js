import { api } from "@/services";
import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
  },

  getters: {
    authenticated: ({ token, user }) => !!token && !!user,
    token: ({ token }) => token,
    user: ({ user }) => user,
  },

  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },

    SET_USER(state, payload) {
      state.user = payload;
    },

    SET_SIGN_OUT(state) {
      state.user = null;
      state.token = null;
    },
  },

  actions: {
    setToken({ commit }, payload) {
      commit("SET_TOKEN", payload);

      localStorage.setItem("token", payload); // local storage
      api.defaults.headers.common["Authorization"] = payload; // header authorization
    },

    setUser({ commit }, payload) {
      commit("SET_USER", payload);
    },

    setSignIn({ dispatch }, payload) {
      dispatch("setToken", payload.token);
      dispatch("setUser", payload.user);

      // local storage
      localStorage.setItem("authenticated", true);
    },

    setSignOut({ commit }) {
      commit("SET_SIGN_OUT");

      // local storage
      localStorage.removeItem("token");
      localStorage.removeItem("authenticated");
    },
  },

  modules: {},
});
