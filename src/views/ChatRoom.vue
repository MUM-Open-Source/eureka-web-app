<template>
    <div class="container-sm mt-20">
        <transition-group tag="div" class="chat-slider" name="slide">
            <div v-if="showOrHideChatList" class="side_bar">
                <div class="side_bar__header" :id="showOrHide">
                    <h3>Chats</h3>

                    <button class="create-group-btn" v-on:click="createGroup">
                        +
                    </button>
                    <Multiselect
                        v-model="selected_user.id"
                        mode="tags"
                        :searchable="true"
                        :options="select_options.map(user => user.full_name)"
                        placeholder="Select members to chat"
                        class="multselect"
                    />
                </div>

                <div class="contact_list">
                    <Group
                        v-for="group in updateDirectGroupName(user_groups)"
                        :class="{
                            group_selected: currentActiveGroup == group.id,
                        }"
                        :is_team="group.is_team"
                        :group_name="group.name"
                        :group_id="group.id"
                        :last_update="
                            getRecentLastUpdate(group.recent_message.timestamp)
                        "
                        :recent_message="
                            getRecentMessage(group, group.recent_message)
                        "
                        :key="group.key"
                        @click="
                            updateGroupId(group.id, group.name, group.is_team)
                        "
                    />
                </div>
            </div>
        </transition-group>
        <div class="chat-room-right">
            <MessagingComponent
                v-if="render"
                :group_id="currentGroupId"
                :key="chat_group_info.msgKey"
                :group_name="currentGroupName"
                :is_team="currentGroupIsTeam"
            />
        </div>
    </div>
</template>

//
<script>
import { ref, onMounted, reactive, computed } from 'vue';
import store from '@/store';
import Group from '../common/Group.vue';
import MessagingComponent from '../common/MessagingComponent.vue';
import Multiselect from '@vueform/multiselect';
import Swal from 'sweetalert2';
import { format } from 'date-fns';

// import { db } from "@/firebase";

