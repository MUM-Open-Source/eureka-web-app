<template>
    <div class="waves-from-users page-pad">
        <div class="waves-from-users__content">
            <div class="waves-from-users__content--title mar__b--3 text--center">
                <div class="tagline">These Users Waved At You. Wave back!</div>
                <div class="heading">Waves From Mentors</div>
            </div>
            <div class="users">
                <ProfileCard 
                    v-for="user in wavesFromMentors" 
                    :key="user.key"
                    :user="user"
                />
            </div>
        </div>
    </div> 
</template>

<script>
import { onMounted, computed } from 'vue';
import store from '@/store';
import ProfileCard from '@/components/ProfileCard';

export default {
    name: 'WavesFromMentors',
    components: { ProfileCard },
    setup() {

        // mounted
        onMounted(() => {
            // fetch the data if there is nothing to display
            if (!store.state.talent.length) {
                store.dispatch('getMentors');
            }
            if (!store.state.waves_from_other_users.length) {
                store.dispatch('getWavesFromOtherUsers');
            }
        })
        
        // the input to the ProfileCard
        const wavesFromMentors = computed(() => store.state.mentors.filter(hasGivenWave));

        const hasGivenWave = (value) => store.state.waves_from_other_users.includes(value.id);

        return { wavesFromMentors }

    }
}
</script>

<style lang="scss" scoped>
.waves-from-users {
    display: flex;
    &__content {
        width: 100%;
    }
}
.users {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
@media (max-width: 736px) {
    .waves-from-users {
        flex-direction: column;
        &__content {
            &--title {
                text-align: center;
            }
        }
    }
}
</style>