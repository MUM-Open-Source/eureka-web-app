<template>
    <div class="student-lists">
        <div class="leading">
            <div class="pad--1">
                <div>{{ student.user_name }}</div>
                <div>{{ student.user_email }}</div>
                <div>{{ dateDisplayer() }}</div>
            </div>
            <div
                class="tagline text--capsule cursor__default"
                style="width: fit-content"
            >
                {{ statusDisplayer }}
            </div>
        </div>
        <div class="trailing" v-if="studentInterested || studentApplication">
            <IconButton @click="() => rejectButtomClicked(student)">
                <fa icon="times" />
            </IconButton>
            <IconButton @click="() => checkedButtonClicked(student)">
                <fa icon="check" />
            </IconButton>
            <IconButton
                v-if="studentApplication"
                @click="() => checkedButtonClicked(student)"
            >
                <fa icon="file-download" />
            </IconButton>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import IconButton from '@/modules/admin/IconButton.vue';
import {
    RESEARCH_APPLICATION_ACCEPTED,
    RESEARCH_APPLY,
    RESEARCH_INTEREST,
    RESEARCH_INTEREST_ACCEPTED,
    RESEARCH_REJECTED,
} from '../constants';
import { updateStudentInvolvements } from './recruitmentAPi';
import Swal from 'sweetalert2';

export default defineComponent({
    name: 'ProjectDetailsStudentList',
    props: {
        student: Object,
    },
    components: { IconButton },
    setup(props) {
        const studentInterested = computed(
            () => props.student?.statusCode == RESEARCH_INTEREST
        );

        const studentApplication = computed(
            () => props.student?.statusCode == RESEARCH_APPLY
        );
        const interestedAccepted = computed(
            () => props.student?.statusCode == RESEARCH_INTEREST_ACCEPTED
        );
        const applicationAccepted = computed(
            () => props.student?.statusCode == RESEARCH_APPLICATION_ACCEPTED
        );

        const statusDisplayer = computed(() => {
            if (studentInterested.value) return 'Student Interested';
            else if (interestedAccepted.value) return 'Interest Accepted';
            else if (studentApplication.value) return 'New Applicant';
            else if (applicationAccepted.value) return 'Application Accepted';
            else return 'Rejected';
        });

        const onApprove = () => {
            Swal.fire({
                icon: 'success',
                title: 'Your Decision is Recorded',
                text: 'The student will receieve an email soon',
            });
        };

        const rejectButtomClicked = () => {
            updateStudentInvolvements({
                user_id: props.student?.user_id,
                research_id: props.student?.research_id,
                statusCode: RESEARCH_REJECTED,
            }).then(onApprove);
        };

        const checkedButtonClicked = () => {
            const { user_id, research_id }: any = props.student;
            if (studentInterested.value) {
                updateStudentInvolvements({
                    statusCode: RESEARCH_INTEREST_ACCEPTED,
                    research_id,
                    user_id,
                }).then(onApprove);
            } else if (studentApplication.value) {
                updateStudentInvolvements({
                    statusCode: RESEARCH_APPLICATION_ACCEPTED,
                    research_id,
                    user_id,
                }).then(onApprove);
            }
        };

        const dateDisplayer = () => {
            const { student } = props;
            const { seconds } =
                student?.updateLog[student.updateLog.length - 1].time;
            return new Date(seconds * 1000).toString().substring(0, 16);
        };
        return {
            RESEARCH_APPLY,
            RESEARCH_INTEREST,
            statusDisplayer,
            studentInterested,
            studentApplication,
            interestedAccepted,
            applicationAccepted,
            rejectButtomClicked,
            checkedButtonClicked,
            dateDisplayer,
            ...props,
        };
    },
});
</script>

<style lang="scss" scoped>
.student-lists {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 0.2rem solid $color-side-nav-bg;
    cursor: pointer;
}

.leading {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    align-content: center;
}

.trailing {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $color-side-nav-bg;
}
</style>
