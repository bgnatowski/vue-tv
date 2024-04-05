<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {authenticate, authenticateWithGoogle} from "@/services/AuthenticationService.js";

const email = ref("");
const password = ref("");
const errMsg = ref("");

const router = useRouter();

const signIn = async () => {
  try {
    await authenticate(email.value, password.value, router);
  } catch (error) {
    errMsg.value = error;
  }
};

const signWithGoogle = () => {
  authenticateWithGoogle(router);
}
</script>

<template>
  <h1>Zaloguj</h1>
  <!--  todo email lub nazwa uzytkownika jako logowanie? idk -->
  <p><input type="text" placeholder="E-mail" v-model="email"/></p>
  <p><input type="password" placeholder="Hasło" v-model="password"/></p>
  <p v-if="errMsg"> {{ errMsg }}</p>
  <p>
    <button @click="signIn">Zaloguj</button>
  </p>
  <p>
    <p><button @click="signWithGoogle">Sign In with Google</button></p>
  </p>
  <p>Nie masz jeszcze konta? <a @click="router.push('/register')">Utwórz je</a></p>
</template>

<style scoped>

</style>