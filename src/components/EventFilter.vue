<template>
    <div class="filter">
        <div class="subheading">Filter</div>
        <hr>
        <div class="filter__inputs">
            <!-- <InputField 
                label='Sort by' 
                type='text' 
                id='sortBy' 
                class="mar__t--1 mar__b--2" 
            /> -->
            <Multiselect
                class="mar__t--2 mar__b--2"
                v-model="filter.type"
                :searchable="true"
                :caret="false"
                placeholder="Type"
                :options="filterOptions.type"
                @select="updateFilter"
                @deselect="updateFilter"
            />
            <Multiselect
                class="mar__t--2 mar__b--2"
                v-model="filter.organizer"
                :searchable="true"
                :caret="false"
                placeholder="Organizer"
                :options="filterOptions.organizer"
                @select="updateFilter"
                @deselect="updateFilter"
            />
            <Multiselect
                class="mar__t--2 mar__b--2"
                v-model="filter.name"
                :searchable="true"
                :caret="false"
                placeholder="Name"
                :options="filterOptions.name"
                @select="updateFilter"
                @deselect="updateFilter"
            />
            <!-- <Toggle 
                label='Favourites' 
                id="waved-at" 
                class="mar__b--2"
            /> -->
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
import store from '@/store';
import Multiselect from '@vueform/multiselect';
// import Toggle from '@/components/Toggle';

export default {
    name: 'EventFilter',
    components: { Multiselect },
    setup(_, context) {

        // reactive filter data point
        const filter = reactive({
            type: '',
            organizer: '',
            name: ''
        })

        // using a duplicate of filter to pass values to the parent
        let filterToEmit = {
            type: '',
            organizer :'',
            name: ''
        }

        // get the filter value
        const filterOptions = ref(store.state.filters.event);       

        // passing the filter data to the parent
        const updateFilter = () => {
            // populating the filter object to return to parent
            Object.keys(filter).forEach(function(key) {
                if (Number.isInteger(filter[key])){ 
                    // convert index number to actual value
                    filterToEmit[key] = filterOptions.value[key][filter[key]];
                } else {
                    // empty string for rest
                    filterToEmit[key] = '';
                }                      
            });           

            context.emit('update-filter', filterToEmit);
        }

        return {
            filter,
            filterOptions,
            updateFilter
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/filter';
</style>