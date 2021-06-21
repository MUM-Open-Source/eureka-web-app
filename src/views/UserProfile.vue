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
            <div class="profile__img text--center pad--4">
                <RoundImage :src="user_image" alt="" class="profile__img--roundImage" id="user-image"/>
                <div class="profile__img--upload mar__t--1">
                    <form class="btn-chooseFile mar--2">
                        <label for="imageUpload" class="body custom-file-upload text--capsule cursor__pointer">Update</label>
                        <input type="file" id="imageUpload" class="inputfile" accept=".png, .jpg, .jpeg"
                        @change="handleImageUpload">
                    </form>
                    <div class = "image-button-wrapper">
                        <!-- <Button class="btn-upload" text="Upload" @click='handleImageUpload' /> -->
                        <Button v-if="!hasDefaultImage" class="btn-setDefaultImage" text="Remove Image" @click='setDefaultImage' />
                    </div>
                    <div class="tagline mar__t--1">Acceptable formats: jpg, png</div>
                </div>
            </div>
          <div class="profile__inputs--wrapper">
            <div class="profile__inputs mar__t--3 mar__b--3">

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

                <!-- Bio -->
                <label for="bio" class="custom-input__label tagline--bold">Bio*</label>
                <div class= "tagline skills__tagline">Use this space to sell yourself</div>
                <textarea
                    id="bio"
                    class="body"
                    placeholder="I am.."
                    v-model="inputValues.bio"
                    required
                />

                <!-- GitHub URL -->
                <label for="github" class="custom-input__label tagline--bold">Github Link</label>
                <input
                    id="github"
                    class="custom-input mar__b--2"
                    name="github"
                    type="url"
                    v-model="inputValues.github_url"
                    placeholder="https://www.github.com/username"
                    @change="handleInputsUpdate"
                >

                <!-- Linkedin URL -->
                <label for="linkedin" class="custom-input__label tagline--bold">Linkedin Link</label>
                <input
                    id="linkedin"
                    class="custom-input mar__b--2"
                    name="linkedin"
                    type="url"
                    v-model="inputValues.linkedin_url"
                    placeholder="https://www.linkedin.com/in/username"
                    @change="handleInputsUpdate"
                >

                <!-- Website URL -->
                <label for="website" class="custom-input__label tagline--bold">Website Link</label>
                <input
                    id="website"
                    class="custom-input mar__b--2"
                    name="website"
                    type="url"
                    v-model="inputValues.website_url"
                    placeholder="https://www.your-awesome-site.com"
                    @change="handleInputsUpdate"
                >

                <!-- Skills/Interests -->
                <label class="custom-input__label tagline--bold">{{ helper.skillsLabel }}</label>
                <div class= "tagline skills__tagline">You can enter values that aren't listed</div>
                <Multiselect
                    v-model="inputValues.interests"
                    mode="tags"
                    :searchable="true"
                    :options="interestMenu.options"
                    :max="7"
                    :placeholder="helper.skillsPlaceholder"
                    class="body user-profile__multiselect mar__b--2"
                    :createTag = "true"
                    @select = handleInputsUpdate
                    @deselect = handleInputsUpdate
                />

                <!-- Experience -->
                <label class="custom-input__label tagline--bold">Experience*</label>
                <Multiselect
                    class="mar__b--2 body user-profile__multiselect mar__b--2"
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
import router from '@/router';
import RoundImage from '@/modules/main/RoundImage';
import Button from '@/common/Button';
import Multiselect from '@vueform/multiselect';
import Swal from "sweetalert2";



