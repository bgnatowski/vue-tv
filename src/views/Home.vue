<script setup>
import {useRouter} from "vue-router";
import {authenticateWithGoogle} from "@/services/AuthenticationService.js";
const router = useRouter()

const signWithGoogle = () => {
  authenticateWithGoogle(router);
}

</script>

<template>
  <h1>VueTv</h1>
  <p>To, co chcesz wiedzieć o swoich filmach - na wyciągnięcie ręki</p>
  <p><button @click="router.push('/register')">Dołącz teraz</button></p>
  <p><button @click="router.push('/sign-in')">Zaloguj</button></p>
  <p><button @click="signWithGoogle">Sign In with Google</button></p>
  <p>VueTV</p>
  <p>Piotr Grochala | Bartosz Gnatowski | Kamil Rachwał</p>
  <p>ZIISS2-1211 | Grupa D</p>
</template>

<style scoped>

</style>