<template>
    <div class="user-profile page-pad">
      <div class="profile__page">
        <div class="profile__menu mar__b--3">
            <router-link :to="{ name: 'Profile'}">
                <div class="active profile__menu--option pad__t--1 pad__b--1">
                    <img class="profile__menu--icon" src="@/assets/profile-user-icon.svg" />
                    <div class="body">User info</div>
                </div>
            </router-link>
            <router-link :to="{ name: 'WavesFromTalent'}">
                <div class="profile__menu--option pad__t--1 pad__b--1">
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
            <!-- <div class="heading mar__b--3 text--center">User Profile</div> -->
            <div class="profile__img">
                <RoundImage :src="user?.image_url" alt="" class="profile__img--roundImage"/>
                <div class="profile__img--upload mar__t--1">
                    <Button text="Upload New" />
                    <div class="tagline mar__t--1">Acceptable formats: jpg, png</div>
                </div>
            </div>
            <div class="profile__inputs mar__t--3 mar__b--3">
                <InputField 
                    class="mar__b--2" 
                    id="fname" 
                    label="First Name" 
                    type="text"
                    :value="user?.first_name"
                    disabled="true"
                    @change="handleInputUpdate"
                />
                <InputField 
                    class="mar__b--2" 
                    id="lname" 
                    label="Last Name" 
                    type="text" 
                    :value="user?.last_name" 
                    disabled="true"
                    @change="handleInputUpdate"
                />
                <InputField 
                    class="mar__b--2" 
                    id="email" 
                    label="Email Address" 
                    type="email" 
                    :value="user?.social_links.email_id" 
                    disabled="true"
                    @change="handleInputUpdate"
                />
                
                <InputField 
                    class="mar__b--2" 
                    id="background" 
                    label="Background (Degree/Job)" 
                    type="text"
                    :value='user?.background' 
                    placeholder="Computer Science" 
                    @change="handleInputUpdate"
                />
                <InputField 
                    class="mar__b--2" 
                    id="bio" 
                    label="Bio" 
                    type="text" 
                    :value='user?.bio' 
                    placeholder="I am.."
                    @change="handleInputUpdate"
                />
                <InputField 
                    class="mar__b--2" 
                    id="github" 
                    label="GitHub URL" 
                    type="url" 
                    :value='user?.social_links.github_url' 
                    placeholder="https://github.com/username/"
                    @change="handleInputUpdate"
                />
                <InputField 
                    class="mar__b--2" 
                    id="linkedin" 
                    label="LinkedIn URL" 
                    type="url" 
                    :value='user?.social_links.linkedin_url'
                    placeholder="https://linkedin.com/in/username/"
                    @change="handleInputUpdate"
                />
                <InputField 
                    class="mar__b--2" 
                    id="website" 
                    label="Website URL" 
                    type="url" 
                    :value='user?.social_links.website_url'
                    placeholder="https://google.com"
                    @change="handleInputUpdate"
                />
                <InputMultiSelect 
                    id="interests"
                    :values='user?.interests'
                />
                <InputField 
                    class="mar__b--2" 
                    id="experience_level" 
                    label="Experience Level" 
                    type="text" 
                    :value='user?.experience_level'
                    placeholder="Beginner"
                />
            </div>
            <div class="text--center">
                <div v-if="state.hasUnsavedChanges" class="tagline mar__b--1">Unsaved changes</div>
                <Button class="btn-saveChanges" text="Save Changes" @click='handleInfoUpdate' />
            </div>
        </div>
    </div>
  </div>  
</template>

<script>
// import { testUsers } from '@/assets/testUsers.js';    // test users
import { reactive, computed } from 'vue';
import store from '@/store';
import RoundImage from '@/components/RoundImage';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import InputMultiSelect from '@/components/InputMultiSelect';

export default {
  name: 'UserProfile',
  components: { RoundImage, Button, InputField, InputMultiSelect },

  setup() {

    // fetching the user details with default data provided
    // TODO: Improve and include interests
    const user = computed(() => store.state.user_data);

    // to check if changes were made
    const state = reactive({
        hasUnsavedChanges: false
    })

    // TODO: Handle image upload, interests and experience updates
    function handleInputUpdate() {
        state.hasUnsavedChanges =
            document.getElementById('background').value !== user.value.background || 
            document.getElementById('bio').value !== user.value.bio ||
            document.getElementById('github').value !== user.value.social_links.github_url ||
            document.getElementById('linkedin').value !== user.value.social_links.linkedin_url ||
            document.getElementById('website').value !== user.value.social_links.website_url ||
            document.getElementById('interests').value !== user.value.interests ||
            document.getElementById('experience_level').value !== user.value.experience_level;
    }

    function handleInfoUpdate() {
        if (state.hasUnsavedChanges) {
            // TODO: update the data in the database and store
            state.hasUnsavedChanges = false;
        }
    }

    return {
        state,
        user,
        handleInputUpdate,
        handleInfoUpdate
    }

  }
}
</script>

<style lang="scss" scoped>
.body{
    font-size: 95%;
}
.user-profile {
    display: flex;
    flex-direction: row;
}

.profile {
    &__content{
        display:flex;
    }
    &__menu {
        display: flex;
        flex-direction: row;
        max-width: 500%;
        width: 300%;
        border-bottom: 1px solid ;
        border-color: rgba(192, 183, 183, 0.5);
        &--option {
            display: flex;
            flex-direction: column;
            padding: 8px 8px;
            border: 1px solid ;
            border-color: rgba(192, 183, 183, 0.5);

        }
        &--option:hover{
            background: rgba(228, 227, 227, 0.5); 
            border-top: 6px solid;
            border-color:rgba(84, 47, 187, 0.5);  ;
            position:static;
        }
        &--icon {
            height: 20px;
        }
        .active {
            //border-right: 3px solid $color-brand;
        }
    }
    &__img {
        display: flex;
        flex-direction: column;
        margin-left: 10%;
        //align-items: center;
        //justify-content: center;
        &--upload {
            margin-top: 20%;
            margin-left: 0;
            width:max-content;
            height: max-content;
        }
        &--roundImage{
            margin-top: 20%;
            margin-left: 15%;
        }
    }
    &__inputs {
        display: flex;
        margin-left: 20%;
       // margin-right: 0;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-evenly;
        .form__group {
            max-width: 300px; 
            width: 100%;
            margin-right: 0px;
        }
    }
}
@media (max-width: 736px) {
    .user-profile {
        flex-direction: column;
        align-items: center;
    }
    .profile {
        &__img {
            flex-direction: column;
        }
        &__inputs {
            display: flex;
            align-items: center;
            justify-content: center;       
        }
    }
}
</style>