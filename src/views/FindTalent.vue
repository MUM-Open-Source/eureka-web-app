<template>
    <div class="find-talent page-pad">
        <!-- Filter passing data -->
        <Filter @update-filter="updateFilter"/>    
        <div class="find-talent__content">
            <div class="find-talent__content--title mar__b--3 text--center">
                <div class="tagline">Current Students</div>
                <div class="heading">Talent</div>
            </div>
            <div class="talents">
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
import ProfileCard from '@/components/ProfileCard';
import Filter from '@/components/Filter';

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
                    (user.interests.includes(filter.value.interest.replaceAll('_',' ').toLowerCase()) || filter.value.interest === '') &&
                    // experience
                    (user.experience_level.toString() === filter.value.experience_level || filter.value.experience_level === '') &&
                    // degree
                    user.background.toLowerCase().match(filter.value.degree.replaceAll('_',' ').toLowerCase()) &&
                    // name
                    user.full_name.toLowerCase().match(filter.value.name.replaceAll('_',' ').toLowerCase())
                )
            })
        }

        return {
            updateFilter,
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