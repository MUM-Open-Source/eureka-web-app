<template>
    <div class = "container-sm mt-20">
        <div class="side_bar">
            <h3 class="side-bar-header">Chats</h3>
            <input type="text" placeholder="Search Messages or users" class="chat-search-field" required />
            <div class= "side_bar_tab_wrapper">
            <span class="tab">
                <a href="#">Recent</a>
                <a href="#">Direct</a>
                <a href="#">Group</a>
            </span>
            <button class="add_button">+</button>
            </div>

            <div class="contact_list">
            <ChatContact contact_name="Adam" />
            <ChatContact contact_name="Adam" />
            <ChatContact contact_name="Adam" />
            </div>

        </div>

        <div class="chat_box">
            <div class="chat_nav_bar">   
                <h2>Sauce Foong</h2>
            </div>
            <hr class="horizontal_divider">

        <div class="message_box">
        <Message text="SheeYao" sender="" name="sarif"/>
        <Message :sender="false" name="sarif"/>
        <Message text="SheeYao" sender="" name="sarif"/>
        <Message :sender="false" name="sarif"/>
        <Message sender="" name="sarif"/>
        <Message text="SheeYao" :sender="false" name="sarif"/>

        <Message text="SheeYao" :sender="false" name="sarif"/>
        <Message sender="" name="sarif"/>
        <Message text="SheeYao" :sender="false" name="sarif"/>
        <Message sender="" name="sarif"/>
        <Message :sender="false" name="sarif"/>
        <Message text="SheeYao" sender="" name="sarif"/>

        <Message text="SheeYao" sender="" name="sarif"/>
        <Message :sender="false" name="sarif"/>
        <Message text="SheeYao" sender="" name="sarif"/>
        <Message :sender="false" name="sarif"/>
        <Message sender="" name="sarif"/>
        <Message text="SheeYao" :sender="false" name="sarif"/>

        <Message text="SheeYao" :sender="false" name="sarif"/>
        <Message sender="" name="sarif"/>
        <Message text="SheeYao" :sender="false" name="sarif"/>
        <Message sender="" name="sarif"/>
        <Message :sender="false" name="sarif"/>
        </div>
        <div class="bottom-divider">

        </div>
        <!-- <Message 
        v-for="{id, text, userName, userId} in messages"
        :key="id"
        :name= "userName"
        :sender="userId === user?.uid"
        >
        {{text}}
        </Message> -->

         <div class="bottom">
            <hr class="horizontal_divider">
            <div class="input-field-wrapper">
            <form @submit.prevent = "sendMessage">
                <input type="text" v-model="inputMessage" placeholder="Type Message" class="text_bar" required />
                <button class="button-send"><span class="button-icon">Send</span></button>
            </form>
            </div>
        </div>
        </div>

       

    </div>
</template>



//<script>
import {ref} from 'vue';
import store from '@/store';
import Message from '../common/Message.vue';
import ChatContact from '../common/ChatContact.vue';



export default {
  name : 'ChatRoom',
  components: { Message, ChatContact },

  data() {
      return{
          message: '',
          messages: [],
      }
  },
  setup() {
    const inputMessage = ref("");
    const sendMessage = () =>{
        //event.preventDefault()
        //const messagesRef = db.database().ref("messages");
        
        if(inputMessage.value === "" || inputMessage.value === null) {
            return ; 
        }

        // const message = {
        //     id: Date.now.toString,
        //     text: inputMessage.value,
        //     type: 1 //1 as direct msg now
        // }
        const message = {
            sent_at: null,
            sent_by: null,
            text: inputMessage.value,
            content_type: "text"
        }
        store.dispatch("sendMessage", message);
        inputMessage.value = "";
    }


    return {inputMessage,sendMessage}

  }


  }


</script>


<style scoped>

.bottom-divider {
    font:white;
    margin-bottom: 100px;
    width:100%;
    height:100px;
}



.bottom {
    margin-top:200px;
    z-index:1;
    position: fixed;
    width: 100%;
    height: 65px;
    bottom: 0;
    background-color: white;
}


.text_bar{
    padding: 8px 10px;
    border: none;
    background: #E0E4EE;
    outline: none;
    font-size: 17px;
    position: fixed;
    width: 100%;
    bottom: 0;
    margin:10px 20px;
}

.button-send{
    padding-right:20px;
    margin-bottom:10px;
    width:70px;
    height: 35px;
    bottom:0;
    right:0;
    position:fixed;
    background-color: #7069E7;
}


.side_bar {
  margin: 0;
  padding: 0;
  width: 310px;
  background-color: #F4F6FA;
  position: fixed;
  height: 100%;
  overflow: auto;
}




.chat_box {
  margin-left: 300px;
  padding: 1px 16px;
  height: 1000px;
}

.chat-search-field {
    margin:20px;
    height:5%;
    width:250px;
    background: #E0E4EE;
    font-size:15px;
}


@media screen and (max-width: 700px) {
  .side_bar {
    width: 30%;
  }
  .chat-search-field{
      width:80px;
  }
  
  .chat_box{
      margin-left:110px;
  }

  .chat_room {margin-left: 0;}
}

@media screen and (max-width: 400px) {
}

.chat_nav_bar {
    margin:20px ;
}

.horizontal_divider {
    border-top: 2px solid #bbb ; 
}

.side-bar-header{
    font-size:30px;
    margin-left:20px;
    margin-right:auto;
}

.add_button{
    size: 40px;
    float:right;
    margin-right:20px;
}

.tab {
    font-size:20px;
    padding:20px;
}

a {
    margin-right:10px;
}

.side_bar_tab_wrapper{
    margin-bottom:20px;
}
</style>
