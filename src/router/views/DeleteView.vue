<script setup>

import AuthPopup from "@/components/auth/AuthPopup.vue";

</script>

<template>
  <div class="main-container">
    <AuthPopup type="delete"></AuthPopup>
  </div>
</template>

<style>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem 0 1rem 0;
}
</style>