<template>
  <div class="new__form">
    <div class="subheading mar__b--1">Create New Project</div>
    <label for="projectName" class="custom-input__label tagline--bold">Project Name</label>
    <input
      id="projectName"
      type="text"
      name="projectName"
      v-model="project_name"
      placeholder="Please Enter Project Name"
      class="custom-input mar__b--2"
    />
    <label for="projectDuration" class="custom-input__label tagline--bold">Project Duration</label>
    <input
      id="projectDuration"
      type="text"
      name="projectDuration"
      v-model="project_duration"
      placeholder="Please Enter Project Duration"
      class="custom-input mar__b--2"
    />
    <label class="custom-input__label tagline--bold">Research Fields</label>
    <Multiselect
        v-model="indexes"
        mode="tags"
        :searchable="true"
        :options="options"
        :max="4"
        placeholder="Choose Field..."
        class="body new-project__multiselect mar__b--2"
        :createTag="true"
    />
    <div class="new-project__overview">
      <label for="overview" class="custom-input__label tagline--bold">Overview/Abstract</label>
      <textarea
          id="overview"
          class="body new-project__textarea"
          placeholder="Place Overview/Abstract Here"
          v-model="overview"
      />
    </div>
    <Button text="Done" v-on:click="addProject" />
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import Button from '@/common/Button.vue';
import store from '@/store'
import Swal from "sweetalert2";

export default {
  name: 'NewProject',
  components: {
      Multiselect,
      Button
  },
  data() {
    return {
      project_name: "",
      project_duration: "",
      overview: "",
      indexes: [],
      project_fields: [],
      options: [
        "ML/AI",
        "Cybersecurity",
        "Data Mining",
        "Algorithms",
        "IoT"
      ]
    }
  },
  methods: {
    addProject() {
      this.indexes.forEach((index) => {
        this.project_fields.push(this.options[index])
      })
      console.log({
        project_name: this.project_name,
        project_duration: this.project_duration,
        project_fields: this.project_fields,
        overview: this.overview
      });
      store.dispatch("addProjects", {
        project_name: this.project_name,
        project_duration: this.project_duration,
        project_fields: this.project_fields,
        overview: this.overview
      });
      Swal.fire("Added!", "A new project has been added", "success")
      this.project_name = "",
      this.project_duration = "",
      this.project_fields = [];
      this.indexes = [];
      this.overview = "";
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
.custom-input {
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  border: 1px solid $color-bg-hover;
  border-radius: 4px;
  &__label {
    color: $color-brand;
  }
  &::placeholder {
    color: $color-bg-hover;
  }
}
.new-project {
    &__overview {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
    }
    &__textarea {
      height: 100px;
    }
    &__multiselect {
        width: $multiselect-width;
    &-tag {
        background-color: $color-brand;
    }
  }
}
@media (max-width: 954px) {
    .new-project__multiselect {
        width: $multiselect-width-sm;
    }
}
@media (max-width: 425px) {
    .new-project__multiselect {
        width: 100%;
    }
}
</style>
