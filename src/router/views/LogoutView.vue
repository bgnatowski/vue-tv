<script setup>

import {onMounted} from "vue";
import {getAuth, signOut} from "firebase/auth";
import {useUserStore} from "@/stores/userStore.js";
import AuthPopup from "@/components/auth/AuthPopup.vue";

onMounted(() => {
  useUserStore().logout()
  signOut(getAuth())
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