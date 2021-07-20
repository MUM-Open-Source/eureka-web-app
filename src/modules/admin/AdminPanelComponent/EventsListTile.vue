<template>
    <div
        v-bind:class="{ card: !inEdit, 'editing-card': inEdit }"
        class="event__card pad__t--1 pad__b--1"
    >
        <div class="leading">
            <div class="leading">
                <img :src="event.image_url" />
                <div class="data" v-if="!inEdit">
                    <h3>{{ name }}</h3>
                    <small>
                        <span>
                            {{ dates }} • Organized by {{ organizer }} •
                            {{ type }}
                        </span>
                    </small>
                    <p>{{ description }}</p>
                </div>
            </div>

            <div class="buttons">
                <icon-button v-if="!inEdit" v-on:click="removeEvent">
                    <i class="material-icons" style="color: red">delete</i>
                </icon-button>
                <icon-button v-on:click="onEditClicked">
                    <i v-if="inEdit" class="material-icons">clear</i>
                    <i v-if="!inEdit" class="material-icons">edit</i>
                </icon-button>
            </div>
        </div>
        <div v-if="inEdit" class="data pad__b--1">
            <h4>Name</h4>
            <input type="text" v-model="name" />
            <h4>Image</h4>
            <input type="text" v-model="image_url" />
            <h4>Date</h4>
            <input type="text" v-model="dates" />
            <h4>Organizer</h4>
            <input type="text" v-model="organizer" />
            <h4>Type</h4>
            <input type="text" v-model="type" />
            <h4>Description</h4>
            <textarea type="text" v-model="description" />
            <Button text="Done" v-on:click="updateEvent" />
        </div>
    </div>
</template>

<script>
import store from '@/store';
import Swal from 'sweetalert2';
import IconButton from '@/modules/admin/IconButton.vue';
import Button from '@/common/Button.vue';
export default {
    components: { IconButton, Button },
    name: 'EventsListTile',
    props: {
        event: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            inEdit: false,
            id: this.event.id,
            image_url: this.event.image_url,
            name: this.event.name,
            dates: this.event.dates,
            organizer: this.event.organizer,
            type: this.event.type,
            description: this.event.description,
        };
    },
    methods: {
        onEditClicked() {
            this.inEdit = !this.inEdit;
        },
        updateEvent() {
            store.dispatch('setEvents', {
                ...this.event,
                dates: this.dates,
                name: this.name,
                image_url: this.image_url,
                organizer: this.organizer,
                type: this.type,
                description: this.description,
            });
            this.onEditClicked();
        },
        removeEvent() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            }).then(result => {
                if (result.isConfirmed) {
                    store.dispatch('deleteEvents', this.event);
                    Swal.fire(
                        'Deleted!',
                        'The event has been deleted',
                        'success'
                    );
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.event__card {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.card {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.editing-card {
    display: flex;
    flex-direction: column;
}

.buttons {
    display: flex;
    flex-direction: column;
}

input,
textarea {
    background-color: #f0f0f0;
    border-radius: 8px;
    margin-top: 2px;
    margin-bottom: 10px;
    border: none;
    outline: none;
    padding: 15px;
}

img {
    border-radius: 10px;
    height: 100px;
    width: 100px;
    margin: 8px;
    object-fit: cover;
}

.data {
    width: 100%;
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    transition: 1s;
}

.leading {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

@media screen and (max-width: 1000px) {
    .leading {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }
    .buttons {
        display: flex;
        flex-direction: row;
    }
}
</style>
