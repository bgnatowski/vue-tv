<script setup>
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
import {
  authenticateWithGoogle, signUp,
} from "@/services/AuthenticationService.js";

const email = ref("");
const emailRepeat = ref("");
const username = ref("");
const password = ref("");
const passwordRepeat = ref("");

const emailMismatchError = ref('');
const passwordMismatchError = ref('');

const router = useRouter()

watch([email, emailRepeat], ([newEmail, newEmailRepeat]) => {
  emailMismatchError.value = newEmail !== newEmailRepeat && newEmailRepeat !== '' ? 'E-maile nie są identyczne.' : '';
});

watch([password, passwordRepeat], ([newPassword, newPasswordRepeat]) => {
  passwordMismatchError.value = newPassword !== newPasswordRepeat && newPasswordRepeat !== '' ? 'Hasła nie są identyczne.' : '';
});

const register = () => {
  signUp(email.value, password.value, username.value, router)
};

const signWithGoogle = () => {
  authenticateWithGoogle(router);
}

</script>

<template>
  <div class="register-main-container">
    <h1>Utwórz konto</h1>
    <p><input type="text" placeholder="E-mail" v-model="email"/></p>
    <p>
      <input type="text" placeholder="Powtórz e-mail" v-model="emailRepeat"/>
      <p v-if="emailMismatchError">{{ emailMismatchError }}</p>
    </p>
    <p><input type="text" placeholder="Nazwa użytkownika" v-model="username"/></p>
    <p><input type="password" placeholder="Hasło" v-model="password"/></p>
    <p>
      <input type="password" placeholder="Powtórz hasło" v-model="passwordRepeat"/>
      <p v-if="passwordMismatchError">{{ passwordMismatchError }}</p>
    </p>
    <p><button @click="register">Dokończ rejestrację</button></p>
    <p><button @click="signWithGoogle">Sign In with Google</button></p>
    <p>Masz już konto? <a @click="router.push('/sign-in')">Zaloguj się</a></p>
  </div>

</template>
<style scoped>
.register-main-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}
</style>