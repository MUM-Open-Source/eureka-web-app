<template>
  <div class="signUp__section page-pad" id="signUpPage">
    <div class="signUp__wrapper text--center mar--auto">
      <div class="heading text--white">Create Your Eureka Account</div>
      <router-link :to="{ name: 'Login' }">
        <div class="tagline text--white mar__b--1">
          Already have an account!
        </div>
      </router-link>
      <div class="signUp__form pad--4 pad__t--3 pad__b--4">
        <InputField
          label="First Name"
          type="text"
          id="first_name"
          class="mar__b--2"
        />
        <InputField
          label="Last Name"
          type="text"
          id="last_name"
          class="mar__b--2"
        />
        <label class="tagline--bold">Who are you?</label>
        <div class="pad__t--1"></div>
        <label class="tagline role__helper"
          ><u>Talent</u> aim to network to find teammates, mentors &
          events.</label
        >
        <div class="pad__t--1"></div>
        <label class="tagline role__helper"
          ><u>Mentors</u> are experienced and here to guide the juniors.</label
        >
        <Multiselect
          class="mar__t--1 mar__b--2"
          v-model="role"
          placeholder="Role"
          :options="{
            talent: 'Talent',
            mentor: 'Mentor',
          }"
        />
        <Button
          text="Sign Up"
          class="mar--auto mar__t--3 mar__b--1"
          @click="handleSignUp"
        />
        <div class="tagline mar__b--1">
          *Use your Monash account if you're a current student
        </div>
        <div class="tagline">
          By signing up, you agree to our
          <router-link :to="{ name: 'Privacy' }"
            ><u>Privacy Policy</u></router-link
          >
          and
          <router-link :to="{ name: 'Terms' }"
            ><u>Terms & Conditions</u></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import store from "@/store";
import Button from "@/common/Button";
import InputField from "@/common/InputField";
import Multiselect from "@vueform/multiselect";
import "firebase/auth";
import Swal from "sweetalert2";

export default {
  name: "SignUp",
  components: { InputField, Multiselect, Button },

  setup() {
    // v-models
    const role = ref("");

    function handleSignUp() {
      var first_name = document.getElementById("first_name").value;
      var last_name = document.getElementById("last_name").value;
      if (
        !first_name ||
        first_name.trim().length == 0 ||
        !last_name ||
        last_name.trim().length == 0 ||
        role.value == ""
      ) {
        Swal.fire({
          icon: "warning",
          title: "Please fill up all the required fields",
        });
      } else {
        store.dispatch("signUpUser", {
          first_name: first_name,
          last_name: last_name,
          role: role.value,
        });
      }
    }

    // return everything that needs to be referenced in the template
    return {
      handleSignUp,
      role,
    };
  },
};
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
.role__helper {
  text-align: left !important;
}
.signUp__form {
  @include shadow;
  background-color: $color-white;
  border-radius: $app-border-radius;
}
</style>
