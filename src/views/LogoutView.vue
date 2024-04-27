<script setup>

import {onMounted} from "vue";
import {getAuth, signOut} from "firebase/auth";
import LogInOutPopup from "@/components/LogInOutPopup.vue";


//DEV LOGOUT
onMounted(() => {
  signOut(getAuth())
});

</script>

<template>
  <div class="main-container">
    <LogInOutPopup out></LogInOutPopup>
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