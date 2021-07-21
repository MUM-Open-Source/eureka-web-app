<template>
    <div class="team__top pad--2 pad__t--0 mar__b--1">
        <div class="heading">
            Team Name
        </div>
        <div class="body">
            A hardworking individual with passions rising in the east and setting in the west.
        </div>
        <div class="team__actions tagline mar__t--1">
            <div class="team__actions--item">
                <fa 
                    :icon="['far', 'edit']"
                    size="sm"
                />
                Edit Team Info
            </div>
            <div class="team__actions--item">
                <fa 
                    :icon="['far', 'envelope']" 
                    size="sm"
                />
                Group Chat
            </div>
            <div class="team__actions--item">
                <fa 
                    icon="sign-out-alt" 
                    size="sm"
                />
                Leave Team
            </div>
        </div>
    </div>
    <UserCard class="mar__b--2" v-for="i in [1,2,3,4,5]" :key="i"/>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import UserCard from '@/modules/incubator/UserCard.vue';

export default defineComponent({
    name: 'YourIncubatorTeam',
    components: { UserCard },
    setup() {

        return {
        }
    }
});
</script>

<style lang="scss" scoped>
.team {
    &__actions{
        display: flex;
        &--item {
            margin-right: 15px;
        }
    }
}
</style>