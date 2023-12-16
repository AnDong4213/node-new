<template>
  <div>
    <HelloWorld :msg="da.msg" @changeMsg="changeMsg" />
    <div>
      <el-button @click="changeMsg">更改msg</el-button>
    </div>
    {{ da.res }}
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { queryVideoList } from '@/api/test'

import HelloWorld from './HelloWorld.vue'
const da = reactive({
  msg: 'You did it!',
  res: {}
})

const changeMsg = (m) => {
  console.log('nm--', m)
  da.msg = 'You cannot did it!'
}

const getList = async () => {
  const res = await queryVideoList({
    "pageNum": 1,
    "pageSize": 30
  })
  console.log(res)
  da.res = res
}

onMounted(() => {
  // console.log('onMounted--', process.env)
  // getList()
})
</script>