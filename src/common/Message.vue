<template>
    <div class="container">
        <!-- <div class="message-date-container">
            <span class="message-date" v-if="!isDateSame">{{ date }}</span>
            <hr />
        </div> -->
        <div v-if="sender_id !== user_id" class="message_receiver">
            <div class="message-date-container-receiver">
                <span class="message-date" v-if="!isDateSame">{{ date }}</span>
            </div>
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
                <div class="message-time">
                    {{ time }}
                </div>
            </div>
        </div>

        <div v-else class="message_sender">
            <div class="message-date-container-sender">
                <span class="message-date" v-if="!isDateSame">{{ date }}</span>
            </div>
            <div class="message_sender__text-container">
                <p class="message-text">
                    {{ text }}
                </p>
                <br />
                <div class="message-time">
                    {{ time }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import store from '@/store';
import moment from 'moment';

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
        isDateSame: {
            type: Boolean,
            default: false,
        },
    },

    setup(props) {
        const user_id = computed(() => store.state.user_data?.id);
        const date = moment(props.datetime, 'DD/MM/YYYY')
            .calendar()
            .split(' at')[0];
        const time = moment(props.datetime, 'YYYY ddd MMM HH:mm').format(
            'HH:mm'
        );
        console.log(time);

        return {
            user_id,
            date,
            time,
        };
    },
});
</script>

<style lang="scss" scoped>
.container {
    z-index: 999;
    .message-date-container-receiver {
        text-align: right;
        .message-date {
            margin: 135px;
        }
    }
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
    .message-time {
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
