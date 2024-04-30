<script setup>

import {computed, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {signUp} from "@/services/AuthenticationService.js";
import paths from "@/router/routerPaths.js";
import AuthPopup from "@/components/auth/AuthPopup.vue";
import GoogleButton from "@/components/auth/AuthGoogleButton.vue";

const email = ref("");
const emailRepeat = ref("");
const username = ref("");
const password = ref("");
const passwordRepeat = ref("");

const emailMismatchError = ref('');
const passwordMismatchError = ref('');

const router = useRouter()
const isRegistered = ref(false)
const errMsg = ref("");

const emits = defineEmits(['registered']);

watch([email, emailRepeat], ([newEmail, newEmailRepeat]) => {
  emailMismatchError.value = newEmail !== newEmailRepeat && newEmailRepeat !== '' ? 'E-maile nie są identyczne.' : '';
});

watch([password, passwordRepeat], ([newPassword, newPasswordRepeat]) => {
  passwordMismatchError.value = newPassword !== newPasswordRepeat && newPasswordRepeat !== '' ? 'Hasła nie są identyczne.' : '';
});

const register = async () => {
  try {
    isRegistered.value = await signUp(email.value, password.value, username.value)
    emits('registered')
  } catch (error) {
    errMsg.value = error;
  }
};

const isCompletedForm = computed(() => {
  return !email.value || !emailRepeat.value || !username.value || !password.value || !passwordRepeat.value || email.value !== emailRepeat.value || password.value !== passwordRepeat.value;
});

</script>

<template>
  <AuthPopup type="in" v-if="isRegistered"/>
  <div v-else class="panel-container">
    <form>
      <h1>Zarejestruj się</h1>

      <label id="username" for="username">Nazwa użytkownika</label>
      <input type="text" placeholder="Nazwa użytkownika" v-model="username"/>

      <label id="email" for="email">E-mail</label>
      <input type="text" placeholder="E-mail" v-model="email"/>
      <label id="emailRepeat" for="emailRepeat">Powtórz e-mail</label>
      <input type="text" placeholder="Powtórz e-mail" v-model="emailRepeat"/>

      <label id="password" for="password">Hasło</label>
      <input type="password" placeholder="Hasło" v-model="password"/>
      <label id="passwordRepeat" for="passwordRepeat">Powtórz hasło</label>
      <input type="password" placeholder="Powtórz hasło" v-model="passwordRepeat"/>

      <p v-if="passwordMismatchError">{{ passwordMismatchError }}</p>
      <p v-if="emailMismatchError">{{ emailMismatchError }}</p>
      <p v-if="errMsg">{{ errMsg }}</p>
    </form>
    <div class="buttons">
      <button
          @click.prevent="register"
          :disabled="isCompletedForm"
          type="submit"
          class="action-button">Zarejestruj się
      </button>
      <GoogleButton class="google-button"></GoogleButton>
    </div>
    <p class="signup-text">Masz już konto?
      <a class="signup-link" @click="router.push(paths.LOGIN_ROUTE)">Zaloguj się</a>
    </p>
  </div>
</template>

<style scoped>
@import url(@/assets/auth-common.css);

</style>