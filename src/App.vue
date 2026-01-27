<template>
  <div class="page">
    <nav class="nav">
      <RouterLink to="/">Progress demo</RouterLink>
      <RouterLink to="/diagram">Form demo</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<style scoped>
.nav {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.nav a {
  text-decoration: none;
  color: #555;
  font-weight: 500;
}

.nav a.router-link-active {
  color: #000;
}
</style>