export default {
    name: 'ChatRoom',
    components: { Group, MessagingComponent, Multiselect },

    setup() {
        onMounted(() => {
            // fetch the data if there is nothing to display
            if (!store.state.user_list_to_chat.length) {
                store.dispatch('getUserListToChat');
            }
            if (!store.state.groups.length) {
                store.dispatch('getUserGroup');
            }
        });

        // Messaging Component Props
        const render = computed(() => store.state.messagingComponent.render);

        const currentGroupId = computed(
            () => store.state.messagingComponent.group_id
        );

        const currentGroupName = computed(
            () => store.state.messagingComponent.group_name
        );

        const currentActiveGroup = computed(
            () => store.state.messagingComponent.active_group_id
        );

        const currentGroupIsTeam = computed(
            () => store.state.messagingComponent.is_team
        );

        const user_id = ref(store.state.user_data?.id);
        const select_options = ref(store.state.user_list_to_chat);
        const user_groups = ref(store.state.groups);
        const chat_group_info = reactive({
            msgKey: 0,
        });

        const selected_user = reactive({
            id: [],
            users: [], // The creator must be one of the member inside the group
        });

        const updateGroupId = (group_id, group_name, group_is_team) => {
            if (currentGroupId.value !== group_id) {
                //clear the messages in the state
                store.state.messages = [];
                //increment the key to rerender the messaging component
                chat_group_info.msgKey += 1;
                store.dispatch('setMessagingComponentRender', true);

                //update the group id when clicking groups
                store.dispatch('setMessagingComponentGroupId', group_id);
                // update the group name;
                store.dispatch('setMessagingComponentGroupName', group_name);
                // update group is_team status
                store.dispatch('setMessagingComponentIsTeam', group_is_team);
                // shows which group is actively selected now
                store.dispatch('setMessagingComponentActiveGroupId', group_id);
                //Hide Chat Side Bar
                isMessageComponentShow();
            }
        };

        const createGroup = () => {
            // The creator must be one of the member inside the group
            selected_user.users.push(store.state.user_data?.id);

            selected_user.id.forEach(index => {
                selected_user.users.push(select_options.value[index].id);
            });

            if (selected_user.users !== [] && selected_user.users.length > 1) {
                if (selected_user.users.length > 2) {
                    let members = selected_user.users;
                    //Ask for group name
                    Swal.fire({
                        title: 'Please give your group a name: ',
                        input: 'text',
                        inputAttributes: {
                            autocapitalize: 'off',
                        },
                        showCancelButton: true,
                        confirmButtonText: 'Create',
                        showLoaderOnConfirm: true,
                        allowOutsideClick: () => !Swal.isLoading(),
                    }).then(result => {
                        if (result.isConfirmed) {
                            console.log(selected_user.users);
                            store.dispatch('createGroup', {
                                id:
                                    Date.now().toString() +
                                    store.state.user_data?.id,
                                members: members,
                                name: result.value,
                                is_team: true,
                            });
                            Swal.fire(
                                'Group ' + result.value,
                                ' has been created ! ',
                                'success'
                            );
                            // 'Group ' + Date.now().toString()
                        }
                    });
                } else {
                    store.dispatch('createGroup', {
                        id: Date.now().toString() + store.state.user_data?.id,
                        members: selected_user.users,
                        name: null,
                        is_team: false,
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text:
                        'Failed to create a New Group. It might already exist or lack of members (at least 1 member)',
                });
            }

            selected_user.id = [];
            selected_user.users = [];
        };

        const updateDirectGroupName = groups => {
            //retrieve name
            groups.forEach(group => {
                if (!group.is_team) {
                    select_options.value.forEach(user => {
                        // console.log(user);
                        if (
                            user.id === group.members[0] ||
                            user.id === group.members[1]
                        ) {
                            // console.log(user.full_name);
                            group.name = user.full_name;
                        }
                    });
                }
            });
            return groups;
        };

        const getRecentMessage = (group, recent_message) => {
            if (recent_message !== null) {
                let new_recent_message =
                    recent_message.from === store.state.user_data?.id
                        ? 'You: ' + recent_message.payload
                        : group.members.length > 2 &&
                          recent_message.from !== null
                        ? recent_message.sender_full_name +
                          ': ' +
                          recent_message.payload
                        : recent_message.payload;
                return new_recent_message;
            }

            return null;
        };

        const getRecentLastUpdate = recent_msg_timestamp => {
            return format(new Date(recent_msg_timestamp), 'dd/MM/yyyy HH:mm');
        };

        const showOrHideChatList = computed(() => store.state.showChatList);

        const isMessageComponentShow = () => {
            store.state.showChatList = !store.state.showChatList;
            console.log(store.state.showChatList);
        };

        return {
            user_id,
            select_options,
            selected_user,
            createGroup,
            updateDirectGroupName,
            user_groups,
            updateGroupId,
            chat_group_info,
            getRecentMessage,
            render,
            currentGroupId,
            currentGroupName,
            currentGroupIsTeam,
            currentActiveGroup,
            isMessageComponentShow,
            showOrHideChatList,
            getRecentLastUpdate,
        };
    },
};
</script>

<style lang="scss" scoped>
// .slide-leave-active,
// .slide-enter-active {
//     transition: 1s;
// }
// .slide-enter {
//     transform: translate(100%, 0);
// }
// .slide-leave-to {
//     transform: translate(-100%, 0);
// }

.side_bar {
    margin: 0;
    padding: 0;
    width: 100%;
    background-color: $chat-list-color;
    position: fixed;
    overflow: scroll;
    height: 100%;
    z-index: 1;
    &__header {
        font-size: 30px;
        h3 {
            float: left;
        }
        .create-group-btn {
            margin: 10px;
            font-size: 15px;
        }
        .chat-list-toggle {
            float: right;
            font-size: 15px;
            text-decoration: underline;
            padding: 10px;
        }

        .multselect {
            display: block;
        }
    }
    .group_selected {
        background-color: $selected-group-color;
    }
}

@media screen and (min-width: 1281px) {
    .chat-list-toggle {
        display: none;
    }
}

@media screen and (max-width: 700px) {
    .side_bar {
        width: 100%;
        z-index: 1;
        .chat-search-field {
            width: 80px;
        }

        .chat-list-toggle {
            visibility: visible;
            display: block;
        }
    }
}
</style>
