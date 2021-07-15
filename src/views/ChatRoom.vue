<template>
<div class = "container-sm mt-20">
    <div class="mx-5">
        <h2>Welcome to the ChatRoom</h2>

        <Message 
        v-for="{id, text, userName, userId} in messages"
        :key="id"
        :name= "userName"
        :sender="userId === user?.uid"
        >
        {{text}}
        </Message>
    </div>
    <div ref="bottom" class="mt-20" />

  <div class="bottom">
    <div class="container-sm">
      <form @submit.prevent = "send">
        <input v-model="message" placeholder="Message" required />
        <input type ="submit" value="Send">
      </form>
    </div>
  </div>

</div>



</template>



<script>
import {ref, watch, nextTick} from 'vue';
import store from '@/store';
import Message from '../common/Message.vue';

export default {
  components: { Message },
  name : 'ChatRoom',

  setup(){
      const sender = '2TGTBJZMrRQfFUl0n5hxfMdTQN53'
      const messages = store.dispatch('getMessageFromUser', sender)
      const bottom = ref(null)
      watch(
          messages,
          () =>{
              nextTick(()=>{
                  bottom.value?.scrollIntoView({behavior: 'smooth'})
              })
          },
          {deep:true}
      )

      const message = ref('')
      const send =() =>{
          store.dispatch('sendMessage', message)
          message.value = ''
      }

      return {messages, bottom, message, send}
  }



}

</script>