<template>
    <div class="lecturer-settings">
        <label for="name">Workspace Name</label>
        <input
            id="name"
            type="text"
            placeholder="Workspace Name"
            v-model="state.name"
        />
        <ErrorMessageComponent
            v-if="v$.name.$error"
            :errors="v$.name.$errors"
        />

        <label for="max_member">Max Member Per Team</label>
        <input
            id="max_member"
            type="number"
            placeholder="Max Member Per Team"
            v-model="state.maxMemberPerTeam"
            min="1"
        />
        <ErrorMessageComponent
            v-if="v$.maxMemberPerTeam.$error"
            :errors="v$.maxMemberPerTeam.$errors"
        />

        <label for="max_number_of_teams">Max Number Of Teams</label>
        <input
            id="max_number_of_teams"
            type="number"
            placeholder="Max Member Per Team"
            v-model="state.maxNumberOfTeams"
            min="1"
        />
        <ErrorMessageComponent
            v-if="v$.maxNumberOfTeams.$error"
            :errors="v$.maxNumberOfTeams.$errors"
        />

        <label for="team_creation_deadline">Team Creation Deadline</label>
        <input
            id="team_creation_deadline"
            type="date"
            placeholder="Team Creation Deadline"
            v-model="state.teamCreationDeadline"
        />
        <ErrorMessageComponent
            v-if="v$.teamCreationDeadline.$error"
            :errors="v$.teamCreationDeadline.$errors"
        />

        <label for="team_adjourning_date">Team Adjourning Date</label>
        <input
            id="team_adjourning_date"
            type="date"
            placeholder="Team Adjourning Date"
            v-model="state.teamAdjourningDate"
        />
        <ErrorMessageComponent
            v-if="v$.teamAdjourningDate.$error"
            :errors="v$.teamAdjourningDate.$errors"
        />

        <label for="peer_review_day_duration">Peer Review Day Duration</label>
        <input
            id="peer_review_day_duration"
            type="number"
            placeholder="Peer Review Day Duration"
            min="1"
            v-model="state.peerReviewDurationInDays"
        />
        <ErrorMessageComponent
            v-if="v$.peerReviewDurationInDays.$error"
            :errors="v$.peerReviewDurationInDays.$errors"
        />

        <div class="tags-container">
            <label for="tags" style="margin-bottom: 4px">Tags</label>
            <TagInput
                id="tags"
                placeholder="Enter A tag"
                @update-tags="onAddTags"
            />
            <ErrorMessageComponent
                v-if="v$.tags.$error"
                :errors="v$.tags.$errors"
            />
        </div>

        <div class="tags-container">
            <label for="tutorial-slots" style="margin-bottom: 4px">
                Tutorial Slots
            </label>
            <TagInput
                id="tutorial-slots"
                placeholder="Tutorial Slots"
                @update-tags="onAddTutorial"
            />
            <ErrorMessageComponent
                v-if="v$.tutorialSlots.$error"
                :errors="v$.tutorialSlots.$errors"
            />
        </div>

        <Button
            class="submit-button"
            :text="'Create Workspace'"
            v-on:click="submitSettings($event)"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TagInput from '@/common/TagInput.vue';
import { reactive } from 'vue-demi';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import Button from '@/common/Button.vue';
import ErrorMessageComponent from '@/modules/incubator/ErrorMessageComponent.vue';
import { createWorkSpace } from '@/api/IncubatorApi';
import Swal from 'sweetalert2';
import router from '@/router';
export default defineComponent({
    components: { TagInput, Button, ErrorMessageComponent },
    name: 'LecturerSettingsPage',
    setup() {
        const state = reactive<{
            name: string;
            maxMemberPerTeam?: number;
            maxNumberOfTeams?: number;
            teamCreationDeadline?: Date;
            teamAdjourningDate?: Date;
            peerReviewDurationInDays?: number;
            tags?: string[];
            tutorialSlots?: string[];
        }>({
            name: '',
        });

        const onAddTags = (e: string[]) => {
            state.tags = e;
        };

        const onAddTutorial = (e: string[]) => {
            state.tutorialSlots = e;
        };

        const rules = {
            name: { required },
            maxMemberPerTeam: { required },
            maxNumberOfTeams: { required },
            teamCreationDeadline: { required },
            teamAdjourningDate: { required },
            peerReviewDurationInDays: { required },
            tutorialSlots: { required },
            tags: { required },
        };
        const v$ = useVuelidate(rules as any, state);

        const submitSettings = () => {
            v$.value.$validate();
            if (!v$.value.$invalid) {
                createWorkSpace({
                    workshopSettings: {
                        name: state.name,
                        maxNumberOfTeams: Number(state.maxNumberOfTeams) || 0,
                        maxMemberPerTeam: Number(state.maxMemberPerTeam) || 0,
                        teamCreationDeadline: new Date(
                            state.teamCreationDeadline || ''
                        ),
                        teamAdjourningDate: new Date(
                            state.teamAdjourningDate || ''
                        ),
                        peerReviewDurationInDays:
                            Number(state.peerReviewDurationInDays) || 0,
                        tutorialSlots: state.tutorialSlots || [],
                        tags: state.tags || [],
                    },
                    onSuccess: code => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Workshop Created',
                            showConfirmButton: false,
                            timer: 2000,
                        }).then(() => router.push(`/incubator/${code}`));
                    },
                });
            }
        };
        return { v$, state, submitSettings, onAddTags, onAddTutorial };
    },
});
</script>

<style lang="scss" scoped>
.lecturer-settings {
    display: flex;
    margin: auto;
    width: 60%;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1rem;

    label {
        padding-left: 4px;
        margin-bottom: 4px;
    }

    input {
        margin-bottom: 10px;
        width: $tag-input-width;
        border: $tag-input-border-radius solid $color-bg-hover;
        height: $tag-input-height;
        box-sizing: border-box;
        padding: $tag-input-padding;
    }

    .tags-container {
        margin-bottom: 1rem;
    }

    .submit-button {
        margin: 1rem 0;
    }

    @media (max-width: 428px) {
        width: 100%;
        margin-left: auto;
    }
}
</style>
