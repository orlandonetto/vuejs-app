<template>
  <div id="app">
    <div v-if="loading">loading...</div>

    <LayoutDefault v-else-if="!$store.getters.authenticated" />

    <router-view v-else />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { loadSession } from "@/services/auth";
import { api } from "@/services";
import LayoutDefault from "@/layout/LayoutDefault";

export default {
  components: {
    LayoutDefault,
  },

  data() {
    return {
      loading: true,
    };
  },

  created() {
    this.startApp();
  },

  methods: {
    ...mapActions(["setSignIn", "setSignOut"]),

    async startApp() {
      // checks if the token is still valid for a session
      const token = localStorage.getItem("token");

      try {
        if (token) {
          api.defaults.headers.common["Authorization"] = token;

          await loadSession().then((res) => {
            this.setSignIn({
              token: res.body.token,
              user: res.body.user,
            });
          });

          this.$router.push("/main");
        }
      } catch (error) {
        this.setSignOut();
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>