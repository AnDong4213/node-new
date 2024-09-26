<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
import { fromEvent } from 'rxjs';
const clicks = fromEvent(document, 'click');
// clicks.subscribe(x => console.log(x));
clicks.forEach(res => {
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
