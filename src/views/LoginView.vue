<script setup>
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import SignInGoogleButton from "@/components/SignInGoogleButton.vue";
import {authenticate} from "@/services/AuthenticationService.js";
import paths from "@/router/routerPaths.js";

const email = ref("");
const password = ref("");
const errMsg = ref("");

const router = useRouter();

const login = async () => {
  try {
    await authenticate(email.value, password.value);
    await router.push(paths.MAIN_ROUTE)
  } catch (error) {
    errMsg.value = error;
  }
};

const isCompletedForm = computed(() => {
  return !email.value || !password.value;
})

</script>

<template>
  <section class="panel-container">
    <form>
      <h1>Zaloguj się</h1>

      <label id="email" for="email">E-mail</label>
      <input type="email" placeholder="E-mail" v-model="email"/>
      <label id="password" for="password">Hasło</label>
      <input type="password" placeholder="Hasło" v-model="password"/>

      <p v-if="errMsg"> {{ errMsg }}</p>
    </form>

    <div class="buttons">
      <button :disabled="isCompletedForm" @click="login" type="submit" class="login-button">Zaloguj się</button>
      <SignInGoogleButton class="google-button"></SignInGoogleButton>
    </div>
    <p class="signup-text">Nie masz jeszcze konta?
      <a class="signup-link" @click="router.push(paths.REGISTER_ROUTE)">Utwórz je</a>
    </p>
  </section>
</template>

<style scoped>
.panel-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 3em;
  margin: 0 auto;
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 13px 3px rgba(0, 0, 0, 0.25);
  width: 50%;
  min-width: min-content;
}

.panel-container h1 {
  width: 100%;
  text-align: center;
  font-size: calc((0.5em + 0.6vmin) + (0.5em + 0.6vmax));
  white-space: nowrap;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  min-width: 150px;
  padding: 1rem;
}

form label {
  padding: 0.5rem;
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

.login-button {
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

.login-button:hover:enabled {
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
  font-size: calc((.2em + .5vmin) + (.2em + .5vmax));;
}

button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #7777;
  cursor: default;
}
</style>