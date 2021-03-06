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
                        <form class="btn-chooseFile" >
                            <label for="imageUpload"></label>
                            <input type="file" id="imageUpload">
                        </form>
                        <div class = "image-button-wrapper">
                        <Button class="btn-upload" text="Upload" @click='handleImageUpload' />
                        <div v-if="!hasDefaultImage">
                        <Button  class="btn-setDefaultImage" text="set Default Image" @click='setDefaultImage' /> 
                        </div>
                        </div>
                    <div class="tagline mar__t--1">Acceptable formats: jpg, png</div>
                </div>
            </div>
          <div class="profile__inputs--wrapper">
            <div class="profile__inputs mar__t--3 mar__b--3">
                <ProfileInputField 
                    class="mar__b--2" 
                    id="fname" 
                    label="First Name" 
                    type="text"
                    :value="user?.first_name"
                    disabled="true"
                    @change="handleInputsUpdate"
                />
                <ProfileInputField 
                    class="mar__b--2" 
                    id="lname" 
                    label="Last Name" 
                    type="text" 
                    :value="user?.last_name" 
                    disabled="true"
                    @change="handleInputsUpdate"
                />
                <ProfileInputField 
                    class="mar__b--2" 
                    id="email" 
                    label="Email Address" 
                    type="email" 
                    :value="user?.social_links.email_id" 
                    disabled="true"
                    @change="handleInputsUpdate"
                />
                
                <ProfileInputField 
                    class="mar__b--2" 
                    id="background" 
                    label="Background (Degree/Job)" 
                    type="text"
                    :value='user?.background' 
                    placeholder="Computer Science" 
                    @change="handleInputsUpdate"
                />
                <ProfileInputField 
                    class="mar__b--2" 
                    id="bio" 
                    label="Bio" 
                    type="text" 
                    :value='user?.bio' 
                    placeholder="I am.."
                    @change="handleInputsUpdate"
                />
                <ProfileInputField 
                    class="mar__b--2" 
                    id="github" 
                    label="GitHub URL" 
                    type="url" 
                    :value='user?.social_links.github_url' 
                    placeholder="https://github.com/username/"
                    @change="handleInputsUpdate"
                />
                <ProfileInputField 
                    class="mar__b--2" 
                    id="linkedin" 
                    label="LinkedIn URL" 
                    type="url" 
                    :value='user?.social_links.linkedin_url'
                    placeholder="https://linkedin.com/in/username/"
                    @change="handleInputsUpdate"
                />
                <ProfileInputField 
                    class="mar__b--2" 
                    id="website" 
                    label="Website URL" 
                    type="url" 
                    :value='user?.social_links.website_url'
                    placeholder="https://google.com"
                    @change="handleInputsUpdate"
                />
                <div class= "user-profile__multiselect--tagline">Interest</div>
                <Multiselect 
                    v-model="interest_value"
                    mode="tags"
                    :searchable="true"
                    :options="interestMenu.options"
                    :max="6"
                    placeholder="Enter up to 6 interests"
                    class="body user-profile__multiselect"
                    :createTag = "true"
                    @select = addInterest
                    @deselect = removeInterest
                />

                <ProfileInputField 
                    class="mar__b--2" 
                    id="experience_level" 
                    label="Experience Level" 
                    type="number" 
                    :value='user?.experience_level'
                    placeholder="Beginner"
                    min = "0"
                    max = "2"
                    @change="handleInputsUpdate"
                />

            </div>
            <div class="text--center">
                <div v-if="state.hasUnsavedChanges" class="tagline mar__b--1">Unsaved changes</div>
                <Button class="btn-saveChanges" text="Save Changes" @click='handleInfoUpdate' />
            </div>
          </div>
        </div>
    </div>
  </div>  
</template>

<script>
import { reactive, computed } from 'vue';
import store from '@/store';
import RoundImage from '@/components/RoundImage';
import Button from '@/components/Button';
import ProfileInputField from '@/components/ProfileInputField';
import Multiselect from '@vueform/multiselect';


