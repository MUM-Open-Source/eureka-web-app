<template>
    <div class="profile-card pad--2 mar__b--4">
        <div class="profile-card__top mar__b--2">
            <!-- Experience Level -->
            <div class="profile-card__experience-level">
                <div class="experience-level__stars">
                    <img 
                        class="star__icon" 
                        v-for="index in user.experience_level" 
                        :key="index" 
                        src="@/assets/star-filled.svg" 
                    />
                    <img 
                        class="star__icon" 
                        v-for="index in 3-user.experience_level" 
                        :key="index" 
                        src="@/assets/star-empty.svg" 
                    />
                </div>
                <div class="tagline">Experience Level</div>
            </div>
            <!-- Wave -->
            <div class="profile-card__wave" @click="toggleWave">
                <img 
                    v-if="isWaved" 
                    class="wave__icon" 
                    src="@/assets/hand-filled.svg"
                />
                <img 
                    v-else 
                    class="wave__icon" 
                    src="@/assets/hand-empty.svg" 
                />
            </div>
        </div>
        <!-- Profile image -->
        <RoundImage :src="user.image_url" alt="User" class="mar__b--1 text--center" />
        <!-- User particulars -->
        <div class="profile-card__particulars text--center mar__b--2">
            <div class="subheading">{{ user.full_name }}</div>
            <div class="tagline profile-card__particulars--background mar__b--1">{{ user.background }}</div>
            <div class="body profile-card__particulars--bio">{{ user.bio }}</div>
        </div>
        <div class="mar__t--auto">
            <!-- Interests -->
            <div class="profile-card__interests mar__b--3">
                <div 
                    v-for="item in user.interests" 
                    :key="item" 
                    class="tagline text--capsule cursor__default">
                    {{ item }}
                </div>
            </div>
            <!-- Socials -->
            <div class="profile-card__socials mar__b--1">
                <a v-if="user.social_links.email_id" :href="'mailto:' + user.social_links.email_id">
                    <img class="profile-card__socials--icon" src="@/assets/email-icon.svg" />
                </a>
                <a v-if="user.social_links.linkedin_url" :href="user.social_links.linkedin_url" target="_blank">
                    <img class="profile-card__socials--icon" src="@/assets/linkedin-icon.svg" />
                </a>
                <a v-if="user.social_links.github_url" :href="user.social_links.github_url" target="_blank">
                    <img class="profile-card__socials--icon" src="@/assets/github-icon.svg" />
                </a>
                <a v-if="user.social_links.website_url" :href="user.social_links.website_url" target="_blank">
                    <img class="profile-card__socials--icon" src="@/assets/website-icon.svg" />
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import store from '@/store';
import RoundImage from '@/components/RoundImage';

export default {
    name: 'ProfileCard',
    components: { RoundImage },
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        // getting the like value from props 
        const isWaved = computed(() => {
            return store.state.user_waves.includes(props.user.id);
        })

        // toggle the wave
        const toggleWave = () => {
            if (!isWaved.value) {
                store.dispatch('waveAtUser', props.user.id);
            } else {
                store.dispatch('unwaveAtUser', props.user.id);
            }
        }

        return {
            isWaved,
            toggleWave
        }
    }
}
</script>

<style lang='scss' scoped>
@import '@/styles/components/profile_card';
</style>