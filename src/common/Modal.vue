<template>
    <transition name="modal-animation">
        <div v-if="modalActive" class="modal">
            <transition name="modal-animation-inner">
                <div v-if="modalActive" class="modal-inner">
                    <fa
                        icon="times"
                        size="md"
                        class="side-group-nav-icon"
                        @click="close"
                    />

                    <slot />
                </div>
            </transition>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Modal',
    props: ['modalActive'],
    setup(props, { emit }) {
        const close = () => {
            emit('close');
        };

        return { close };
    },
});
</script>

<style lang="scss" scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
    opacity: 0;
}

.modal-animation-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15;
}

.modal-animation-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-animation-inner-leave-to {
    transform: scale(0.8);
}

.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .modal-inner {
        position: relative;
        max-width: 640px;
        width: 80%;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px;
        background-color: $color-white;
        padding: 64px 16px;

        .side-group-nav-icon {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 20px;
            cursor: pointer;

            &hover {
                color: $color-light;
            }
        }
    }
}
</style>
