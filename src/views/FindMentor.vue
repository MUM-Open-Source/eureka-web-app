<template>
    <div class="find-mentor page-pad">
        <MentorFilter @update-filter="updateFilter" />    
        <div class="find-mentor__content">
            <div class="find-mentor__content--title mar__b--3 text--center">
                <div class="tagline">Monash Alumni</div>
                <div class="heading">Mentors</div>
            </div>
            <div class="mentor">
                <ProfileCard 
                    v-for="user in filteredMentors" 
                    :key="user.key"
                    :user="user"
                    @toggle-wave="toggleWave(user)"
                />
            </div>
        </div>
    </div> 
</template>

<script>
import { onMounted, ref } from 'vue';
import store from '@/store';
import ProfileCard from '@/components/ProfileCard';
import MentorFilter from '@/components/MentorFilter';
import Swal from 'sweetalert2';

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

        // TODO: Update the DB like value and ensure it updates the component
        const toggleWave = (user) => {
            let timerInterval
            Swal.fire({icon: 'success', title:'Waved~', timer: 1500, timerProgressBar: true,
                    didOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                            const content = Swal.getContent()
                        if (content) {
                            const b = content.querySelector('b')
                        if (b) {
                             b.textContent = Swal.getTimerLeft()
                                }
                        }
                    }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }});
           
            console.log('Toggle prompt works');
            console.log(user);
        }

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
                    (user.interests.includes(filter.value.skill.replaceAll('_',' ').toLowerCase()) || filter.value.skill === '') &&
                    // experience
                    (user.experience_level.toString() === filter.value.experience || filter.value.experience === '') &&
                    // job title
                    user.background.toLowerCase().match(filter.value.job_title.replaceAll('_',' ').toLowerCase()) &&
                    // name
                    user.full_name.toLowerCase().match(filter.value.name.replaceAll('_',' ').toLowerCase())
                )
            })
        }

        return {
            updateFilter,
            toggleWave,
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