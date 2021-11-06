<template>
    <div class="container">
        <div class="wrapper">
            <div class="left">
                <img
                    v-if="!is_team"
                    class="contact_profile_img"
                    src="@/assets/default-user-image.png"
                />
                <img
                    v-else
                    class="contact_profile_img"
                    src="@/assets/group-default-image.png"
                />
            </div>
            <div class="right">
                <span class="contact_name">
                    {{ group_name }}
                </span>
                <span class="recent-message">
                    {{
                        recent_message.length > 20
                            ? recent_message.substring(0, 20) + '..'
                            : recent_message
                    }}
                </span>
                <span class="last-update-time">
                    Last Update: {{ last_update }}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        is_team: {
            type: Boolean,
            default: false,
        },
        group_name: {
            type: String,
            default: '',
        },
        contact_image: {
            type: String,
            default: '@/assets/default-user-image.png',
        },
        group_id: {
            type: String,
            default: null,
        },
        recent_message: {
            type: String,
            default: '',
        },
        last_update: {
            type: String,
            default: '',
        },
    },
});
</script>

<style lang="scss" scoped>
.container {
    display: inline-block;
    width: $message-group-width;
    padding: $message-group-padding;
    &:hover:not(.active) {
        background-color: $color-bg-hover;
    }

    .wrapper {
        display: flex;
        align-items: center;
    }

    .contact_profile_img {
        width: $message-group-profile-img-width;
        border-radius: $message-group-profile-img-border-radius;
    }

    .contact_name {
        font-size: $message-group-contact-name-font-size;
        color: $color-dark;
        padding: $message-group-contact-name-padding;
        margin-top: $message-group-contact-name-margin-top;
    }

    .recent-message {
        display: block;
        padding: $message-group-recent-message-padding;
    }

    .last-update-time {
        font-size: $message-group-message-time-font-size;
        padding: $message-group-message-time-padding;
    }
}
</style>
