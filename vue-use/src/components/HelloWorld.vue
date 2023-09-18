<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <p>{{ x }} - {{ y }}</p>
    <p>{{ data }}</p>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { useMouse, useVModel } from '@vueuse/core'

const props = defineProps({
  msg: {
    type: String,
    required: true
  }
})

const { x, y } = useMouse()

const emit = defineEmits(['changeMsg'])

const data = useVModel(props, 'msg', emit, { passive: true, deep: true })

onMounted(async () => {
  data.value = '9999'
  await nextTick()
  console.log(data.value)
  console.log(props)
})
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
