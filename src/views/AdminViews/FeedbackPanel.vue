<template>
  <div className="outer-div">
    <feedback-list-tile/>
    <hr/>
    <feedback-list-tile/>
    <hr/>
    <feedback-list-tile/>
    <hr/>
    <feedback-list-tile/>
    <hr/>
    <feedback-list-tile/>
    <hr/>
    <feedback-list-tile/>
    <hr/>
    <feedback-list-tile/>
    <hr/>
    <feedback-list-tile/>
  </div>
</template>

<script>
import FeedbackListTile from '../../components/AdminPanelComponent/FeedbackListTile.vue';
export default {
  components: { FeedbackListTile },
  name: "FeedbackPanel",  
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