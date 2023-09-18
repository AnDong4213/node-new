<template>
  <div>
    <HelloWorld :msg="da.msg" @changeMsg="changeMsg" />
    <div>
      <el-button @click="changeMsg">更改msg</el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import HelloWorld from './HelloWorld.vue'
const da = reactive({
  msg: 'You did it!'
})

const changeMsg = (m) => {
  console.log('nm--', m)
  da.msg = 'You cannot did it!'
}
</script>