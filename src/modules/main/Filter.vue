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
                :options='filterOptions.interests'
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
                :options="filterOptions.background"
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
import { reactive } from 'vue';
import Multiselect from '@vueform/multiselect';
// import Toggle from '@/components/Toggle';

export default {
    name: 'Filter',
    components: { Multiselect },
    props: {
        filterOptions: {
            type: Object,
            required: true
        }
    },
    setup(props, context) {

        // reactive filter data point
        const filter = reactive({
            interests: '',
            experience_level: '',
            background: '',
            // event: '',
            full_name: '',
        })

        // using a duplicate of filter to pass values to the parent
        let filterToEmit = {
            interests: '',
            experience_level: '',
            background: '',
            // event: '',
            full_name: '',
        }

        // passing the filter data to the parent
        const updateFilter = () => {
            // populating the filter object to return to parent
            Object.keys(filter).forEach(function(key) {
                if (Number.isInteger(filter[key])){ 
                    if (key === 'experience_level') {
                        // return the xp lvl as an integer + 1
                        filterToEmit[key] = filter[key]+1;
                    } else {
                        // convert index number to actual value
                        filterToEmit[key] = props.filterOptions[key][filter[key]];
                    }
                }
                else {
                    // empty string for rest
                    filterToEmit[key] = '';
                }                      
            });           

            context.emit('update-filter', filterToEmit);
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