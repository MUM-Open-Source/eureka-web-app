<template>
    <div class="browse-events page-pad">
        <EventFilter @update-filter="updateFilter" />    
        <div class="browse-events__content">
            <div class="browse-events__content--title mar__b--3 text--center">
                <div class="tagline">Competition and others</div>
                <div class="heading">Events</div>
            </div>
            <div class="events">
                <EventCard 
                    v-for="event in filteredEvents" 
                    :key="event.key"
                    :event="event"
                />
            </div>
        </div>
    </div> 
</template>

<script>
import { ref, onMounted } from 'vue';
import store from '@/store';
import EventCard from '@/modules/main/EventCard';
import EventFilter from '@/modules/main/EventFilter';

export default {
    name: 'BrowseEvents',
    components: { EventCard, EventFilter },
    setup() {

        // mounted
        onMounted(() => {
            // fetch the data if there is nothing to display
            if (!store.state.events.length) {
                store.dispatch('getEvents');
            }
        })

        const filter = ref({});
        // the input to the ProfileCard
        const filteredEvents = ref(store.state.events);

        // updating the filter and array of users
        function updateFilter(latestFilters) {
            filter.value = latestFilters;
            filteredEvents.value = calcFilteredUsers();
        }
        
        // filter logic
        const calcFilteredUsers = () => {
            return store.state.events.filter((event) => {
                return (
                    // type
                    event.type.match(filter.value.type) &&
                    // organizer
                    event.organizer.match(filter.value.organizer) &&
                    // name
                    event.name.match(filter.value.name)
                )
            })
        }

        return {
            updateFilter,
            filteredEvents
        }

    }
}
</script>

<style lang="scss" scoped>
.browse-events {
    display: flex;
    &__content {
        margin-left: calc(#{$filter-div-width} + 10px);
        width:100%;
    }
}
.events {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
@media (max-width: 736px) {
    .browse-events {
        flex-direction: column;
    }
    .browse-events__content {
        margin-left: 0;
        &--title {
            text-align: center;
        }
    }
}
</style>