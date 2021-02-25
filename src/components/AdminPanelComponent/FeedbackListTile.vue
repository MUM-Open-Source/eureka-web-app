<template>
  <div className="card">
    <h3>Subject</h3>
    <small> 2017-18-20</small>
    <p>
      This is the feedback This is the feedback This is the feedback This is the
      feedback This is the feedback This is the feedback This is the feedback This is the feedback This is the feedback This is the feedback This is the
      feedback This is the fhis is the feedback This is the feedback This is the feedback This is the feedback This is the
      feedback This is the feedback This is the feedback This is the feedback
    </p>
  </div>
</template>

<script>
export default {
  name: "UserListTile",
  props: {
    created_at: {
      type: String,
      required: true,
    },
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

<style lang='scss' scoped>
.card {
  padding: 20px;  
}
</style>