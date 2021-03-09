<template>
    <div class="user-profile page-pad">
      <div class="profile__page">
        <!-- <div class="profile__menu mar__b--3">
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
        </div> -->
        <div class="heading mar__b--3 text--center">User Profile</div>
        <div class="profile__content">
            <div class="profile__img text--center">
                <RoundImage :src="user?.image_url" alt="" class="profile__img--roundImage" id="user-image"/>
                <div class="profile__img--upload mar__t--1">
                    <form class="btn-chooseFile">
                        <label for="imageUpload" class="custom-file-upload">lol</label>
                        <input type="file" id="imageUpload" class="inputfile">
                    </form>
                    <div class = "image-button-wrapper">
                        <Button class="btn-upload" text="Upload" @click='handleImageUpload' />
                        <div v-if="!hasDefaultImage">
                            <Button class="btn-setDefaultImage" text="set Default Image" @click='setDefaultImage' /> 
                        </div>
                    </div>
                    <div class="tagline mar__t--1">Acceptable formats: jpg, png</div>
                </div>
            </div>
          <div class="profile__inputs--wrapper">
            <div class="profile__inputs mar__t--3 mar__b--3">
                <!-- <ProfileInputField 
                    class="mar__b--2" 
                    id="fname" 
                    label="First Name" 
                    type="text"
                    :value="user?.first_name"
                    disabled="true"
                    @change="handleInputsUpdate"
                /> -->
                
                <!-- First Name -->
                <label for="firstName" class="custom-input__label tagline--bold">First Name</label>
                <input 
                    id="firstName" 
                    class="custom-input custom-input--disabled mar__b--2"
                    name="firstName"
                    type="text" 
                    :value="user?.first_name"
                    @change="todo"
                    disabled
                >
                <!-- <ProfileInputField 
                    class="mar__b--2" 
                    id="lname" 
                    label="Last Name" 
                    type="text" 
                    :value="user?.last_name" 
                    disabled="true"
                    @change="handleInputsUpdate"
                /> -->
                <!-- Last Name -->
                <label for="lastName" class="custom-input__label tagline--bold">Last Name</label>
                <input 
                    id="lastName" 
                    class="custom-input custom-input--disabled mar__b--2"
                    name="lastName"
                    type="text" 
                    :value="user?.last_name"
                    @change="todo"
                    disabled
                >
                <!-- <ProfileInputField 
                    class="mar__b--2" 
                    id="email" 
                    label="Email Address" 
                    type="email" 
                    :value="user?.social_links.email_id" 
                    disabled="true"
                    @change="handleInputsUpdate"
                /> -->
                <!-- Email -->
                <label for="email" class="custom-input__label tagline--bold">Email</label>
                <input 
                    id="email" 
                    class="custom-input custom-input--disabled mar__b--2"
                    name="email"
                    type="email" 
                    :value="user?.social_links.email_id"
                    @change="todo"
                    disabled
                >
                
                <!-- <ProfileInputField 
                    class="mar__b--2" 
                    id="background" 
                    :label="helper.backgroundLabel" 
                    type="text"
                    :value='user?.background' 
                    :placeholder="helper.backgroundPlaceholder" 
                    @change="handleInputsUpdate"
                /> -->
                
                <!-- Background -->
                <label for="background" class="custom-input__label tagline--bold">{{ helper.backgroundLabel }}</label>
                <input 
                    id="background" 
                    class="custom-input mar__b--2"
                    name="background"
                    type="text" 
                    v-model="inputValues.background"
                    :placeholder="helper.backgroundPlaceholder"
                    @change="handleInputsUpdate"
                >
                <!-- <ProfileInputField 
                    class="mar__b--2" 
                    id="bio" 
                    label="Bio" 
                    type="text" 
                    :value='user?.bio' 
                    placeholder="I am.."
                    @change="handleInputsUpdate"
                /> -->
                <!-- Bio -->
                <label for="bio" class="custom-input__label tagline--bold">Bio</label>
                <input 
                    id="bio" 
                    class="custom-input mar__b--2"
                    name="bio"
                    type="text" 
                    v-model="inputValues.bio"
                    placeholder="I am.."
                    @change="handleInputsUpdate"
                >
                <!-- <ProfileInputField 
                    class="mar__b--2" 
                    id="github" 
                    label="GitHub URL" 
                    type="url" 
                    :value='user?.social_links.github_url' 
                    placeholder="https://github.com/username/"
                    @change="handleInputsUpdate"
                /> -->
                <!-- GitHub URL -->
                <label for="github" class="custom-input__label tagline--bold">Github</label>
                <input 
                    id="github" 
                    class="custom-input mar__b--2"
                    name="github"
                    type="url" 
                    v-model="inputValues.github_url"
                    placeholder="https://www.github.com/username"
                    @change="handleInputsUpdate"
                >
                <!-- <ProfileInputField 
                    class="mar__b--2" 
                    id="linkedin" 
                    label="LinkedIn URL" 
                    type="url" 
                    :value='user?.social_links.linkedin_url'
                    placeholder="https://linkedin.com/in/username/"
                    @change="handleInputsUpdate"
                /> -->
                
                <!-- Linkedin URL -->
                <label for="linkedin" class="custom-input__label tagline--bold">Linkedin</label>
                <input 
                    id="linkedin" 
                    class="custom-input mar__b--2"
                    name="linkedin"
                    type="url" 
                    v-model="inputValues.linkedin_url"
                    placeholder="https://www.linkedin.com/in/username"
                    @change="handleInputsUpdate"
                >
                <!-- <ProfileInputField 
                    class="mar__b--2" 
                    id="website" 
                    label="Website URL" 
                    type="url" 
                    :value='user?.social_links.website_url'
                    placeholder="https://google.com"
                    @change="handleInputsUpdate"
                /> -->
                <!-- Website URL -->
                <label for="website" class="custom-input__label tagline--bold">Website</label>
                <input 
                    id="website" 
                    class="custom-input mar__b--2"
                    name="website"
                    type="url" 
                    v-model="inputValues.website_url"
                    placeholder="https://www.your-awesome-site.com"
                    @change="handleInputsUpdate"
                >

                <label class="custom-input__label tagline--bold">{{ helper.skillsLabel }}</label>
                <div class= "tagline skills__tagline">You can enter values that aren't listed</div>
                <Multiselect 
                    v-model="inputValues.interests"
                    mode="tags"
                    :searchable="true"
                    :options="interestMenu.options"
                    :max="5"
                    :placeholder="helper.skillsPlaceholder"
                    class="body user-profile__multiselect"
                    :createTag = "true"
                    @select = handleInputsUpdate
                    @deselect = handleInputsUpdate
                />
                <label class="custom-input__label tagline--bold">Experience</label>
                <Multiselect
                    class="mar__b--2 body user-profile__multiselect"
                    :searchable="false"
                    :caret="true"
                    placeholder="Beginner"
                    v-model="inputValues.experience_level"
                    :options="{
                        1: 'Beginner',
                        2: 'Intermediate',
                        3: 'Advanced'
                    }"
                    @select = handleInputsUpdate
                    @deselect = handleInputsUpdate
                />

                <!-- <ProfileInputField 
                    class="mar__b--2" 
                    id="experience_level" 
                    label="Experience Level" 
                    type="number" 
                    :value='user?.experience_level'
                    placeholder="Beginner"
                    min = "0"
                    max = "2"
                    @change="handleInputsUpdate"
                /> -->

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
// import ProfileInputField from '@/components/ProfileInputField';
import Multiselect from '@vueform/multiselect';
import Swal from "sweetalert2";