export default {
  name: 'UserProfile',
  components: { RoundImage, Button, ProfileInputField, Multiselect },

  setup() {

    // fetching the user details with default data provided
    const user = computed(() => store.state.user_data);
    const interest_value = computed(() => store.state.user_data.interests);
    const hasDefaultImage = computed(() => 
    store.state.user_data.image_url == 
    "https://firebasestorage.googleapis.com/v0/b/eureka-development-860d4.appspot.com/o/default-user-image.png?alt=media&token=a3a39904-b0f7-4c56-8e76-353efa9b526b");
    
    //recommended interests to pick from
    const interestMenu = reactive({
        options: [
            { value: 'python', label: 'Python' },
            { value: 'javascript', label: 'JavaScript' },
            { value: 'typescript', label: 'TypeScript' },
            { value: 'html', label: 'HTML' },
            { value: 'css', label: 'CSS' },
            { value: 'tensorflow', label: 'TensorFlow' },
            { value: 'computer-vision', label: 'Computer Vision'},
        ]
    })

    // to check if changes were made
    const state = reactive({
        hasUnsavedChanges: false
    })


    const userInputs = reactive({
        background: "",
        bio: "",
        github_url: "",
        website_url: "",
        experience_level: "",
        interests:[]
    })

    function handleInputsUpdate() {
        userInputs.background = document.getElementById('background').value;
        userInputs.bio = document.getElementById('bio').value;
        userInputs.github_url = document.getElementById('github').value;
        userInputs.linkedin_url = document.getElementById('linkedin').value;
        userInputs.website_url = document.getElementById('website').value;
        userInputs.interests = selectedInterests.value;
        userInputs.experience_level = document.getElementById('experience_level').value;
        state.hasUnsavedChanges = userInputs.background !== user.value.background
         || userInputs.bio !== user.value.bio 
         || userInputs.github_url !== user.value.social_links.github_url
         || userInputs.linkedin_url !== user.value.social_links.linkedin_url
         || userInputs.website_url !== user.value.social_links.website_url
         || userInputs.interests !== user.value.interests
         || userInputs.experience_level !== user.value.experience_level
    }
    //Stores the list of selected interests
    //Initial value is the existing/past selected interests from user's db
    const selectedInterests = computed(() => JSON.parse(JSON.stringify(store.state.user_data.interests)));


    function addInterest(interest){
        //gets selected interests from InputMultiSelect
        selectedInterests.value.push(interest);
        handleInputsUpdate();

    }
    function removeInterest(interest){
        //removes deselected interests in user interests from InputMultiSelect
        var interestIndex = selectedInterests.value.indexOf(interest);
        selectedInterests.value.splice(interestIndex,1);
        handleInputsUpdate();

    }
    function handleImageUpload(){
        //handles image upload
        const file = document.querySelector("#imageUpload").files[0]
        if (file){
            const fileName = new Date() + '-' + file.name;
            const metadata = {contentType:file.type}
            store.dispatch('uploadUserImage', {file:file, fileName:fileName, metadata:metadata})
        }
    }
    function setDefaultImage(){
        //sets profile picture to default image
        store.dispatch('setDefaultUserImage')

    }

    function handleInfoUpdate() {
        if (state.hasUnsavedChanges) {
            //writes to db and updates store
            store.dispatch('updateUserProfile', {background:userInputs.background, bio:userInputs.bio,
            github_url:userInputs.github_url, linkedin_url:userInputs.linkedin_url, 
            website_url: userInputs.website_url, interests:selectedInterests.value,
            experience_level: userInputs.experience_level});

            state.hasUnsavedChanges = false;
            
        }
    }

    return {
        state,
        user,
        interest_value,
        handleInputsUpdate,
        handleInfoUpdate,
        addInterest,
        removeInterest,
        interestMenu,
        selectedInterests,
        handleImageUpload,
        setDefaultImage,
        hasDefaultImage
    }

  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/styles/components/input_multiselect';
input[type=file]::-webkit-file-upload-button {
    background-image: linear-gradient(to right, #5986E1, #7450CB);
    font-family: inherit;
    color: white;
    font-size: 110%;
    padding: 14px 28px;
    text-transform: uppercase;
    border: none;
    border-radius: $btn-border-radius;
    z-index: 0;
    &:focus {
        outline: 0;
    }
    &:hover {
        cursor: pointer;
    }
}
.image-button-wrapper{
    display: flex;
    flex-direction: row;
}

.btn {
    &-upload {
        font-size: 12px;
        padding: 5px 10px;
        margin-left:180px;
    }
    &-setDefaultImage{
        font-size: 12px;
        padding: 5px 10px;
        margin-left:4px;

    }
}

.body{
    font-size: 95%;
}
.user-profile {
    display: flex;
    flex-direction: row;
    &__multiselect{
        margin-top: 10px;
        margin-bottom: 18px;
        &--tagline{
            margin-bottom: -6px;
            margin-left: 6px;
            font-size: 110%;
            font-family:'Trebuchet MS';
            font-weight: bold;
            color: #346ee0;

        }
    }
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
        &--interests{
            margin-top:8px;
            margin-bottom:24px;
        }
        &--wrapper{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 60px;
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