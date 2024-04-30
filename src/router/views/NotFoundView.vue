<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<template>
  <div class="main-auth-container">
    <h1>404 not found</h1>
    <h1>Błąd 404. Strona nie została znaleziona</h1>
    <button @click="router.back()">Wróć</button>
  </div>
</template>

