<template>
    <transition name="modal-transition">
        <div>
            <div class="backdrop" @click="close" />
            <div class="modal pad--1">
                <IconButton @click="close">
                    <fa icon="times" />
                </IconButton>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
import { defineComponent } from 'vue';
import IconButton from '@/modules/admin/IconButton.vue';

export default defineComponent({
    name: 'Modal',
    components: { IconButton },
    setup(_, context) {
        const close = () => context.emit('close');

        return {
            close,
        };
    },
});
</script>

<style lang="scss" scoped>
.backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
}
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    border-radius: 1rem;
    flex-direction: column;
    z-index: 4;
}
</style>
