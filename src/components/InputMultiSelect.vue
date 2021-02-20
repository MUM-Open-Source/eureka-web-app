<template>
    <div>
        <label class="tagline">Select your interests</label>
        <Multiselect 
            v-model="value"
            mode="tags"
            :searchable="true"
            :options="options"
            max="5"
            placeholder="Enter upto 5 values"
            class="body user-profile__multiselect"
        />
        <!-- These values are accessible using {{ value }} -->
    </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';

export default {
    name: 'InputMultiSelect',
    components: { Multiselect },
    props: { values: Array },
    data() {
      return {
        value: this.values,
        options: [
            { value: 'python', label: 'Python' },
            { value: 'javascript', label: 'JavaScript' },
            { value: 'typescript', label: 'TypeScript' },
            { value: 'html', label: 'HTML' },
            { value: 'css', label: 'CSS' },
            { value: 'tensorflow', label: 'TensorFlow' },
            { value: 'computer-vision', label: 'Computer Vision'},
        ]
      }
    }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang='scss'>
@import '@/styles/components/input_multiselect';
</style>