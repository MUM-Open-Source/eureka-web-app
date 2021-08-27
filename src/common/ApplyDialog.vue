<template>
    <div class="modal-frame">
        <header class="modal__header">
            <div class="subheading">
                You are applying for {{ props.project.project_name }} under the
                supervision of
                {{ props.project.supervisor }}
            </div>
        </header>
        <div class="body pad__t--1">
            Please compress your file into a single folder if you need to submit
            multiple files.
        </div>

        <div
            class="mar__b--2 mar__t--2"
            style="
                border: 0.1rem solid grey;
                border-radius: 0.5rem;
                padding-bottom: 1rem;
                padding-top: 0.3rem;
                padding-left: 0.8rem;
            "
        >
            <div v-if="state.files.length === 0" class="modal__preview mar--1">
                No Files Selected Yet
            </div>
            <div
                v-else
                v-for="(file, key) in state.files"
                :key="key"
                class="modal__preview mar--1"
            >
                <span>{{ file.name }}</span>
            </div>
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
                    <div class="file-upload__start">
                        <span class="tagline text--capsule cursor__pointer">
                            Select a File
                        </span>
                    </div>
                </label>
            </div>
        </div>

        <Button
            text="Submit"
            type="submit"
            class="modal__button--submit"
            @click.prevent="submitFiles"
        />
    </div>
</template>

<script lang='ts'>
import Button from '@/common/Button.vue';
import Swal from 'sweetalert2';
import { defineComponent, reactive } from 'vue';
import { studentUploadDocuments } from '@/modules/recruitment/recruitmentAPi';

export default defineComponent({
    name: 'ApplyDialog',
    components: {
        Button,
    },
    props: {
        project: {
            type: Object,
            required: true,
        },
        involvement: {
            type: Object,
            required: true,
        },
        file_Upload: {
            type: String,
            required: true,
        },
    },
    setup(props, context) {
        const state = reactive({
            files: [],
        });

        const filePreview = (e: any) => {
            // pushes all selected files into main file instance variable, to prep for file upload
            const selectedFiles = e.target.files;
            state.files = [];
            for (let i = 0; i < selectedFiles.length; i++) {
                state.files.push(selectedFiles[i] as never);
            }
        };

        const submitFiles = () => {
            const { user_id, research_id, user_name } = props.involvement;
            studentUploadDocuments({
                user_id,
                user_name,
                research_id,
                files: state.files.map((file: any) => ({
                    filename: (new Date() + '-' + file.name) as any,
                    metadata: { contentType: file.type } as any,
                    file: file as any,
                })),
            }).then(() => {
                context.emit('close');
                Swal.fire({
                    icon: 'success',
                    title: 'File Upload Success!',
                    text: 'Press OK to continue',
                }).then(() => context.emit('close'));
            });
        };

        return {
            state,
            filePreview,
            submitFiles,
            props,
        };
    },
});
</script>

<style lang="scss">
.modal-frame {
    padding: 1rem;
}
.modal {
    padding: 1rem;
    overflow-x: auto;
    display: flex;
    border-radius: 1rem;
    flex-direction: column;
    width: 30%;
    z-index: 4;

    @media (max-width: 428px) {
        width: 90%;
    }

    &__button {
        width: 25px;

        &--submit {
            margin-top: 30px;
        }
    }
}

.file-upload {
    display: block;
    clear: both;
    margin: 0 auto;
    width: 100%;

    input[type='file'] {
        display: none;
    }
}
</style>
