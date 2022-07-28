<script setup>
import { computed, defineAsyncComponent, ref } from 'vue';

const About = defineAsyncComponent(() => import(`remote/About`));

console.log(
  '%c [ xxx ]',
  'font-size:13px; background:pink; color:#bf2c9f;',
  About
);
</script>

<template>
  <div class="mt-10 text-3xl mx-auto max-w-6xl">
    <About></About>
    <div>
      <button class="bg-blue-500 rounded py-2 px-4 font-light text-white">
        addOne
      </button>
    </div>
    <div class="mt-10">
      12
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>

<style>
.mt-10 {
  color: rgb(8, 223, 73);
}
</style>
