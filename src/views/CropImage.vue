<template>
  <div class="cropper__wrapper">
    <cropper 
        class="image no-transition mar__t--1" 
        :src="img" 
        :stencil-props="{
            aspectRatio: 1/1
        }"
        @change = "change" 
        transitions='false'
    />
    <div v-if="img.length===0" class="subheading mar__t--2">Loading..</div>
    <Button class="mar__t--1" text="Crop" @click='cropAndUpload'  />
  </div>
  
</template>

<script>
import { ref, computed } from 'vue';
import store from '@/store';
import router from '@/router';
import Swal from 'sweetalert2';
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import Button from '@/common/Button.vue';
export default {
    name: 'CropImage',
    components: {
		Cropper,Button
	},
    setup() {
        const img = computed(() => store.state.upload_image.url ? store.state.upload_image.url : '');
        // filename of image to help with storage delete
        const fileName = computed(() => store.state.upload_image.fileName);
        const croppedCanvas = ref("");
        const croppedCoordinates = ref("");

        const change = ({ coordinates, canvas }) => {
            croppedCanvas.value = canvas;
            croppedCoordinates.value = coordinates;
		}

        const cropAndUpload = () => {
            if(croppedCoordinates.value.width == croppedCoordinates.value.height){
                var image_url = croppedCanvas.value.toDataURL("image/jpeg");
                store.dispatch('setUserImageURL', image_url);
                store.dispatch('deleteProfileImageFromStorage', fileName.value);
            }else{
                Swal.fire({icon: 'error', title: "Sorry!", text: "Your picture is not within supported size format."});
                router.push({ path: '/profile'});
            }
        }

        return {
            img,
            change,
            cropAndUpload
        }
    }
}
</script>

<style lang="scss" scoped>
.cropper__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    .image {
        height:300px;
    }
}
</style>