<template>
  <!-- Home screen -->
  <div class="loading__center page-pad">
    <div class="page-pad">
      <div class="heading__normal mar__b--1">Your Go-To Platform to</div>
      <div class="heading mar__b--4">Network with Monash Talent</div>
      <div>Look no further if you need to find other within the Monash SOIT Community with whom you can team up, seek</div>
      <div class="mar__b--4">guidance or simply wave at. We aim to make it easier to find people to join you on your unique adventures.</div>
      <div id="button-div">
        <a id="button" class="tagline text--capsule cursor__pointer mar__b--5">SIGNUP</a>
      </div>
      <img src="@/assets/home-hero-illustration.svg" class="mar__t--5 mar__b--5 picture" />
      <div class="row page-pad">
        <img src="@/assets/event-illustration.svg" class="column__image mar__t--5 mar__b--5 page-pad" />
        <div id="text" class="pad--3 mar--auto">
          <p class="heading mar__b--2">Explore Events Happening Around You</p>
          <p class="tagging">Go through the list of events to find something you will potentially be</p>
          <p class="tagging">interested to take part in. You can find the upcoming hackathons,</p>
          <p class="tagging">datathons, talks, workshops and more, all in one location</p>
        </div>
      </div>
      <div class="row pad--5">
        <div id="text" class="pad--3 mar--auto">
          <p class="heading mar__b--2">Meet Talent From the Student Community</p>
          <p class="tagging">FIlter and team up with other like-minded students who are just as</p>
          <p class="tagging">passionate and ambitious as you. You might just find your next</p>
          <p class="tagging">teammate for a competition, personal project and more!</p>
        </div>
        <img src="@/assets/talent-illustration.svg" class="column__image mar__t--5 mar__b--5 page-pad" />
      </div>
      <div class="row pad--5">
        <img src="@/assets/mentor-illustration.svg" class="column__image mar__t--5 mar__b--5 page-pad" />
        <div id="text" class="pad--3 mar--auto">
          <p class="heading">A Place for Seniors and Alumni</p>
          <p class="heading mar__b--2">to Share their Expertise</p>
          <p class="tagging">Network with experienced members of the community who are ready</p>
          <p class="tagging">to guide you and your team. If you are interested to be a mentor, do</p>
          <p class="tagging">get in touch with our team or <a href="/SignUp.vue">create an account</a> today</p>
        </div>
      </div>
    </div>
  </div>
  <div class="develop text--center text--white">
    <div class="pad--5">
      <div class="pad--5">
        <p class="heading mar__b--3">Come Develop This Platorm</p>
        <p>We're going Open Source soon and you'll be able to help build and add features to</p>
        <p class="mar__b--3">make this platform better! built by the student community for the community.</p>
        <p>Stay tuned for more.</p>
      </div>
    </div>
  </div>
  <div class="pad--5 text--center">
    <div class="pad--5">
      <p class="heading mar__b--2">Ready to Form Your Ultimate Team?</p>
      <p class="tagging pad__b--2">You solution is just a click away.</p>
      <div id="button-div">
        <a id="button" class="tagline text--capsule cursor__pointer" href="/SignUp.vue">SIGNUP</a>
      </div>
    </div>
  </div>
  <div class="pad--3 footer">
    <div>
      <a class="tagging text--white cursor__pointer mar--2">Privacy</a>
      <a class="tagging text--white cursor__pointer mar--2">Terms & Conditions</a>
    </div>
    <div>
      <p class="tagging text--white">© 2021 Eureka Open Source. All rights reserved.</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
.loading__center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}

.heading {
  &__normal {
    font-size: $heading-font-size;
    font-weight: $normal;
  }
}

#button-div {
  display: flex;
  justify-content: center;
}

#button {
  text-transform: uppercase;
  width: $profile-card-width;
}

.picture {
  max-width: 100%;
}

.row {
  display: flex;
}

.column {
  flex: 50%;
  &__image {
    width: 50%;
  }
}

#text {
  text-align: left;
}

.develop {
  background-color: $color-brand;
}

.footer {
  background-color: $color-dark;
  display: flex;
  justify-content: space-between;
}

@media (max-width: 903px) {
  .row {
    flex-wrap: wrap;
  }

  .column{
    &__image {
      width: 100%
    }
  }
}
</style>
