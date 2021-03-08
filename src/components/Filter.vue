<template>
    <div class="filter">
        <div class="subheading">Filter</div>
        <hr>
        <div class="filter__inputs">
            <Multiselect
                class="mar__t--2 mar__b--2"
                v-model="filter.interests"
                :searchable="true"
                :caret="false"
                placeholder="Interest"
                :options='user?.interests'
                @select="updateFilter"
                @deselect="updateFilter"
            />
            <Multiselect
                class="mar__t--2 mar__b--2"
                v-model="filter.experience_level"
                :searchable="true"
                :caret="false"
                placeholder="Experience"
                :options="filterOptions.experience_level"
                @select="updateFilter"
                @deselect="updateFilter"
            />
            <Multiselect
                class="mar__t--2 mar__b--2"
                v-model="filter.background"
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
                v-model="filter.full_name"
                :searchable="true"
                :caret="false"
                placeholder="Name"
                :options="filterOptions.full_name"
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
s
<script>
import { ref, reactive, computed } from 'vue';
import store from '@/store';
import Multiselect from '@vueform/multiselect';
// import Toggle from '@/components/Toggle';

export default {
    name: 'Filter',
    components: { Multiselect },
    setup(props, context) {

        // reactive filter data point
        const filter = reactive({
            interests: '',
            experience_level: '',
            background: '',
            // event: '',
            full_name: '',
        })

        let newFilter = {
            interests: '',
            experience_level: '',
            background: '',
            // event: '',
            full_name: '',
        }

        const filterOptions = ref(store.state.filters.talent);
        console.log(filterOptions.value.interests)

        const user = computed(() => store.state.user_data);

        // passing the filter data to the parent
        const updateFilter = () => {
            // replacing null fields with empty string 
            Object.keys(filter).forEach(function(key) {
                if (Number.isInteger(filter[key])){ 
                    newFilter[key] = filterOptions.value[key][filter[key]];
                }
                else {
                    newFilter[key] = '';
                }                      
            });           

            context.emit('update-filter', newFilter);
        }

        return {
            filter,
            filterOptions,
            user,
            updateFilter
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/filter';
</style>