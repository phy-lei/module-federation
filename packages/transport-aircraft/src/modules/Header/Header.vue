<template>
  <div class="bg-blue-400 flex text-white p-5 text-3xl">
    <div class="font-bold mr-5">header</div>
    <div class="mr-5">|</div>
    <div class="flex gap-3 flex-grow">
      <router-link to="/" class="mr-3">Home</router-link>
      <router-link to="/about" class="mr-3">About</router-link>
    </div>
    <div>123</div>
    <div class="saber-red">红色文字</div>
  </div>
</template>

<style>
.saber-red {
  color: red;
}
</style>
