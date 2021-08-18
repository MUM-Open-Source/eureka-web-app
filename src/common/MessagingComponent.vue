<template>
    <div class="container-sm mt-20">
        <div class="chat_box">
            <div class="chat_nav_bar">
                <div class="chat_nav_left">
                    <h2>{{ group_name }}</h2>
                </div>
                <div
                    class="chat_nav_right"
                    v-if="is_team"
                    @click="toggleGroupMenuState"
                >
                    <fa icon="ellipsis-v" size="md" />
                    <GroupMenu
                        v-if="isGroupMenuShown"
                        :onClick="toggleModal"
                        :group_id="group_id"
                    />
                </div>
            </div>
            <Modal :modalActive="isModalShown" @close="toggleModal">
                <div class="modal-content">
                    Name : {{ group_name }}
                    <table class="group-member-table">
                        <tr>
                            <th>Member</th>
                        </tr>
                        <tr v-for="member in currentGroup" :key="member">
                            <td>{{ member.full_name }}</td>

                            <td></td>
                        </tr>
                    </table>
                </div>
            </Modal>
            <div class="message_box">
                <Message
                    v-for="message in messages"
                    :sender_id="message.from"
                    :sender_full_name="message.sender_full_name"
                    :key="message.key"
                    :text="message.payload"
                    :datetime="message.timestamp"
                    class="message-text"
                    :id="
                        message.from === user_id ? 'sender-box' : 'receiver-box'
                    "
                />
            </div>
            <div class="bottom-divider" ref="scrollable"></div>

            <div class="bottom">
                <hr class="horizontal_divider" />
                <div class="input-field-wrapper">
                    <form @submit.prevent="sendMessage">
                        <input
                            type="text"
                            v-model="inputMessage"
                            placeholder="Type Message"
                            class="text_bar"
                            required
                        />
                        <!-- <button class="button-send">
                            <span class="button-icon">Send</span>
                        </button> -->
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    ref,
    nextTick,
    onMounted,
    computed,
    onUnmounted,
    onUpdated,
} from 'vue';
import store from '@/store';
import Message from '../common/Message.vue';
import GroupMenu from '../common/GroupMenu.vue';
import Modal from '../common/Modal.vue';
import { db } from '@/firebase';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MessagingComponent',
    components: { Message, GroupMenu, Modal },
    props: {
        group_id: {
            type: String,
            default: null,
        },
        group_name: {
            type: String,
            default: 'Chat Room',
        },
        is_team: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        let unsubscribe = ref(() => {});

        onUpdated(() => {
            nextTick(function() {
                let box = document.querySelector('.bottom-divider');
                if (box !== null) {
                    box.scrollIntoView({ behavior: 'smooth' });
                    box = null;
                }
            });
        });

        onMounted(() => {
            if (!store.state.messages.length) {
                var getMessage = db
                    .collection('messages')
                    .where('group_id', '==', props.group_id)
                    .orderBy('timestamp')
                    .onSnapshot(snapshot => {
                        // only working with the changes and not entire collection
                        snapshot.docChanges().forEach(change => {
                            if (change.type === 'added') {
                                const message = {
                                    from: change.doc.data().from,
                                    sender_full_name: change.doc.data()
                                        .sender_full_name,
                                    type: change.doc.data().type,
                                    payload: change.doc.data().payload,
                                    group_id: change.doc.data().group_id,
                                    timestamp: change.doc.data().timestamp,
                                };
                                store.state.messages.push(message);
                            }
                        });
                    });

                unsubscribe.value = getMessage;
            }
            window.scrollTo(0, 0);

            store.dispatch('getGroupMember', props.group_id);
        });

        onUnmounted(() => {
            let unsub = unsubscribe.value;
            unsub();
        });
        const messages = ref(store.state.messages);
        const isGroupMenuShown = ref(false);
        const isModalShown = ref(false);

        const user_id = computed(() => store.state.user_data?.id);

        const currentGroup = computed(
            () => store.state.messagingComponent.currentGroupMembers
        );

        //Sending message
        const inputMessage = ref('');
        const sendMessage = () => {
            if (inputMessage.value !== '' || inputMessage.value !== null) {
                //Break line at every x chars
                const string = [...inputMessage.value];
                for (let i = 100; i < string.length; i += 100) {
                    string[i] = string[i] + '\n';
                }
                inputMessage.value = string.join('');

                //Send Message
                store.dispatch('sendMessage', {
                    from: store.state.user_data?.id,
                    sender_full_name: store.state.user_data?.full_name,
                    type: 'text',
                    payload: inputMessage.value,
                    group_id: props.group_id,
                    timestamp: new Date().toLocaleString(),
                });
            }

            inputMessage.value = '';
        };

        const toggleGroupMenuState = () => {
            isGroupMenuShown.value = !isGroupMenuShown.value;
        };

        const toggleModal = () => {
            isModalShown.value = !isModalShown.value;
        };

        return {
            messages,
            inputMessage,
            sendMessage,
            isGroupMenuShown,
            toggleGroupMenuState,
            isModalShown,
            toggleModal,
            currentGroup,
            unsubscribe,
            user_id,
        };
    },
});
</script>

<style lang="scss" scoped>
// .button-send {
//     padding-right: 20px;
//     margin-bottom: 10px;
//     width: 70px;
//     height: 35px;
//     bottom: 0;
//     right: 0;
//     position: fixed;
//     background-color: #7069e7;
// }

.chat_box {
    margin-left: 300px;
    padding: 1px 16px;
    height: 1000px;

    .chat_nav_bar {
        border-bottom: 1px solid black;
        position: fixed;
        display: inline-block;
        width: calc(100% - 310px);
        margin-top: -5px;
        padding: 15px 5px;
        background-color: #fff;
        .chat_nav_left {
            float: left;
        }

        .chat_nav_right {
            padding: 5px 30px;
            float: right;
        }
    }

    .bottom {
        margin-top: 200px;
        position: fixed;
        width: 100%;
        height: 65px;
        bottom: 0;
        background-color: white;
        &-divider {
            margin-bottom: 100px;
            width: 100%;
            height: 100px;
        }
        .text_bar {
            padding: 8px 10px;
            border: none;
            background: #e0e4ee;
            outline: none;
            font-size: 17px;
            position: fixed;
            width: calc(100% - 400px);
            bottom: 0;
            margin: 10px 20px;
        }

        .horizontal_divider {
            border-top: 2px solid #bbb;
        }
    }

    .message_box {
        margin-top: 5%;
    }

    .group-member-table {
        border-collapse: collapse;
        width: 100%;
        border: 1px solid #ddd;
    }
}

@media screen and (max-width: 700px) {
    .chat_box {
        margin-left: 0px;
    }

    .chat_nav_bar {
        position: absolute;
        padding: 200px;
    }
    .text_bar {
        width: 200px;
    }
    .input-field-wrapper {
        width: 200px;
    }
}

@media screen and (max-width: 400px) {
    .chat_box {
    }

    .chat_nav_bar {
        min-width: 100%;
        margin-left: -15px;
    }

    .bottom {
        margin-left: -15px;
    }

    .text_bar {
        min-width: calc(100% - 80px);
    }
}

th,
td {
    text-align: left;
    padding: 16px;
}

@media (min-width: 1281px) {
    #sender-box {
        margin-left: 200px;
    }

    #receiver-box {
        margin-right: 200px;
    }
}

@media (min-width: 1581px) {
    #sender-box {
        margin-left: 700px;
    }

    #receiver-box {
        margin-right: 700px;
    }
}
</style>
