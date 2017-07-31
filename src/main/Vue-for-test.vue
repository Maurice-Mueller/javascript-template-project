<template>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class ClassForTest extends Vue {
  private bias: number = 10

  public sub(a: number, b: number): number {
    return a - b
  }

  public sub_with_bias(a: number): number {
    return a - this.bias
  }
}
</script>

<style>
</style>
