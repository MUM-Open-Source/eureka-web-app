<template>
    <div class="group-menu">
        <div class="group-menu__items">
            <div
                class="group-menu__item pad--2 cursor__pointer"
                @click="onClick"
            >
                <div class="body">Group Info</div>
            </div>
        </div>
    </div>
</template>

<script>
// import store from '@/store';
import { ref } from 'vue';

export default {
    name: 'GroupMenu',
    props: {
        group_id: {
            type: String,
        },
        onClick: {
            type: Function,
        },
    },
    setup() {
        let isModalShown = ref(false);

        const toggleModal = () => {
            isModalShown.value = !isModalShown.value;
        };

        // list of menu items to be displayed
        const menu_items = [
            {
                title: 'Group Info',
                component_name: '',
            },
        ];

        return {
            menu_items,
            isModalShown,
            toggleModal,
        };
    },
};
</script>

<style lang="scss" scoped>
.group-menu {
    border: $message-group-menu-border-radius solid;
    background-color: $color-white;
    width: $message-group-menu-width;
    position: absolute;
    margin-left: $message-group-menu-margin-left;
    &__item {
        display: flex;
        align-items: center;
        &:hover {
            background: $color-bg-hover;
        }
    }
}
</style>
