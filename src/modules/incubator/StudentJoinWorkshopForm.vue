<template>
    <div class="form">
        <div class="section">
            <label for="tags">Tags</label>
            <Multiselect
                class="multiselect"
                v-model="state.selectedTags"
                mode="tags"
                placeholder="Tags"
                :options="state.tags"
                :createTag="true"
            />
            <ErrorMessageComponent
                :error="v$.selectedTags.$errors"
                :silentError="v$.selectedTags.$silentErrors"
            />
        </div>
        <div class="section">
            <label for="tutorial-slot">Tutorial</label>
            <Multiselect
                class="multiselect"
                v-model="state.selectedTutorial"
                placeholder="Tutorial"
                :options="state.tutorial"
            />
            <ErrorMessageComponent
                :error="v$.selectedTutorial.$errors"
                :silentError="v$.selectedTutorial.$silentErrors"
            />
        </div>
        <div class="section">
            <label for="sell-yourself">Sell Yourself</label>
            <textarea
                class="sell-yourself"
                id="sell-yourself"
                v-model="state.sellYourself"
                placeholder="Sell Yourself"
            ></textarea>
            <ErrorMessageComponent
                :error="v$.sellYourself.$errors"
                :silentError="v$.sellYourself.$silentErrors"
            />
            <Button class="submit-button" text="Join" @click="joinWorkspace" />
        </div>
    </div>
</template>

<script lang="ts">
import Button from '@/common/Button.vue';
import { reactive } from 'vue-demi';
import { useVuelidate } from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import Multiselect from '@vueform/multiselect';
import { studentJoinWorkspace } from '@/api/IncubatorApi';
import ErrorMessageComponent from './ErrorMessageComponent.vue';
import router from '@/router';
import Swal from 'sweetalert2';

export default {
    name: 'StudentJoinForm',
    components: { Button, Multiselect, ErrorMessageComponent },
    props: {
        workspaceData: Object,
    },
    setup(props: any) {
        const state = reactive({
            sellYourself: '',
            tags: props.workspaceData?.tags || [],
            tutorial: props.workspaceData?.tutorialSlots || [],
            selectedTags: [],
            selectedTutorial: null,
        });
        const rules = {
            selectedTutorial: {
                required,
            },
            selectedTags: {
                required,
            },
            sellYourself: {
                required,
                minLength: minLength(50),
            },
        };
        const v$ = useVuelidate(rules, state);

        const joinWorkspace = () => {
            if (!v$.value.$invalid) {
                studentJoinWorkspace({
                    workspaceCode: props.workspaceData.code || 'none',
                    sellYourself: state.sellYourself,
                    tags: state.selectedTags.map(
                        (index: number) => state.tags[index]
                    ),
                    tutorialSlots: state.tutorial[state.selectedTutorial || 0],
                    onError: (errorMessage: string) => {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: errorMessage,
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    },
                    onSuccess: () => {
                        router.push(`/incubator/${props.workspaceData.code}`);
                    },
                });
            }
        };

        return { v$, state, joinWorkspace };
    },
};
</script>

<style lang="scss" scoped>
@import '@/common/styles/filter';
.form {
    display: flex;
    max-width: 40%;
    margin: auto;
    height: 100%;
    text-align: start;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .section {
        width: 100%;
        margin-top: 1rem;
    }

    label {
        width: 100%;
        text-align: start;
        margin-bottom: 4px;
    }

    .submit-button {
        margin-top: 1rem;
    }

    .multiselect {
        width: 100%;
    }

    .sell-yourself {
        border: $tag-input-border-radius solid $color-bg-hover;
        box-sizing: border-box;
        text-align: justify;
        padding: 8px;
        width: 100%;
        height: 100px;
    }

    .error-msg {
        width: 100%;
        color: red;
    }

    @media (max-width: 428px) {
        width: 100%;
        max-width: 100%;
    }
}
</style>

userid_timestamp:{ timestamp, userid, message, type, }
