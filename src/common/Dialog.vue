<template>
  <transition name="modal-transition">
    <div class="modal__backdrop">
      <div class="modal pad--3">
        <!-- Header -->
        <header class="modal__header pad--1">
          <div class="heading">
            <slot name="header">
              Submit File
            </slot>
          </div>
          <div class="modal__button cursor__pointer" @click="close">
            <b>X</b>
          </div>
        </header>
        <!-- File Upload Component -->
        <section class="modal__body">
          <slot name="body">
            <div class="file-upload">
              <input
                :id="file_Upload"
                type="file"
                name="fileUpload"
                @change="filePreview"
                multiple
              />
              <label
                :for="file_Upload"
                name="fileDrag"
                class="file-upload__label"
              >
                <img
                  src="@/assets/file-upload.svg"
                  alt="Preview"
                  class="mar__b--2"
                />
                <div class="file-upload__start">
                  <div class="mar__b--2">Select a file or drag here</div>
                  <span class="tagline text--capsule cursor__pointer"
                    >Select a File</span
                  >
                </div>
              </label>
            </div>
          </slot>
        </section>
        <!-- File names for preview -->
        <div v-for="(file, key) in files" :key="key">
          <div class="modal__preview mar--2">
            <div>{{ file.name }}</div>
          </div>
        </div>

        <Button
          text="Submit"
          type="submit"
          class="modal__button--submit"
          @click.prevent="handleSubmit"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import store from "@/store";
import Button from "@/common/Button.vue";
import Swal from "sweetalert2";
import { defineComponent } from 'vue';

export default defineComponent({
  name: "BaseDialog",
  components: {
    Button,
  },
  props: {
    file_Upload: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      files: [],
      preview_files: [],
      file_upload: []
    };
  },
  methods: {
    close() {
      // Closes the Dialog, clears off any temporary files used for preview
      this.$emit("close");
      this.files = [];
      this.file_upload = [];
    },
    filePreview(e) {
      // pushes all selected files into main file instance variable, to prep for file upload
      const selectedFiles = e.target.files;
      this.files = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        this.files.push(selectedFiles[i]);
      }
      console.log(this.files)
    },
    handleSubmit() {
      // Pushes all files to upload payload and clears temporary instance variable
      this.file_upload = [];
      console.log(this.files)
      for (let i = 0; i < this.files.length; i++) {
        const fileName = new Date() + '-' + this.files[i].name
        const metaData = { contentType: this.files[i].type }
        this.file_upload.push({file: this.files[i], fileName: fileName, metadata: metaData})
      }
      this.files = [];
      // Uploads all files from payload instance to firebase
      store.dispatch('uploadFiles', this.file_upload).then(() => {
        // Checks if file uploaded successfully and outputs respective results
        if (store.state.process_status === true) {
          Swal.fire({
            icon: 'success',
            title: 'File Upload Success!',
            text: 'Press OK to continue'
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'File Upload Failed!',
            text: 'There seems to be something wrong'
          })
        }
      })
    },
  },
});
</script>

<style lang="scss">
.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;

  &__backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__body {
    padding: 20px 10px;
    margin-left: auto;
    margin-right: auto;
  }

  &__footer {
    padding: 15px;
    display: flex;
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  &__button {

    width: 20px;

    &--submit {
      margin-top: 10px;
      margin-bottom: 20px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  &__preview {
    text-align: center;
  }
}

.modal-transition-enter,
.modal-transition-leave-to {
  opacity: 0;
}
.modal-transition-enter-active,
.modal-transition-leave-active {
  transition: opacity 0.5s ease;
}

.file-upload {
  display: block;
  clear: both;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;

  &__label {
    float: left;
    clear: both;
    padding: 2rem 1.5rem;
    text-align: center;
    background: #ffffff;
    border-radius: 7px;
    border: 3px solid #eee;
    transition: all 0.2s ease;
    user-select: none;
    margin: auto;

    &:hover {
      border-color: #454cad;
    }
    &.hover {
      border: 3px solid #454cad;
      box-shadow: inset 0 0 0 6px #eee;
    }
  }

  input[type="file"] {
    display: none;
  }
}
</style>
