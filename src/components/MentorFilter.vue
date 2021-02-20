<template>
    <div class="filter">
        <div class="subheading">Filter</div>
        <hr>
        <div class="filter__inputs">
            <!-- <InputField 
                label='Skills' 
                type='text' 
                id='interests' 
                class="mar__t--1 mar__b--2" 
            /> -->
            <Multiselect
                class="mar__t--2 mar__b--2"
                v-model="filter.skill"
                :searchable="true"
                :caret="false"
                placeholder="Skill"
                :options="{
                    python: 'Python', 
                    consumerism: 'Consumerism', 
                    tensorflow: 'TensorFlow'
                }"
                @select="updateFilter"
                @deselect="updateFilter"
            />
            <Multiselect
                class="mar__t--2 mar__b--2"
                v-model="filter.experience"
                :searchable="true"
                :caret="false"
                placeholder="Experience"
                :options="{
                    '1': 'Beginner', 
                    '2': 'Intermediate', 
                    '3': 'Advanced'
                }"
                @select="updateFilter"
                @deselect="updateFilter"
            />
            <Multiselect
                class="mar__t--2 mar__b--2"
                v-model="filter.job_title"
                :searchable="true"
                :caret="false"
                placeholder="Degree"
                :options="{
                    data_science: 'Data Science', 
                    computer_science: 'Computer Science', 
                    software_engineering: 'Software Engineering'
                }"
                @select="updateFilter"
                @deselect="updateFilter"
            />
            <Multiselect
                class="mar__t--2 mar__b--2"
                v-model="filter.name"
                :searchable="true"
                :caret="false"
                placeholder="Name"
                :options="{
                    yasheen_peiris: 'Yasheen Peiris', 
                    mike_kevin_balapitiya: 'Mike Kevin Balapitiya', 
                    jun_ming_khong: 'Jun Ming Khong',
                    nitin_mathew: 'Nitin Mathew',
                    tommy_mcwell: 'Tommy McWell'
                }"
                @select="updateFilter"
                @deselect="updateFilter"
            />
            <!-- <Toggle 
                label='Waved at' 
                id="waved-at" 
                class="mar__b--2"
            /> -->
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import Multiselect from '@vueform/multiselect';
// import Toggle from '@/components/Toggle';

export default {
    name: 'MentorFilter',
    components: { Multiselect },
    setup(props, context){
        // reactive filter data point
        const filter = reactive({
            skill: '',
            experience: '',
            job_title: '',
            name: ''
        })

        // passing the filter data to the parent
        const updateFilter = () => {
            // replacing null fields with empty string 
            Object.keys(filter).forEach(function(key) {
                if (filter[key] == null) filter[key] = ''
            });

            context.emit('update-filter', filter);
        }

        return {
            filter,
            updateFilter
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/filter';
</style>