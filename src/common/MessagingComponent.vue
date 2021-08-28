<template>
    <div class="container-sm mt-20">
        <div class="chat_box">
            <div class="chat_nav_bar">
                <div class="chat_nav_bar__left">
                    <span
                        class="chat_nav_bar__left_content"
                        @click="isMessageComponentShow"
                    >
                        <fa icon="arrow-left" size="md" class="arrow-left" />
                        <h2>{{ group_name }}</h2>
                    </span>
                </div>
                <div class="chat_nav_bar__right">
                    <fa
                        icon="ellipsis-v"
                        size="md"
                        v-if="is_team"
                        @click="toggleGroupMenuState"
                    />
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
                    v-for="(message, index) in messages"
                    :sender_id="message.from"
                    :sender_full_name="message.sender_full_name"
                    :key="message.key"
                    :text="message.payload"
                    :datetime="message.timestamp"
                    :isDateSame="
                        checkIsDateSame(index, message.timestamp, messages)
                    "
                    class="message-text"
                    :id="
                        message.from === user_id ? 'sender-box' : 'receiver-box'
                    "
                />
            </div>
            <div class="bottom_divider" ref="scrollable"></div>

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
import { isSameDay } from 'date-fns';

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
                let box = document.querySelector(
                    '.message-text:nth-last-child(2)'
                );
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

        const toggleGroupMenuState = () => {
            isGroupMenuShown.value = !isGroupMenuShown.value;
        };

        const toggleModal = () => {
            isModalShown.value = !isModalShown.value;
        };
        const isMessageComponentShow = () => {
            store.state.showChatList = !store.state.showChatList;
        };

        const checkIsDateSame = (
            index: number,
            current_message_timestamp: string,
            lst: typeof Message[]
        ) => {
            if (index !== 0) {
                return isSameDay(
                    new Date(current_message_timestamp),
                    new Date(lst[index - 1].timestamp)
                );
            } else {
                return false;
            }
        };

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
                    timestamp: new Date().toISOString(),
                });
            }

            inputMessage.value = '';
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
            checkIsDateSame,
            isMessageComponentShow,
        };
    },
});
</script>

<style lang="scss" scoped>
.chat_box {
    padding: 1px 16px;
    .chat_nav_bar {
        border-bottom: 1px solid $color-dark;
        position: fixed;
        display: inline-block;
        width: 100%;
        margin-top: -5px;
        padding: 15px 5px;
        background-color: $color-white;
        &__left {
            display: inline-block;
            &_content {
                display: flex;
                font-size: 20px;
                .arrow-left {
                    padding: 5px;
                    margin: 2px 20px 2px 2px;
                }
            }
        }

        &__right {
            padding: 5px 40px;
            font-size: 20px;
            float: right;
        }
    }

    .bottom {
        margin-top: 200px;
        position: fixed;
        width: 100%;
        height: 65px;
        bottom: 0;
        background-color: $color-white;
        &_divider {
            margin-bottom: 100px;
            width: 100%;
            height: 100px;
        }
        .text_bar {
            padding: 8px 10px;
            border: none;
            outline: none;
            background: $color-light-grey-chat;
            font-size: $body-font-size;
            position: fixed;
            width: calc(100% - 100px);
            bottom: 0;
            margin: 10px 20px;
        }

        .horizontal_divider {
            border-top: 2px solid $color-light;
        }
    }

    .message_box {
        margin-top: $messagebox-margin-top;
    }

    .group-member-table {
        border-collapse: collapse;
        width: 100%;
        border: 1px solid $color-light;
    }
}

@media screen and (max-width: 700px) {
    .chat_nav_bar {
        position: absolute;
        padding: 200px;
    }
    .text_bar {
        width: calc(100% - 50px);
    }
    .input-field-wrapper {
        width: 200px;
    }
}

@media screen and (max-width: 400px) {
    .chat_nav_bar {
        min-width: 100%;
        margin-left: -15px;
    }

    .bottom {
        margin-left: -15px;
    }

    .text_bar {
        min-width: calc(100% - 50px);
    }
}

th,
td {
    text-align: left;
    padding: 16px;
}

// @media (min-width: 1281px) {
//     #sender-box {
//         margin-left: 200px;
//     }

//     #receiver-box {
//         margin-right: 200px;
//     }
// }

// @media (min-width: 1581px) {
//     #sender-box {
//         margin-left: 700px;
//     }

//     #receiver-box {
//         margin-right: 700px;
//     }
// }
</style>
