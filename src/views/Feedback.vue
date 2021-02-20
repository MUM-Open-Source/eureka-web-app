<template>
    <div class="feedback page-pad">   
        <div class="feedback__content text--center">
            <div class="feedback__content--title mar__b--3 text--center">
                <div class="heading">Send us your feedback!</div>
            <div class="feedbackForm">
                <form class="review-form mar__t--3" @submit.prevent="handleSubmit">
                    <Multiselect
                        class="mar__t--2 mar__b--2"
                        v-model="feedback.subject"
                        :searchable="false"
                        placeholder="Subject"
                        :options="{
                            feature_request: 'Feature Request', 
                            bug: 'Bug', 
                            general: 'General'
                        }"
                        :canDeselect="false"
                    />
                    <textarea 
                        id="feedback__message" 
                        class="body" 
                        placeholder="Message" 
                        v-model="feedback.message"
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

<script>
import { reactive } from 'vue';
import store from '@/store';
import Multiselect from '@vueform/multiselect';
import Button from '@/components/Button';

export default {
  
    name: 'FeedbackUI',
    components: { Multiselect, Button },
    
    setup() {
        // reactive filter data point
        const feedback = reactive({
            subject: '',
            message: ''
        })

        const handleSubmit = () => {
            if (feedback.subject !== '' && feedback.message !== '') {
                store.dispatch('sendFeedback', {subject: feedback.subject, message: feedback.message})
                feedback.subject = ''
                feedback.message = ''
            } else {
                alert('Please fill all fields');
            } 
        }

        return {
            feedback,
            handleSubmit
        }
    }
}
</script>

<style lang="scss" scoped>
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
    border-color: $color-side-nav-bg-hover;
}
</style> 