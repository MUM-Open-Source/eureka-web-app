<template>
  <div class="resetPassword__section">
    <div class="resetPassword__wrapper text--center mar--auto">
      <div class="heading text--white">Reset Password</div>
      <router-link :to="{ name: 'Login'}">
          <div class="tagline text--white mar__b--1" >Back to login &#11166;</div>
      </router-link>
      <div class="resetPassword__form pad--4 pad__t--3 pad__b--4" >
        <InputField 
          label='Registered Email' 
          type='text' 
          id='email' 
          class="mar__b--2"/>

        <Button text="Reset" class="mar--auto mar__t--3 mar__b--1" @click="resetPassword" />
      </div>
    </div>
  </div>  
</template>

<script>
import store from '@/store';
import Button from '@/common/Button';
import InputField from '@/common/InputField';
import Swal from 'sweetalert2';

export default {
  name: 'resetPassword',
  components: { InputField, Button },

  setup() {

    //resets password with a link sent to registered email
    function resetPassword(){
        let email_id = document.getElementById('email').value;
        if (email_id !== '') {
            store.dispatch('resetPassword', email_id);
            }
         else {
            Swal.fire({icon: 'warning', title:'Oops...', text: 'Please fill in your registered email.' }) 
        } 
    }

    // return everything that needs to be referenced in the template
    return {
      resetPassword,
    }

  }
}
</script>

<style lang="scss" scoped>
.resetPassword__section {
  min-height: calc(100vh - 60px);
  background-image: linear-gradient(to right, $color-brand, $color-brand-alt);
  display: flex;
}
.resetPassword__wrapper {
  width: 350px;
}
.resetPassword__form {
  @include shadow;
  background-color: $color-white;
  border-radius: $app-border-radius;
}
</style>