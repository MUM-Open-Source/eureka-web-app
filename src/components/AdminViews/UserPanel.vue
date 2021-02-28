<template>
  <div classNa me="outer-div">
    <user-list-tile></user-list-tile>
  </div>
</template>

<script>
import UserListTile from "../../components/AdminPanelComponent/UserListTile.vue";

export default {
  name: "UserPanel",
  components: { UserListTile },
};
</script>

<style lang='css' scoped>
.outer-div {
  z-index: -1;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>