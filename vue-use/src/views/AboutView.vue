<template>
  <div class="about">
    <h1>This is an about page</h1>
    <JsxTest></JsxTest>
  </div>
</template>

<script setup>
import { fromEvent } from 'rxjs';
import JsxTest from './JsxTest.vue'

const clicks = fromEvent(document, 'click');

// clicks.subscribe(x => console.log(x));
clicks.forEach(res => {
  console.log(res, '----')
})
// console.log(clicks)
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
