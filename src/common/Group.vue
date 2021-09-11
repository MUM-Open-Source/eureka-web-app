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
    width: 100%;
    padding: 20px;
    &:hover:not(.active) {
        background-color: $color-bg-hover;
    }

    .wrapper {
        display: flex;
        align-items: center;
    }

    .contact_profile_img {
        width: 80px;
        border-radius: 50%;
    }

    .contact_name {
        font-size: 20px;
        color: $color-dark;
        padding: 30px;
        margin-top: 200px;
    }

    .recent-message {
        display: block;
        padding: 5px 30px;
    }

    .last-update-time {
        font-size: 11px;
        padding: 30px;
    }
}
</style>
