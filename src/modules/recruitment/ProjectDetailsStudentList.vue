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
                {{ statusDisplayer(student) }}
            </div>
        </div>
        <div class="trailing" v-if="studentApplication || studentInterested">
            <IconButton @click="() => rejectButtomClicked(student)">
                <fa icon="times" />
            </IconButton>
            <IconButton @click="() => checkedButtonClicked(student)">
                <fa icon="check" />
            </IconButton>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconButton from '@/modules/admin/IconButton.vue';
import {
    RESEARCH_APPLICATION_ACCEPTED,
    RESEARCH_APPLY,
    RESEARCH_INTEREST,
    RESEARCH_INTEREST_ACCEPTED,
} from '../constants';

export default defineComponent({
    name: 'ProjectDetailsStudentList',
    props: {
        student: Object,
    },
    components: { IconButton },
    setup(props) {
        const studentInterested =
            props.student?.statusCode == RESEARCH_INTEREST;
        const studentApplication = props.student?.statusCode == RESEARCH_APPLY;
        const interestedAccepted =
            props.student?.statusCode == RESEARCH_INTEREST_ACCEPTED;
        const applicationAccepted =
            props.student?.statusCode == RESEARCH_APPLICATION_ACCEPTED;

        const statusDisplayer = () => {
            if (studentInterested) return 'Student Interested';
            else if (interestedAccepted) return 'Interest Accepted';
            else if (studentApplication) return 'New Applicant';
            else if (applicationAccepted) return 'Application Accepted';
            else return 'Rejected';
        };

        const dateDisplayer = () => {
            const { student } = props;
            return new Date(student?.updateLog[student.updateLog.length - 1])
                .toString()
                .substring(0, 16);
        };
        return {
            RESEARCH_APPLY,
            RESEARCH_INTEREST,
            statusDisplayer,
            studentInterested,
            studentApplication,
            interestedAccepted,
            applicationAccepted,
            dateDisplayer,
            ...props,
        };
    },
});
</script>

<style lang="scss" scoped>
</style>
