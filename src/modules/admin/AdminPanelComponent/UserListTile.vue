<template>
    <div className="card">
        <h3>Username</h3>
        <small>Member since</small>
        <div class="user-data"></div>
    </div>
</template>

<script>
export default {
    name: 'UserListTile',
    props: {
        // created_at: {
        //   type: String,
        //   required: true,
        // },
        // id: {
        //   type: String,
        //   required: true,
        // },
        // message: {
        //   type: String,
        //   required: true,
        // },
        // subject: {
        //   type: String,
        //   required: true,
        // },
    },
};
</script>

<style lang="scss" scoped>
.user-data {
    display: flex;
    flex-direction: row;
}
.card {
    padding-top: 20px;
}
</style>
