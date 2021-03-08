<template>
  <div>
    <Button class="btn-crop" text="Crop" @click='cropAndUpload'  />
    <cropper 
        class="image" 
        :src="img" 
        @change = "change" 
        maxWidth='1280' 
        maxHeight='1280'
        minWidth= '1280'
        minHeight='1280'
        transitions='false'/>

  </div>
  
</template>

<script>
import Button from '@/components/Button';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import store from '@/store';
import Swal from 'sweetalert2';
import router from '@/router';
export default {
  name: 'CropImage',
  components: {
		Cropper,Button
	},
	data() {
		return {
			img: store.state.upload_image_url,
            croppedCanvas:"",
            croppedCoordinates:""
		};
	},
	methods: {
		change({ coordinates, canvas }) {
            console.log(coordinates);
            console.log(coordinates.width)
			console.log(coordinates, canvas);
            this.croppedCanvas = canvas;
            this.croppedCoordinates = coordinates;
		},
        cropAndUpload(){
            if(this.croppedCoordinates.width == this.croppedCoordinates.height){
                var image_url = this.croppedCanvas.toDataURL("image/jpeg");
                console.log(image_url)
                store.dispatch('setUserImageURL', image_url);
            }else{
                Swal.fire({icon: 'error', title: "Sorry!", text: "Your picture is not within supported size format."});
                router.push({ path: '/profile'});
            }


        }
	},
}
</script>

<style lang="scss" scoped>
.image{
  width:max-content;
  height:max-content;
}
.btn-crop{
    display:fixed;
    margin-left: 0;
}
</style>