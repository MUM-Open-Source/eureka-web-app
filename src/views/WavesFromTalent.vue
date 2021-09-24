<template>
    <div class="waves-from-users page-pad">
        <div class="waves-from-users__content">
            <div
                class="waves-from-users__content--title mar__b--3 text--center"
            >
                <div class="tagline">These Users Waved At You. Wave back!</div>
                <div class="heading">Waves From Talent</div>
            </div>
            <div class="users">
                <ProfileCard
                    v-for="user in wavesFromTalent"
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
import ProfileCard from '@/modules/main/ProfileCard.vue';

export default {
    name: 'WavesFromTalent',
    components: { ProfileCard },
    setup() {
        // mounted
        onMounted(() => {
            // fetch the data if there is nothing to display
            if (!store.state.talent.length) {
                store.dispatch('getTalent');
            }
            if (!store.state.waves_from_other_users.length) {
                store.dispatch('getWavesFromOtherUsers');
            }
        });

        // the input to the ProfileCard
        const wavesFromTalent = computed(() =>
            store.state.talent.filter(hasGivenWave)
        );

        const hasGivenWave = value =>
            store.state.waves_from_other_users.includes(value.id);

        return { wavesFromTalent };
    },
};
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
@media (max-width: $md) {
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
