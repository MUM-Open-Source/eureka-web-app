<template>
    <div class="container">
        <div class="message-date-container">
            <span class="message-date" v-if="!isDateSame">{{ date }}</span>
        </div>
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
                <div class="message-time">
                    {{ time }}
                </div>
            </div>
        </div>

        <div v-else class="message_sender">
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
import { format, formatRelative } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';

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

        //To overwrite the formatRelativeLocale method
        const formatRelativeLocale = {
            lastWeek: "'Last' eeee",
            yesterday: "'Yesterday'",
            today: "'Today'",
            tomorrow: "'Tomorrow'",
            nextWeek: "'Next' eeee",
            other: 'dd/MM/yyyy',
        };

        const tokenType =
            'lastWeek' ||
            'yesterday' ||
            'today' ||
            'tomorrow' ||
            'nextWeek' ||
            'other';

        const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (
            key: U
        ) => obj[key];
        const locale = {
            ...enGB,
            formatRelative: (token: typeof tokenType) =>
                getKeyValue(formatRelativeLocale)(token),
        };

        //Date and Time
        const date = formatRelative(new Date(props.datetime), new Date(), {
            locale,
        });

        const time = format(new Date(props.datetime), 'HH:mm');

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
    .message-date-container {
        text-align: center;
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
            background-color: $color-purple-chat;
            color: $color-white;
            width: fit-content;
            border-radius: 10px;
            padding: 10px;
            -webkit-box-shadow: 0px 5px 8px 5px rgba(0, 0, 0, 0.03);
            box-shadow: 0px 5px 8px 5px rgba(0, 0, 0, 0.03);
            font-size: 17px;
            margin-right: 100px;
        }
    }

    .message_sender__text-container {
        float: right;
        background-color: $color-light-grey-chat;
        color: $color-dark;
        width: fit-content;
        border-radius: 10px;
        padding: 10px;
        -webkit-box-shadow: 0px 5px 8px 5px rgba(0, 0, 0, 0.03);
        box-shadow: 0px 5px 8px 5px rgba(0, 0, 0, 0.03);
        font-size: 17px;
        margin-left: 100px;
    }

    .message_sender {
        width: 100%;
        margin-top: 20px;
        overflow: auto;
        display: inline-block;
    }
    .message-time {
        float: right;
        font-size: 12px;
        margin-left: 50px;
    }
}
</style>
