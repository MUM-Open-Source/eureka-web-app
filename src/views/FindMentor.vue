<template>
    <div class="find-mentor page-pad">
        <MentorFilter 
            :filterOptions="filterOptions"
            @update-filter="updateFilter" 
        />    
        <div class="find-mentor__content">
            <div class="find-mentor__content--title mar__b--3 text--center">
                <div class="tagline">Monash Seniors & Alumni</div>
                <div class="heading">Mentors</div>
            </div>
            <div class="mentor">
                <div v-if="!filteredMentors.length" class="result-not-found">
                    <img class="img_not_found" src="@/assets/search-result-not-found.png"><br>
                    <span class="not-found-caption">No Mentors Found...</span>
                </div>
                <ProfileCard 
                    v-for="user in filteredMentors" 
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
import MentorFilter from '@/modules/main/MentorFilter.vue';

export default {
    name: 'FindMentor',
    components: { ProfileCard, MentorFilter },
    setup() {
        
        // mounted
        onMounted(() => {
            // fetch the data if there is nothing to display
            if (!store.state.mentors.length) {
                store.dispatch('getMentors');
            }
        })

        const filter = ref({});
        // the input to the ProfileCard
        const filteredMentors = ref(store.state.mentors);
        // input to the filter
        const filterOptions = ref(store.state.filters.mentors);

        // updating the filter and array of users
        function updateFilter(latestFilters) {
            filter.value = latestFilters;
            filteredMentors.value = calcFilteredUsers();
        }
        
        // filter logic
        const calcFilteredUsers = () => {
            return store.state.mentors.filter((user) => {
                return (
                    // interests
                    (user.interests.includes(filter.value.skill) || filter.value.skill === '') &&
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
            filteredMentors
        }
        
    }
}
</script>

<style lang="scss" scoped>
.find-mentor {
    display: flex;
    &__content {
        margin-left: calc(#{$filter-div-width} + 10px);
        width: 100%;
    }
}
.mentor {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.result-not-found{
    text-align:center;
    font-size: 30px;
}

@media (max-width: 736px) {
    .find-mentor {
        flex-direction: column;
    }
    .find-mentor__content {
        margin-left: 0;
        &--title {
            text-align: center;
        }
    }
}
</style>