<template>
  <div class="login__section">
    <div class="login__wrapper text--center mar--auto">
      <div class="heading text--white">Login Now To Start</div>
      <router-link :to="{ name: 'SignUp'}">
          <div class="tagline text--white mar__b--1" >Create a new account &#11166;</div>
      </router-link>
      <div class="login__form pad--4 pad__t--3 pad__b--4">
        <InputField 
          label='Email' 
          type='text' 
          id='email' 
          class="mar__b--2"
        />
        <InputField 
          label='Password' 
          type='password' 
          id='password' 
          class="mar__t--2 mar__b--2" 
        />
        <Button text="Login" class="mar--auto mar__t--3 mar__b--1" @click='handleLogin'/>
        <router-link :to="{ name: 'ResetPassword'}">
          <div class="tagline--bold text--primary" >Forgot my password </div>
        </router-link>
      </div>
    </div>
  </div>  
</template>

<script>
import store from '@/store';
import Button from '@/components/Button';
import InputField from '@/components/InputField';


export default {
  name: 'Login',
  components: { InputField, Button },

  setup() {

    function handleLogin() {
      var email = document.getElementById('email').value;
      var password =  document.getElementById('password').value;
      store.dispatch('setUser', {email: email, password: password});
    } 

    // return everything that needs to be referenced in the template
    return {
      handleLogin,
    }

  }
}
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