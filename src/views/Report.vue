<template>
  <div class="feedback page-pad">
    <div class="feedback__content text--center">
      <div class="feedback__content--title mar__b--3 text--center">
        <div class="heading">Report</div>
        <div class="feedbackForm">
          <form class="review-form mar__t--3" @submit.prevent="handleSubmit">
            <p>Reporting {{ target }} as {{ reporter }}</p>
            <input
              type="text"
              placeholder="Subject"
              v-model="state.subject"
              required
            />
            <textarea
              id="feedback__message"
              class="body"
              placeholder="Message"
              v-model="state.message"
              required
            />
            <Button
              text="Submit"
              class="mar--auto mar__t--3 mar__b--1"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { reactive } from "vue";
import Button from "@/common/Button.vue";
import Swal from "sweetalert2";
import { reportFunction } from "../api/IncubatorApi";

export default {
  name: "Report",
  components: { Button },
  props: {
    reporter: String,
    reporterId: String,
    target: String,
    targetId: String,
    workspaceId: String,
    onSubmitSuccess: Function,
  },
  setup(props: any) {
    // reactive filter data point
    const state = reactive({
      subject: "",
      message: "",
    });

    const handleSubmit = () => {
      if (state.subject !== "" && state.message !== "") {
        reportFunction({
          subject: state.subject,
          message: state.message,
          workshopId: props.workshopId,
          reporterId: props.reporterId,
          targetId: props.targetId,
          onSuccess: () => {
            Swal.fire({
              icon: "success",
              text: "Your report is sent",
            });
          },
          onError: () => {
            Swal.fire({
              icon: "warning",
              title: "Oops...",
              text: "Something went wrong",
            });
          },
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Please fill all fields",
        });
      }
    };

    return {
      state,
      handleSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
input {
  outline: none;
  width: 100%;
  box-sizing: border-box;
  margin: 1rem 0;
  padding: 10px;
}
.feedback__content {
  max-width: $feedback-max-width;
  margin-left: auto;
  margin-right: auto;
}
#feedback__message {
  width: $feedback-message-width;
  height: $feedback-message-height;
  padding: $feedback-message-padding;
}
textarea {
  resize: vertical;
  outline: none;
}
</style> 