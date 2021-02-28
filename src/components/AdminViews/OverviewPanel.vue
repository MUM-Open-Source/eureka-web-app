<template>
  <div className="outer-div">
    <feedback-list-tile/>
    <feedback-list-tile/>    
    <feedback-list-tile/>
    <feedback-list-tile/>    
    <feedback-list-tile/>
    <feedback-list-tile/>    
    <feedback-list-tile/>
    <feedback-list-tile/>    
    <feedback-list-tile/>
    <feedback-list-tile/>    
  </div>
</template>

<script>
import FeedbackListTile from '../../components/AdminPanelComponent/FeedbackListTile.vue';
export default {
  components: { FeedbackListTile },
  name: "OverviewPanel",  
};
</script>

<style lang='css' scoped>
.outer-div {          
    flex-direction: column;    
    display: flex;    
    justify-content: flex-start;
    width: 100%;            
    margin: 0;
    padding: 0;  
}
</style>