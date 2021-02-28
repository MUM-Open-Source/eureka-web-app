<template>
  <div v-bind:class="{ card: !inEdit, 'editing-card': inEdit }">    

    <div class="leading">
      <div class="buttons">
        <icon-button v-if="!inEdit">
          <i class="material-icons" style="color: red">delete</i>
        </icon-button>
        <icon-button v-on:click="onEditClicked">
          <i v-if="inEdit" class="material-icons">clear</i>
          <i v-if="!inEdit" class="material-icons">edit</i>
        </icon-button>
      </div>

      <div class="leading">
        <img
          src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/code-hackathon-event-poster-design-template-d7c8ddfd12e11fd2b9c6b70241626091_screen.jpg"
          alt=""
        />
        <div class="data" v-if="!inEdit">
          <h3>Event Name</h3>
          <small>
            <span>2019-8-15 • Organized by ${Organizer} • Hackathon</span>
          </small>
          <p>Event Descriptions</p>
        </div>
      </div>

      <div v-if="inEdit" class="data">                      
        <h4>Event Date</h4>         
        <input type="text" placeholder="2019-8-15"/>
        <h4>Event Organizer</h4>         
        <input type="text" placeholder="Organizer"/>
        <h4>Event Type</h4>         
        <input type="text" placeholder="Hackathon"/>        
        <Button text="Done" />
      </div>
                  
    </div>
  </div>
</template>

<script>
import IconButton from "../IconButton.vue";
import Button from "../Button.vue";
export default {
  components: { IconButton,Button},
  name: "EventsListTile",
  data() {
    return {
      inEdit: false,
    };
  },
  methods: {
    onEditClicked() {
      this.inEdit = !this.inEdit;
    },
  },
};
</script>

<style lang='scss' scoped>
.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 20px;
  transition: 1s;
}

.editing-card {
  width: calc(100% - 50px);
  padding: 15px;
  display: flex;
  flex-direction: column;  
  transition: 1s;
  border-radius: 10px;
  margin: 10px;
  border: 2px solid rgba(0, 255, 0, 0.3);
}

.buttons {
  display: flex;
  flex-direction: column;
}

input{
    background-color:#F0F0F0 ;
    border-radius: 8px;
    margin-bottom: 10px;
    border: none;
    outline: none;
    padding: 10px;     
}

img {
  border-radius: 10px;
  height: 100px;
  width: 100px;
  margin: 8px;
  object-fit: cover;
}

.data {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: 1s;
}

.leading {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

@media screen and (max-width: 500px){
.buttons {
  display: flex;
  flex-direction: row;
}
}
</style>