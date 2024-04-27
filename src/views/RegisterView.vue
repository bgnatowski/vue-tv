<script setup>

import {computed, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {signUp} from "@/services/AuthenticationService.js";
import SignInGoogleButton from "@/components/SignInGoogleButton.vue";
import RegisteredPopup from "@/components/LogInOutPopup.vue";
import paths from "@/router/routerPaths.js";

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

watch([email, emailRepeat], ([newEmail, newEmailRepeat]) => {
  emailMismatchError.value = newEmail !== newEmailRepeat && newEmailRepeat !== '' ? 'E-maile nie są identyczne.' : '';
});

watch([password, passwordRepeat], ([newPassword, newPasswordRepeat]) => {
  passwordMismatchError.value = newPassword !== newPasswordRepeat && newPasswordRepeat !== '' ? 'Hasła nie są identyczne.' : '';
});

const register = async () => {
  try {
    isRegistered.value = await signUp(email.value, password.value, username.value)
  } catch (error) {
    errMsg.value = error;
  }
};

const isCompletedForm = computed(() => {
  return !email.value || !emailRepeat.value || !username.value || !password.value || !passwordRepeat.value || email.value !== emailRepeat.value || password.value !== passwordRepeat.value;
});

</script>

<template>
  <RegisteredPopup v-if="isRegistered"/>
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
      <button @click="register" :disabled="isCompletedForm" type="submit" class="register-button">Zarejestruj się
      </button>
      <SignInGoogleButton class="google-button"></SignInGoogleButton>
    </div>
    <p class="signup-text">Masz już konto?
      <a class="signup-link" @click="router.push(paths.LOGIN_ROUTE)">Zaloguj się</a>
    </p>
  </div>
</template>

<style scoped>
.panel-container h1 {
  width: 100%;
  text-align: center;
  font-size: calc((0.5em + 0.6vmin) + (0.5em + 0.6vmax));
  white-space: nowrap;
}

.panel-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 3em;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 13px 3px rgba(0, 0, 0, 0.25);
  width: 50%;
  min-width: min-content;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  min-width: min-content;
  padding: 1rem;
}

form label {
  padding: .5rem;
  margin: 0.1rem;
  font-size: calc((0.2em + .5vmin) + (0.2em + .5vmax));
}

form input {
  padding: 1rem;
  margin: 0.1rem;
  border-radius: 3em;
  font-size: calc((0.2em + .5vmin) + (0.2em + .5vmax));
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: .5rem auto .2rem auto;
  gap: .2em;
}

.register-button {
  min-width: 100%;
  white-space: nowrap;
  border-radius: 3em;
  background-color: var(--main-color);
  padding: 1em;
  border: 2px solid var(--main-color);
  color: #fff;
  font-size: calc((.2em + .5vmin) + (.2em + .5vmax));
  font-weight: 600;
  cursor: pointer;
}

.register-button:hover:enabled {
  background-color: var(--lighter-main);
  border: 2px solid var(--lighter-main);
  -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
}

.google-button {
  border-radius: 3em;
  padding: 1em;
  border: 2px solid var(--main-color);
  font-size: calc((.2em + .5vmin) + (.2em + .5vmax));
  font-weight: 600;
  cursor: pointer;
}

.google-button:hover {
  background-color: #cecece;
}

.signup-text {
  white-space: nowrap;
  display: flex;
  justify-content: center;
  gap: 5%;
  width: 100%;
  font-weight: 200;
  text-align: center;
  padding: 1rem;
  color: #000;
  font-size: calc((.2em + .5vmin) + (.2em + .5vmax));
}

.signup-link {
  color: var(--main-color);
  cursor: pointer;
}

.signup-link:hover {
  color: var(--lighter-main)
}

form p {
  width: 100%;
  color: red;
  font-weight: 200;
  text-align: center;
  padding-top: .5rem;
  font-size: calc((0.2em + .5vmin) + (0.2em + .5vmax));
}

button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #7777;
  cursor: default;
}
</style>