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
    setup(props, context) {

        // reactive filter data point
        const filter = reactive({
            type: '',
            organizer: '',
            name: ''
        })

        let newFilter = {
            type: '',
            organizer :'',
            name: ''
        }

        // get the filter value
        const filterOptions = ref(store.state.filters.event);

        

        // passing the filter data to the parent
        const updateFilter = () => {
            // replacing null fields with empty string 
            Object.keys(filter).forEach(function(key) {
                if (Number.isInteger(filter[key])){
                    console.log('before' + filter[key]) 
                    console.log(filterOptions.value[key][filter[key]])
                    console.log(key) 
                    newFilter[key] = filterOptions.value[key][filter[key]];
                }                      
            });
            console.log('filter ' + newFilter);
            

            context.emit('update-filter', newFilter);
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