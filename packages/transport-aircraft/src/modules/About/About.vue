<template>
  <div class="box">这是一个 About 的界面</div>
  <div>{{ count }}</div>
</template>

<script setup lang="ts">
defineProps({
  count: {
    type: Number,
  },
});
</script>

<style>
.box {
  color: rgb(118, 233, 23);
}
</style>
