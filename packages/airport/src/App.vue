<script setup>
import { computed, defineAsyncComponent, ref } from 'vue';
// import About from 'remote/About';

const About = defineAsyncComponent(() => import('remote/About'));
const Button = defineAsyncComponent(() => import('./components/Button.vue'));

const count = ref(0);

console.log(
  '%c [ 123 ]',
  'font-size:13px; background:pink; color:#bf2c9f;',
  About
);

const add = () => {
  count.value++;
};
</script>

<template>
  <div class="mt-10 text-3xl mx-auto max-w-6xl">
    <About :count="count"></About>
    <div>
      <el-button @click="add">add</el-button>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.mt-10 {
  color: rgb(8, 223, 73);
}
</style>
