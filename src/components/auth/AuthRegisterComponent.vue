<script setup>

import {computed, reactive, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from '@/stores/AuthStore';
import paths from "@/router/routerPaths.js";
import AuthPopup from "@/components/auth/AuthPopup.vue";
import GoogleButton from "@/components/auth/AuthGoogleButton.vue";

const emailRepeat = ref("");
const passwordRepeat = ref("");

const emailMismatchError = ref('');
const passwordMismatchError = ref('');

const router = useRouter()
const authStore = useAuthStore();

const isRegistered = ref(false)
const errMsg = ref("");

const emits = defineEmits(['registered']);

const credentials = reactive({
  email: '',
  password: '',
  username: '',
});

watch([credentials.email, emailRepeat], ([newEmail, newEmailRepeat]) => {
  emailMismatchError.value = newEmail !== newEmailRepeat && newEmailRepeat !== '' ? 'E-maile nie są identyczne.' : '';
});

watch([credentials.password, passwordRepeat], ([newPassword, newPasswordRepeat]) => {
  passwordMismatchError.value = newPassword !== newPasswordRepeat && newPasswordRepeat !== '' ? 'Hasła nie są identyczne.' : '';
});

const register = () => {
  authStore.registerUser(credentials)
      .then((isRegisteredValue) => {
        isRegistered.value = isRegisteredValue
        emits('registered')
      })
      .catch((error) => errMsg.value = error);
};

const isCompletedForm = computed(() => {
  return !credentials.email || !emailRepeat.value || !credentials.username
      || !credentials.password || !passwordRepeat.value
      || credentials.email !== emailRepeat.value
      || credentials.password !== passwordRepeat.value;
});

</script>

<template>
  <AuthPopup type="in" v-if="isRegistered"/>
  <div v-else class="panel-container">
    <form>
      <h1>Zarejestruj się</h1>

      <label id="username" for="username">Nazwa użytkownika</label>
      <input type="text" placeholder="Nazwa użytkownika" v-model="credentials.username"/>

      <label id="email" for="email">E-mail</label>
      <input type="text" placeholder="E-mail" v-model="credentials.email"/>
      <label id="emailRepeat" for="emailRepeat">Powtórz e-mail</label>
      <input type="text" placeholder="Powtórz e-mail" v-model="emailRepeat"/>

      <label id="password" for="password">Hasło</label>
      <input type="password" placeholder="Hasło" v-model="credentials.password"/>
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
@import url(@/assets/buttons.css);

</style>