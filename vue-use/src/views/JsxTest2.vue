<script setup lang="jsx">
const props = defineProps({
  data: {
    type: Number
  }
})
const jsx = (props) => <div>哈哈哈哈1-{props.data}</div>
</script>

<template>
  <div>
    <jsx />
  </div>
</template>

<style></style>
