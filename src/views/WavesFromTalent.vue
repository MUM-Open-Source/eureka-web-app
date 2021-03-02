<template>
    <div>Waves From Talents Testing</div>
    <!-- <div class="user-profile page-pad">
        <div class="profile__menu mar__b--3">
            <div class="subheading mar__b--1">Explore</div>
            <router-link :to="{ name: 'Profile'}">
                <div class="profile__menu--option pad__t--1 pad__b--1">
                    <img class="profile__menu--icon" src="@/assets/profile-user-icon.svg" />
                    <div class="body">User info</div>
                </div>
            </router-link>
            <router-link :to="{ name: 'WavesFromTalent'}">
                <div class="active profile__menu--option pad__t--1 pad__b--1">
                    <img class="profile__menu--icon" src="@/assets/profile-talent-icon.svg" />
                    <div class="body">Waves from talent</div>
                </div>
            </router-link>
            <router-link :to="{ name: 'WavesFromMentors'}">
                <div class="profile__menu--option pad__t--1 pad__b--1">
                    <img class="profile__menu--icon" src="@/assets/profile-mentor-icon.svg" />
                    <div class="body">Waves from mentors</div>
                </div>
            </router-link>
        </div>
        <div class="profile__content">
            <ProfileCard 
                v-for="user in testUsers" 
                :key="user.key"
                :name="user.name"
                :image="user.image"
                :experienceLevel="user.experience_level"
                :remainingExperience="3-user.experience_level"
                :background="user.background"
                :bio="user.bio"
                :interests="user.interests"
                :email="user.socials.email"
                :linkedin="user.socials.linkedin"
                :github="user.socials.github"
                :website="user.socials.website"
                :wave="user.wave"
            />
        </div>
  </div>   -->
</template>

<script>
//import {testUsers} from '@/assets/testUsers.js';    // test users
//import ProfileCard from '@/components/ProfileCard';

export default {
  name: 'WavesFromTalent',
 // components: { ProfileCard },

  setup() {
      
    return {
       // testUsers
    }

  }
}
</script>

<style lang="scss" scoped>
.user-profile {
    display: flex;
    flex-direction: row;
}
.profile {
    &__menu {
        display: flex;
        flex-direction: column;
        max-width: 220px;
        width: 90%;
        &--option {
            display: flex;
            flex-direction: row;
        }
        &--icon {
            height: 25px;
            margin-right: 10px;
        }
        .active {
            border-right: 3px solid $color-brand;
        }
    }
    &__content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
}
@media (max-width: 736px) {
    .user-profile {
        flex-direction: column;
        align-items: center;
    }
}
</style>