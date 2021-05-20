<template>
  <div>
    Main
    <br /><br />
    <button @click="signOut()">sign out</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["setSignOut"]),

    signOut() {
      this.setSignOut();
    },
  },
};
</script>

<style>
</style>