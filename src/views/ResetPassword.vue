<template>
  <div class="resetPassword__section">
    <div class="resetPassword__wrapper text--center mar--auto">
      <div class="heading text--white">Reset Password</div>
      <div class="resetPassword__form pad--4 pad__t--3 pad__b--4" >
        <InputField 
          label='Registered Email' 
          type='text' 
          id='email' 
          class="mar__b--2"/>
         <router-link :to="{ name: 'Login'}">
            <Button text="Cancel" class="resetPasswordPage-button" />
         </router-link>
        <Button text="Reset" type="submit" class="resetPasswordPage-button" @click="resetPassword" />
      </div>
    </div>
  </div>  
</template>

<script>
import store from '@/store';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Swal from 'sweetalert2';



export default {
  name: 'resetPassword',
  components: { InputField, Button },

  setup() {




    //resets password with a link sent to registered email
    function resetPassword(){
        var email = document.getElementById('email').value;
        if (email !== '') {
            store.dispatch('resetPassword', {email:email});
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
.heading {
    margin:8px ;
}
.resetPasswordPage-button{
    display: inline-block;
    padding: 6px 24px;
    margin: 10px;
}
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