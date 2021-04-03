<template>
  <div class="login__section">
    <div class="login__wrapper text--center mar--auto">
      <div class="heading text--white">Login Now To Start</div>
      <router-link :to="{ name: 'SignUp' }">
        <div class="tagline text--white mar__b--1">
          Create a new account.
        </div>
      </router-link>
      <div class="login__form pad--4 pad__t--3 pad__b--4">
        <Button
          text="Login"
          class="mar--auto mar__t--3 mar__b--1"
          @click="handleLogin"
        />
        <div class="tagline">
          *Use your Monash account if you're a current student
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import Button from "@/common/Button";

export default {
  name: "Login",
  components: { Button },

  setup() {
    function handleLogin() {
      store.dispatch("signUpUser", null);
    }

    // return everything that needs to be referenced in the template
    return {
      handleLogin,
    };
  },
};
</script>

<style lang="scss" scoped>
.login__section {
  min-height: calc(100vh - 60px);
  background-image: linear-gradient(to right, $color-brand, $color-brand-alt);
  display: flex;
}
.login__wrapper {
  width: 350px;
}
.login__form {
  @include shadow;
  background-color: $color-white;
  border-radius: $app-border-radius;
}
</style>
