<template>

  <div class="signUp__section page-pad" id=signUpPage>
    <div class="signUp__wrapper text--center mar--auto">
      <div class="heading text--white">Create Your Eureka Account</div>
      <router-link :to="{ name: 'Login'}">
          <div class="tagline text--white mar__b--1" >Already have an account &#11166;</div>
      </router-link>
      <div class="signUp__form pad--4 pad__t--3 pad__b--4">
        <InputField 
          label='First Name' 
          type='text' 
          id='first_name' 
          class="mar__b--2" 
        />
        <InputField 
          label='Last Name' 
          type='text' 
          id='last_name' 
          class="mar__b--2" 
        />
        <InputField 
          label='Email' 
          type='email' 
          id='email_id' 
          class="mar__b--2" 
        />        
        <InputField 
          label='Password' 
          type='password' 
          id='password' 
          class="mar__t--2 mar__b--2" 
        />
        <label class="tagline">Who are you?</label>
        <Multiselect
          class="mar__t--1 mar__b--2"
          v-model="role"
          placeholder="Role"
          :options="{
              talent: 'Talent', 
              mentor: 'Mentor'
          }"
        />
        <Button text="Sign Up" class="mar--auto mar__t--3 mar__b--1" @click='handleSignUp'/>
      </div>
    </div>
  </div>  
</template>

<script>

import { ref } from 'vue';
import store from '@/store';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Multiselect from '@vueform/multiselect';
import "firebase/auth";

export default {
  name: 'SignUp',
  components: { InputField, Multiselect, Button },

  setup() {

    // v-models
    const role = ref('');

    function handleSignUp() {

      var email_id = document.getElementById('email_id').value;
      var password =  document.getElementById('password').value;
      var first_name =  document.getElementById('first_name').value;
      var last_name =  document.getElementById('last_name').value;
      if (first_name==null || first_name=='' || last_name==null || last_name=='' || role.value==''){
        alert("Please fill up all the required fields");
      }
      else{
        store.dispatch('signUpUser', {
          email_id: email_id, 
          password: password, 
          first_name: first_name, 
          last_name: last_name, 
          role: role.value
        });
      }
  }

    // return everything that needs to be referenced in the template
    return {
      handleSignUp,
      role
    }

  }
}
</script>

<style lang="scss" scoped>
.signUp__section {
  min-height: calc(100vh - 60px);
  background-image: linear-gradient(to right, $color-brand, $color-brand-alt);
  display: flex;
}
.signUp__wrapper {
  width: 350px;
}
.signUp__form {
  @include shadow;
  background-color: $color-white;
  border-radius: $app-border-radius;
}
</style>