export default {
  name: 'UserProfile',
  components: { RoundImage, Button, Multiselect},

  setup() {

    // fetching the user details with default data provided
    const user_image = computed(() =>
            store.state.user_data
            ? store.state.user_data.image_url
            : require('@/assets/default-user-image.png')
        );
    const user = store.state.user_data;
    //recommended interests to pick from
    const interestMenu = reactive({
        options: [
            'Python',
            'JavaScript',
            'TypeScript',
            'C',
            'C++',
            'Java',
            'Ruby',
            'Go',
            'HTML',
            'CSS',
            'Tensorflow',
            'Machine Learning',
            'Frontend',
            'Backend',
            'Fullstack',
            'DevOps',
            'MERN',
            'MEAN',
            'Data Science',
            'Machine Learning',
            'Artificial Intelligence',
            'Data Analytics',
            'NextJS',
            'ReactJS',
            'React Native',
            'Angular',
            'NodeJS',
            'VueJS',
            'MySQL',
            'PostgreSQL',
            'MongoDB',
            'Microsoft Azure',
            'AWS',
            'GCP',
            'Kotlin',
            'Android',
            'iOS',
            'Swift',
            'Flutter',
            'IoT',
            'Cyber Security',
            'Database Design',
            'PHP',
            'SQL',
            'NoSQL',
            'Ruby on Rails',
            'Computer Vision',
            'NLP',
            'Docker',
            'Github',
            'UI/UX',
            'Unit Testing',
            'Computer Graphics',
            'C#',
            'Hadoop',
            'Kafka',
            'Open Source',
            'Kaggle',
            'Bioinformatics',
            'Ethical Hacking',
            'Game Development',
            'Virtual Reality',
            'Augmented Reality',
            'Lua',
            'Elm',
            'MATLAB',
            'Scala'
        ]
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
        backgroundLabel: isUserTalent.value ? 'Current Degree*' : 'Degree / Job Title*',
        backgroundPlaceholder: isUserTalent.value ? 'Computer Science' : 'Software Engineer',
        skillsLabel: isUserTalent.value ? 'Interests*' : 'Skills*',
        skillsPlaceholder: "Enter upto 7 " + (isUserTalent.value ? 'interests' : 'skills')
    }
    const interest_value = computed(() => store.state.user_data.interests);
    const hasDefaultImage = computed(() =>
    store.state.user_data.image_url ==
    "https://firebasestorage.googleapis.com/v0/b/eureka-development-860d4.appspot.com/o/default-user-image.png?alt=media&token=a3a39904-b0f7-4c56-8e76-353efa9b526b");


    // to check if changes were made
    const state = reactive({
        hasUnsavedChanges: false
    })

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
        const file = document.querySelector("#imageUpload").files[0];
        const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (file){
            if (validFileTypes.includes(file.type)) {
                const fileName = new Date() + '-' + file.name;
                const metadata = {contentType:file.type}
                store.dispatch('uploadUserCroppedImage', {file:file, fileName:fileName, metadata:metadata})
                .then(router.push({name:'CropImage'}));
            } else {
                Swal.fire({icon: 'warning', title: "We can't use this file", text: "Please select an image with the right format"});
            }

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

    // checks if mandatory fields are filled
    const allMandatoryFieldsFilled = () =>
            inputValues.background.length === 0 ||
            inputValues.bio.length === 0 ||
            inputValues.interests.length === 0 ||
            inputValues.experience_level === 0;

    // Check bio length
    const isBioLengthValid = () => inputValues.bio.length <= 400;

    const isInputValid = () => {
      const { github_url, linkedin_url, website_url } = inputValues;

      if (
        github_url.length > 0 &&
        !/^(https:\/\/)(www\.?)?github\.com\//.test(github_url)
      ) {
        return false;
      }

      if (
        linkedin_url.length > 0 &&
        !/^(https:\/\/)(www\.?)?linkedin\.com\/in\//.test(linkedin_url)
      ) {
        return false;
      }

      if (website_url.length > 0 && !/^(https?:\/\/)/.test(website_url)) {
        return false;
      }

      return true;
    };

    function handleInfoUpdate() {
        if (allMandatoryFieldsFilled()) {
            Swal.fire({
                icon: 'error',
                title: "Please fill all the mandatory fields",
                text: "They are marked with an asterisk (*) for your convenience"
            })
        }
        else if (!isBioLengthValid()) {
            Swal.fire({
                icon: 'error',
                title: "Please give a shorter bio",
                text: "The bio should be at most 400 characters"
            })
        }
        else if (!isInputValid()) {
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
        user_image,
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
.custom-input {
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  border: 1px solid $color-bg-hover;
  border-radius: 4px;
  &__label {
      color: $color-brand;
  }
  &--disabled {
      background-color: $color-bg-hover;
  }
  &::placeholder {
    color: $color-bg-hover;
  }
}

.custom-file-upload {
    // display: inline-block;
    text-transform: uppercase;
    padding: 5px 30px;
}
#imageUpload {
    display: none;
}
.image-button-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.user-profile {
    display: flex;
    flex-direction: row;
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
    }
    &__inputs {
        display: flex;
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
        &--wrapper{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
}
.user-profile__multiselect {
    width: $multiselect-width;
    &-tag {
        background-color: $color-brand;
    }
}
@media (max-width: 954px) {
    .user-profile__multiselect {
        width: $multiselect-width-sm;
    }
}
@media (max-width: 425px) {
    .user-profile__multiselect {
        width: 100%;
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
        &__content {
            flex-direction: column;
        }
        &__inputs {
            display: flex;
            justify-content: center;
        }
    }
}
</style>
