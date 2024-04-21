<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {authenticate, authenticateWithGoogle} from "@/services/AuthenticationService.js";
import SignInGoogleButton from "@/views/SignInGoogleButton.vue";

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
</script>

<template>
  <div class="main-container">
    <div class="form-container">
      <h1>Zaloguj się</h1>
      <label for="email">E-mail</label>
      <input type="email" id="email" placeholder="E-mail" v-model="email"/>
      <label for="password">Hasło</label>
      <input type="password" id="password" placeholder="Hasło" v-model="password"/>
      <p v-if="errMsg"> {{ errMsg }}</p>
      <button type="submit" class="login-button" @click="signIn">Zaloguj się</button>
      <SignInGoogleButton class="google-button"></SignInGoogleButton>
      <div class="form-no-account">
        <p class="signup-text">Nie masz jeszcze konta?</p>
        <a @click="router.push('/register')" class="signup-link">Utwórz je</a>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<style scoped>
.main-container {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url('@/resources/background-login.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.form-container {
  width: 80vw;
  max-width: 600px;
  padding: 5vw;
  margin: 2vw auto;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h1 {
  text-align: center;
}
input{
  border-radius: 36px;
  border: 1px solid ;
  background-color: #fff;
  padding: 1em 2em;
  color: #000;
}

label {
  padding: 1em 1em .5em 1em;
  font-family: "Red Hat Display", sans-serif;
  font-weight: 600;
}

.google-button {
  border-radius: 36px;
  padding: 0.5em 1em;
  font-size: 1em;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  box-sizing: border-box;
  margin: 0 auto 0 auto;
}

.login-button {
  border-radius: 36px;
  background-color: var(--main-color);
  padding: .7em 1em;
  border: none;
  color: #fff;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  width: 40%;
  box-sizing: border-box;
  margin: 1em auto .5em auto;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: var(--lighter-main);
  -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
}

.signup-link {
  color: var(--main-color);
  cursor: pointer;
}

.signup-link:hover {
  color: var(--lighter-main)
}

.form-no-account {
  display: flow;
  flex-direction: row;
  margin-top: 0.5em;
}
</style>