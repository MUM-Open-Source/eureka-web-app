<template>
    <div class="container">
        <div v-if="!sender" class="message">
            <span v-if="!sender" class="texter_name">sheeyao</span>
            <div class ="receiver-text-container">
            {{text}}
            </div>
        </div>

        <div v-else class="message_sender">
             <div class ="sender-text-container">
            {{text}}
            </div>
        </div>
    </div>
</template>

<script lang= 'ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
      name : {
          type: String,
          default: ''
      },
      sender: {
          type: Boolean,
          default: false
      },
     text: {
         type: String,
         default: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quasi quas aliquam commodi quaerat sit reiciendis dignissimos quam totam nemo.'
     }

  }
})
</script>

<style scoped>
.container {
    z-index: 999;
}

.message{
    width:100%;
    margin-top:25px;
    overflow:auto;
}
.message_sender{
    width:100%;
    margin-top:20px;
    overflow:auto;

}

.texter_name{
    font-size:15px;

}

.receiver-text-container{
    background-color:#7069E7;
    color: white;
    width: fit-content;
    border-radius: 10px;
    padding: 10px;
    -webkit-box-shadow: 0px 5px 8px 5px rgba(0,0,0,0.03); 
    box-shadow: 0px 5px 8px 5px rgba(0,0,0,0.03);
    font-size: 17px;
}

.sender-text-container{
    float:right;
    background-color:#E0E4EE;
    color: black;
    width: fit-content;
    border-radius: 10px;
    padding: 10px;
    -webkit-box-shadow: 0px 5px 8px 5px rgba(0,0,0,0.03); 
    box-shadow: 0px 5px 8px 5px rgba(0,0,0,0.03);
    font-size: 17px;
}

.darker {
  border-color: #ccc;
  background-color: #ddd;
}



</style>