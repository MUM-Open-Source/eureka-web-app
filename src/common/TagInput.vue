<template>
  <div class='tag-input'>
    <div v-for='(tag, index) in tags' :key='tag' class='tag-input__tag mar__t--1 text--white'>
      <span @click="removeTag(index)" class="cursor__pointer">x</span>
      {{ tag }}
    </div>
    <input type='text' placeholder="Enter a Tag" class='tag-input__text' @keydown="addTag" @keydown.delete="removeLastTag"/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({

  data() {
    return {
      tags: ['HTML', 'CSS'] as Array<string>

    }
  },
  methods: {
      addTag(event:any) {        
        if(event.code == 'Comma' || event.code == 'Enter'){
            event.preventDefault();
            var val = event.target.value.trim() 

            if(val.length > 0 && ! this.tags.includes(val.toUpperCase())){
                this.tags.push(val.toUpperCase())
                event.target.value = ''

            }
        }

      },
      removeTag(index:number) {
          this.tags.splice(index,1)
      },
      removeLastTag(event:any){
          if(event.target.value.length === 0) {
              this.removeTag(this.tags.length - 1)
          }
      }

  }
})
</script>
<style lang="scss" scoped>
.tag-input {
    width: 100%;
    border: 1px solid #eee;
    //font-size: 0.9em;
    height: 50px;
    box-sizing: border-box;
    padding: 0 10px;
    display:table;
    &__tag {
        height: 30px;
        float: left;
        margin-right: 10px;
        background-color: $color-brand;
        //margin-top: 10px;
        line-height: 30px;
        padding: 0 5px;
        border-radius: $app-border-radius-sm;
;
        & > span {
            //cursor: pointer;
            opacity: 0.75;
        }
    }
    &__text {
        border: none;
        outline: none;
        //font-size: 1em;
        line-height: 50px;
        background: none;
    }
}
</style>