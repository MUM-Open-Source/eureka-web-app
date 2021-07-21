<template>
    <div id="sidenav" :class="showOrHide">
        <!-- General -->
        <div class="side-nav__group mar__b--2 mar__t--1">
            <router-link :to="{ name: '' }">
                <div class="side-nav__group--link">
                    <fa icon="border-all" size="md" class="side-nav__icon" />
                    <div class="side-nav__text">Dashboard</div>
                </div>
            </router-link>
            <router-link :to="{ name: '' }">
                <div class="side-nav__group--link">
                    <fa
                        :icon="['far', 'comments']"
                        size="md"
                        class="side-nav__icon"
                    />
                    <div class="side-nav__text">Messages</div>
                </div>
            </router-link>
        </div>
        <!-- Academic Hub -->
        <div class="side-nav__group mar__b--2">
            <div class="side-nav__group--header">Academic Hub</div>
            <router-link :to="{ name: 'Incubator' }">
                <div class="side-nav__group--link">
                    <fa
                        icon="project-diagram"
                        size="md"
                        class="side-nav__icon"
                    />
                    <div class="side-nav__text">Incubator</div>
                </div>
            </router-link>
            <router-link :to="{ name: '' }">
                <div class="side-nav__group--link">
                    <fa icon="book" size="md" class="side-nav__icon" />
                    <div class="side-nav__text">Research</div>
                </div>
            </router-link>
        </div>
        <!-- Extracurricular -->
        <div class="side-nav__group mar__b--2">
            <div class="side-nav__group--header">Extracurricular</div>
            <router-link :to="{ name: 'BrowseEvents' }">
                <div class="side-nav__group--link">
                    <fa
                        :icon="['far', 'calendar-alt']"
                        size="md"
                        class="side-nav__icon"
                    />
                    <div class="side-nav__text">Events</div>
                </div>
            </router-link>
            <router-link :to="{ name: '' }">
                <div class="side-nav__group--link">
                    <fa icon="code" size="md" class="side-nav__icon" />
                    <div class="side-nav__text">Projects</div>
                </div>
            </router-link>
            <router-link :to="{ name: 'FindTalent' }">
                <div class="side-nav__group--link">
                    <fa
                        :icon="['far', 'handshake']"
                        size="md"
                        class="side-nav__icon"
                    />
                    <div class="side-nav__text">Talent</div>
                </div>
            </router-link>
        </div>
        <div class="side-nav__group mar__b--2" v-if="userIsAdmin">
            <div class="side-nav__group--header">
                Mission Control
            </div>
            <router-link :to="{ name: 'Admin' }">
                <div class="side-nav__group--link">
                    <fa icon="user-shield" size="md" class="side-nav__icon" />
                    <div class="side-nav__text">Admin Dash</div>
                </div>
            </router-link>
        </div>
        <div class="side-nav__group mar__b--2">
            <router-link :to="{ name: 'Feedback' }">
                <div class="side-nav__group--link side-nav__group--bottom">
                    <fa
                        :icon="['far', 'comment-alt']"
                        size="md"
                        class="side-nav__icon"
                    />
                    <div class="side-nav__text">Feedback</div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import store from '@/store';
export default defineComponent({
    name: 'SideNav',
    setup() {
        const showOrHide = computed(() =>
            store.state.isSideNavCollapsed ? 'side-nav__hide' : 'side-nav__show'
        );
        const userIsAdmin = computed(() =>
            store.state.user_data
                ? store.state.user_data.roles.includes('admin')
                : false
        );
        return {
            userIsAdmin,
            showOrHide,
        };
    },
});
</script>

<style lang="scss" scoped>
/* The sidebar menu */
#sidenav {
    height: 100%;
    width: $side-nav-width;
    position: fixed;
    z-index: 2;
    top: 0;
    background-color: $color-side-nav-bg;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
.side-nav__hide {
    left: -$side-nav-width;
}
.side-nav__show {
    left: 0;
}
.side-nav__group {
    &--header {
        padding-left: $side-nav-header-pad-l;
    }
    &--link {
        display: flex;
        align-items: center;
        padding: $side-nav-group-padding;
        border-radius: $app-border-radius-sm;
        margin: $side-nav-link-mar;
        &:hover {
            background-color: $color-bg-hover;
            cursor: pointer;
        }
    }
    &--bottom {
        position: absolute;
        bottom: $side-nav-group-bottom-mar-b;
        right: 0;
        left: 0;
    }
}
.side-nav__icon {
    width: $side-nav-icon-width;
    margin-right: $side-nav-icon-mar-r;
    color: $color-dark;
}
</style>
