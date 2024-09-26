<template>
  <header>
    <div class="wrapper">
      <!-- <CompOne /> -->
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/antdv">antdv</RouterLink>
        <RouterLink to="/grid">Grid</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import CompOne from './components/CompOne.vue'
</script>

<style scoped>
nav a.router-link-exact-active {
  color: var(--color-text);
}
</style>