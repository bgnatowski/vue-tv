<script setup>
import AuthPopup from "@/components/auth/AuthPopup.vue";
import {ref} from "vue";
import AuthRegisterComponent from "@/components/auth/AuthRegisterComponent.vue";

const isRegistered = ref(false)

</script>

<template>
  <div class="main-auth-container">
    <AuthPopup type="in" v-if="isRegistered"></AuthPopup>
    <AuthRegisterComponent v-else @registered="isRegistered=true"></AuthRegisterComponent>
  </div>

</template>