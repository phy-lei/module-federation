<script setup>
import { computed, defineAsyncComponent, ref } from 'vue';
// import About from 'remote/About';

const About = defineAsyncComponent(() => import('remote/About'));
const Button = defineAsyncComponent(() => import('./components/Button.vue'));

console.log(
  '%c [ 123 ]',
  'font-size:13px; background:pink; color:#bf2c9f;',
  About
);
</script>

<template>
  <div class="mt-10 text-3xl mx-auto max-w-6xl">
    <About></About>
    <div>
      <Button class="bg-blue-500 rounded py-2 px-4 font-light text-white">
      </Button>
    </div>
    <div class="mt-10">
      123222
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>

<style>
.mt-10 {
  color: rgb(8, 223, 73);
}
</style>
