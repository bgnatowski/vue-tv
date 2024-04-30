<script setup>
import AuthPopup from "@/components/AuthPopup.vue";
import {ref} from "vue";

const isRegistered = ref(false)

</script>

<template>
  <div class="main-container">
    <AuthPopup type="in" v-if="isRegistered"/>
    <RegisterComponent v-else @registered="isRegistered=true"></RegisterComponent>
  </div>

</template>

<style scoped>
@import url(@/assets/auth-common.css);

</style>