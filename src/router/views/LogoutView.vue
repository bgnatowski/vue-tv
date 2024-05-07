<script setup>

import {onMounted} from "vue";
import AuthPopup from "@/components/auth/AuthPopup.vue";
import {useAuthStore} from "@/stores/AuthStore.js";


const authStore = useAuthStore()
onMounted(() => {
  authStore.logoutUser()
});

</script>

<template>
  <div class="main-container">
    <AuthPopup type="out"></AuthPopup>
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