export default {
  name: 'UserProfile',
  components: { RoundImage, Button, Multiselect},

  setup() {

    // fetching the user details with default data provided
    const user = store.state.user_data;
    //recommended interests to pick from
    const interestMenu = reactive({
        options: [ 'Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tensorflow', 'Computer Vision', 'Pandas', 'Numpy'] 
    })
    const userInerestsIndices = computed(() => {
        let indices = []
        user?.interests.forEach((interest) => {
            const index = interestMenu.options.indexOf(interest);
            if (index != -1) indices.push(index)
        })
        return indices;
    })

    let inputValues = reactive({
        background: user.background,
        bio: user.bio,
        github_url: user.social_links.github_url,
        linkedin_url: user.social_links.linkedin_url,
        website_url: user.social_links.website_url,
        interests: userInerestsIndices.value,
        experience_level: user.experience_level,
    });
    const isUserTalent = computed(() => user?.roles.includes('talent'));
    const helper = {
        backgroundLabel: isUserTalent.value ? 'Current Degree' : 'Job Title',
        backgroundPlaceholder: isUserTalent.value ? 'Computer Science' : 'Software Engineer',
        skillsLabel: isUserTalent.value ? 'Interests' : 'Skills',
        skillsPlaceholder: "Enter upto 5 " + (isUserTalent.value ? 'interests' : 'skills')
    }
    const interest_value = computed(() => store.state.user_data.interests);
    const hasDefaultImage = computed(() =>  
    store.state.user_data.image_url == 
    "https://firebasestorage.googleapis.com/v0/b/eureka-development-860d4.appspot.com/o/default-user-image.png?alt=media&token=a3a39904-b0f7-4c56-8e76-353efa9b526b");
    

    // to check if changes were made
    const state = reactive({
        hasUnsavedChanges: false
    })


    // const userInputs = reactive({
    //     background: "",
    //     bio: "",
    //     github_url: "",
    //     website_url: "",
    //     experience_level: "",
    //     interests:[]
    // })

    function handleInputsUpdate() {
        state.hasUnsavedChanges = 
            inputValues.background !== user.background || 
            inputValues.bio !== user.bio || 
            inputValues.github_url !== user.social_links.github_url || 
            inputValues.linkedin_url !== user.social_links.linkedin_url || 
            inputValues.website_url !== user.social_links.website_url || 
            parseInt(inputValues.experience_level) !== user.experience_level
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
        console.log(file)
        console.log(document.querySelector("#imageUpload").files)
        if (file){
            const fileName = new Date() + '-' + file.name;
            const metadata = {contentType:file.type}
            store.dispatch('uploadUserCroppedImage', {file:file, fileName:fileName, metadata:metadata});


            ////normal image upload
            //Swal.fire({icon: 'success', title: "Buffering", text: "The process takes a bit of time"});
            // const fileName = new Date() + '-' + file.name;
            // const metadata = {contentType:file.type}
            // store.dispatch('uploadUserImage', {file:file, fileName:fileName, metadata:metadata})
        }
    }
    function setDefaultImage(){
        //sets profile picture to default image
        store.dispatch('setDefaultUserImage')

    }

    // a very novice validator -> needs improvement
    const isInputValid = () => {
        // github
        if (inputValues.github_url.length != 0) {
            if (!(inputValues.github_url.startsWith("https://www.github.com/") ||
            inputValues.github_url.startsWith("https://github.com/") ||
            inputValues.github_url.startsWith("http://www.github.com/") || 
            inputValues.github_url.startsWith("http://github.com/"))) return false
        }
        // linkedin
        if (inputValues.linkedin_url.length != 0) {
            if (!(inputValues.linkedin_url.startsWith("https://www.linkedin.com/in/") ||
            inputValues.linkedin_url.startsWith("https://linkedin.com/in/") ||
            inputValues.linkedin_url.startsWith("http://www.linkedin.com/in/") || 
            inputValues.linkedin_url.startsWith("http://linkedin.com/in/"))) return false
        }
        // website
        if (inputValues.website_url.length != 0) {
            if (!(inputValues.website_url.startsWith("https://www.") ||
            inputValues.website_url.startsWith("https://") ||
            inputValues.website_url.startsWith("http://www.") || 
            inputValues.website_url.startsWith("http://"))) return false
        }
        return true
    }

    function handleInfoUpdate() {
        if (!isInputValid()) {
            Swal.fire({
                icon: 'error', 
                title: "Something looks fishy about the URL(s)!", 
                text: "Please follow the format https://www.______.com/_______"
            })
        } else {
            // sending the right format of interests, i.e, converting from integer to string values
            // using a deep copy to not mess with the fields in the UI
            let updatedValues = { ...inputValues};
            updatedValues.interests = []
            inputValues.interests.forEach((interestIndex) => {
                const value = interestMenu.options[interestIndex];
                if (value) {
                    updatedValues.interests.push(value);
                } else {
                    // handling values that don't exist
                    updatedValues.interests.push(interestIndex);
                }
            })

            //writes to db and updates store
            store.dispatch('updateUserProfile', updatedValues);
            state.hasUnsavedChanges = false;       
        }     
    }


    return {
        state,
        inputValues,
        user,
        helper,
        interest_value,
        handleInputsUpdate,
        handleInfoUpdate,
        addInterest,
        removeInterest,
        interestMenu,
        selectedInterests,
        handleImageUpload,
        setDefaultImage,
        hasDefaultImage,
    }

  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
@import '@/styles/components/multiselect';
@import '@/styles/components/button';

.custom-input {
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  border: 1px solid $color-bg-hover;
  border-radius: 4px;
  &__label {
      color: $color-brand;
    //   padding-left: 8px;;
  }
  &--disabled {
      background-color: $color-bg-hover;
  }
  &::placeholder {
    color: $color-bg-hover;
  }
}

input[type=file]::-webkit-file-upload-button {
    // background-image: linear-gradient(to right, #5986E1, #7450CB);
    // font-family: inherit;
    // color: white;
    // font-size: 110%;
    // padding: 14px 28px;
    // text-transform: uppercase;
    // border: none;
    // border-radius: $btn-border-radius;
    // z-index: 0;
    // &:focus {
    //     outline: 0;
    // }
    // &:hover {
    //     cursor: pointer;
    // }
    // display: inline-block;
    // width: 50px;
    // margin-left: auto;
    // margin-right: auto;
    // text-align: center !important;
}
.custom-file-upload {
    // display: inline-block;
}
.image-button-wrapper{
    display: flex;
    flex-direction: row;
}

.btn {
    &-upload {
        // font-size: 12px;
        // padding: 5px 10px;
        // margin-left:180px;
    }
    &-setDefaultImage{
        // font-size: 12px;
        // padding: 5px 10px;
        // margin-left:4px;

    }
}

.body{
    // font-size: 95%;
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
    &__page {
        width: 100%;
    }
    &__content{
        display:flex;
        justify-content: center;
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
        // margin-left: 10%;
        //align-items: center;
        //justify-content: center;
        &--upload {
            // margin-top: 20%;
            // margin-left: 0;
            width:max-content;
            height: max-content;
        }
        &--roundImage{
            // margin-top: 20%;
            // margin-left: 15%;
        }
    }
    &__inputs {
        display: flex;
        // margin-left: 20%;
       // margin-right: 0;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-evenly;
        .form__group {
            max-width: 300px; 
            width: 100%;
            margin-right: 0px;
        }
        .skills__tagline {
            margin-left: 6px;
            margin-top: 5px;
        }
        &--interests{
            // margin-top:8px;
            // margin-bottom:24px;
        }
        &--wrapper{
            display: flex;
            flex-direction: column;
            align-items: center;
            // margin-left: 60px;
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