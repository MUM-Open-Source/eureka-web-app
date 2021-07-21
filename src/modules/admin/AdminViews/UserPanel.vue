<template>
    <div className="outer-div">
        <user-list-tile></user-list-tile>
    </div>
</template>

<script>
import UserListTile from '@/modules/admin/AdminPanelComponent/UserListTile.vue';

export default {
    name: 'UserPanel',
    components: { UserListTile },
};
</script>

<style lang="css" scoped>
.outer-div {
    flex-direction: column;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    margin: 0;
    padding: 0;
}
</style>
