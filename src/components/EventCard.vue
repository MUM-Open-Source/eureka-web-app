<template>
    <div class="event-card pad--2 mar__b--4 mar__t--2">
        <!-- Event image -->
        <SquareImage :imgName="event.image_url" alt="User" class="event-card__img text--center " />
        <!-- Like event -->
        <div class="event-card__heart mar__t--1" @click="toggleLike">
            <img 
                v-if="isLiked" 
                class="heart__icon" 
                src="@/assets/heart-filled.svg"
            />
            <img 
                v-else 
                class="heart__icon" 
                src="@/assets/heart-empty.svg" 
            />
        </div>
        <!-- Event particulars -->
        <div class="event-card__particulars text--center mar__b--4">
            <div class="tagline event-card__particulars--type mar__b--1 text--capsule cursor__default">{{ event.type }}</div>
            <div class="subheading">{{ event.name }}</div>
            <div class="tagline event-card__particulars--organizer mar__b--2">{{ event.organizer }}</div>
            <!-- <div class="body event-card__particulars--bio">{{ event.organizer }}</div> -->
            <div class="body event-card__particulars--bio">{{ event.description }}</div>
            <div class="tagline--bold  event-card__particulars--date">{{ event.dates }}</div>
        </div>
        
    </div>
</template>

<script>
import SquareImage from '@/components/SquareImage';
import { computed } from 'vue';

export default {
    name: 'EventCard',
    components: { SquareImage },
    props: {
        event: {
            type: Object,
            required: true
        }
    },
    setup(props, context) {
        // getting the like value from props 
        const isLiked = computed(() => {
            let res = props.event.like;
            return res
        })

        // telling the parent component to toggle the like value
        // TODO: pass the event id as a paramenter and in the parent update the db
        const toggleLike = () => {
            context.emit('toggle-like');
        }

        return {
            isLiked,
            toggleLike
        }
    }
}
</script>

<style lang='scss' scoped>
@import '@/styles/components/event_card';
</style>