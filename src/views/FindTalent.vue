<template>
    <div class="find-talent page-pad">
        <!-- Filter passing data -->
        <Filter 
            :filterOptions="filterOptions"
            @update-filter="updateFilter"
        />    
        <div class="find-talent__content">
            <div class="find-talent__content--title mar__b--3 text--center">
                <div class="tagline">Current Students</div>
                <div class="heading">Talent</div>
            </div>
            <div class="talents">
                <div v-if="!filteredTalent.length" class="heading text--center">
                    <img class="img_not_found" src="@/assets/search-result-not-found.png"><br>
                    <div class="not-found-caption">No Talents Found...</div>
                </div>
                <ProfileCard 
                    v-for="user in filteredTalent" 
                    :key="user.key"
                    :user="user"
                />
            </div>
        </div>
    </div> 
</template>

<script>
import { onMounted, ref } from 'vue';
import store from '@/store';
import ProfileCard from '@/modules/main/ProfileCard.vue';
import Filter from '@/modules/main/Filter.vue';

export default {
    name: 'FindTalent',
    components: { ProfileCard, Filter },
    setup() {

        // mounted
        onMounted(() => {
            // fetch the data if there is nothing to display
            if (!store.state.talent.length) {
                store.dispatch('getTalent');
            }
        })
        
        const filter = ref({});
        // the input to the ProfileCard
        const filteredTalent = ref(store.state.talent);
        // input to the filter
        const filterOptions = ref(store.state.filters.talent);

        // updating the filter and array of users
        function updateFilter(latestFilters) {
            filter.value = latestFilters;
            filteredTalent.value = calcFilteredUsers();
        }
        
        // filter logic
        const calcFilteredUsers = () => {
            return store.state.talent.filter((user) => {
                return (
                    // interests
                    (user.interests.includes(filter.value.interests) || filter.value.interests === '') &&
                    // experience
                    (user.experience_level === filter.value.experience_level || filter.value.experience_level === '') &&
                    // degree
                    user.background.match(filter.value.background) &&
                    // name
                    user.full_name.match(filter.value.full_name)
                )
            })
        }

        return {
            updateFilter,
            filterOptions,
            filteredTalent
        }
    }
}
</script>

<style lang="scss" scoped>
.find-talent {
    display: flex;
    &__content {
        margin-left: calc(#{$filter-div-width} + 10px);
        width: 100%;
    }
}
.talents {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

@media (max-width: 736px) {
    .find-talent {
        flex-direction: column;
    }
    .find-talent__content {
        margin-left: 0;
        &--title {
            text-align: center;
        }
    }
}
</style>