<template>
    <div class="filter">
        <div class="subheading">Filter</div>
        <hr>
        <div class="filter__inputs">
            <Multiselect
                class="mar__t--2 mar__b--2"
                v-model="filter.interest"
                :searchable="true"
                :caret="false"
                placeholder="Interest"
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
                v-model="filter.degree"
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
            <!-- <Multiselect
                class="mar__t--2 mar__b--2"
                v-model="filter.event"
                :searchable="true"
                :caret="false"
                placeholder="Event"
                :options="{
                    event: 'QuickHack'
                }"
                @select="updateFilter"
                @deselect="updateFilter"
            /> -->
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
    name: 'Filter',
    components: { Multiselect },
    setup(props, context) {

        // reactive filter data point
        const filter = reactive({
            interest: '',
            experience: '',
            degree: '',
            event: '',
            name: '',
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