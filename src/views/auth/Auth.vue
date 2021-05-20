<template>
  <div>
    <label>Username</label>
    <br />
    <input v-model="form.username" id="username" name="username" type="text" />

    <br /><br />

    <label>Password</label>
    <br />
    <input
      v-model="form.password"
      id="password"
      name="password"
      type="password"
    />

    <br /><br />

    <button @click="submit()">Submit</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { signIn } from "@/services/auth";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    ...mapActions(["setSignIn"]),

    async submit() {
      try {
        await signIn(this.form).then((res) => {
          this.setSignIn({
            user: res.body.user,
            token: res.body.token,
          });
        });
      } catch (error) {
        alert(error.statusText);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
</style>