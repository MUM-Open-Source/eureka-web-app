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
                :options="{
                    hackathon: 'Hackathon',
                    datathon: 'Datathon',
                    workshop: 'Workshop',
                    panel_talk: 'Panel Talk'
                }"
                @select="updateFilter"
                @deselect="updateFilter"
            />
            <Multiselect
                class="mar__t--2 mar__b--2"
                v-model="filter.organizer"
                :searchable="true"
                :caret="false"
                placeholder="Organizer"
                :options="{
                    monash_university: 'Monash University',
                    jolliebean: 'Jolliebean'
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
                    quick_hack: 'Quick Hack',
                    quickly_hack: 'Quickly Hack',
                    hack_the_sea: 'Hack The SEA'
                }"
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
import { reactive } from 'vue';
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