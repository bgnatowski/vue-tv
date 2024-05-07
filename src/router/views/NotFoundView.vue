<script setup>
import {useRouter} from 'vue-router';
import paths from "@/router/routerPaths.js";

const router = useRouter();

</script>

<template>
  <div class="main-auth-container">
    <div class="post">
      <h1>404 not found</h1>
      <p>Strona nie została znaleziona</p>
      <div class="buttons">
        <button class="action-button" @click="router.push(paths.HOME_ROUTE)">Wróc</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/buttons.css);

h1, p {
  text-align: center;
}

</style>
