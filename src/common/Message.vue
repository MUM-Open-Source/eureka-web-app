<template>
    <div class="container">
        <div v-if="sender_id !== user_id" class="message_receiver">
            <span
                v-if="sender_id !== user_id"
                class="message_receiver__texter_name"
            >
                {{ sender_full_name }}
            </span>
            <div class="message_receiver__text-container">
                <p class="message-text">
                    {{ text }}
                </p>
                <br />
                <div class="message-date-time">
                    {{ datetime }}
                </div>
            </div>
        </div>

        <div v-else class="message_sender">
            <div class="message_sender__text-container">
                <p class="message-text">
                    {{ text }}
                </p>
                <br />
                <div class="message-date-time">
                    {{ datetime }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
    props: {
        sender_id: {
            type: String,
            default: '',
        },
        sender_full_name: {
            type: String,
            default: '',
        },
        datetime: {
            type: String,
            default: '',
        },
        text: {
            type: String,
            default:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quasi quas aliquam commodi quaerat sit reiciendis dignissimos quam totam nemo.',
        },
    },

    setup() {
        const user_id = computed(() => store.state.user_data?.id);
        return {
            user_id,
        };
    },
});
</script>

<style lang="scss" scoped>
.container {
    z-index: 999;
    .message_receiver {
        width: 100%;
        margin-top: 20px;
        overflow: auto;
        &__texter_name {
            font-size: 15px;
            display: block;
        }
        &__text-container {
            float: left;
            background-color: #7069e7;
            color: white;
            width: fit-content;
            border-radius: 10px;
            padding: 10px;
            -webkit-box-shadow: 0px 5px 8px 5px rgba(0, 0, 0, 0.03);
            box-shadow: 0px 5px 8px 5px rgba(0, 0, 0, 0.03);
            font-size: 17px;
        }
    }

    .message_sender__text-container {
        float: right;
        background-color: #e0e4ee;
        color: black;
        width: fit-content;
        border-radius: 10px;
        padding: 10px;
        -webkit-box-shadow: 0px 5px 8px 5px rgba(0, 0, 0, 0.03);
        box-shadow: 0px 5px 8px 5px rgba(0, 0, 0, 0.03);
        font-size: 17px;
    }

    .message_sender {
        width: 100%;
        margin-top: 20px;
        overflow: auto;
    }
    .message-date-time {
        float: right;
        font-size: 12px;
        margin-left: 50px;
    }
}

/* .message_sender__text-container,
.message_receiver__text-container {
    word-break: break-word;
    width: 600px;
} */
</style>
