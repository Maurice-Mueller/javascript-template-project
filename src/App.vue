<template>
  <div>
    <h1>My new app: {{message}}</h1>
    <p>prop: {{propMessage}}</p>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    propMessage: String
  }
})
export default class App extends Vue {
  message: string = 'Hello!'
}
</script>

<style>
h1 {
  color: red
}
</style>
