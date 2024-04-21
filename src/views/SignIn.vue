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

const signWithGoogle = () => {
  authenticateWithGoogle(router);
}
</script>

<template>
  <div class="main-container">
    <div class="login-container">
      <div class="img-container">
        <img class="image-container-upper"
             src="https://cdn.builder.io/api/v1/image/assets/TEMP/4db38c53bc6c09336ca4a00c67529ee1676d9f5c2e8d4c63cb2218c12f23d406?apiKey=7836e9d46c0a409dbac8e5fb7888aa0f&"/>
      </div>
      <form>
        <h1>Zaloguj się</h1>
        <label for="email">E-mail</label>
        <input type="email" id="email" placeholder="E-mail" v-model="email"/>
        <label for="password">Hasło</label>
        <input type="password" id="password" v-model="password"/>
        <p v-if="errMsg"> {{ errMsg }}</p>
        <button type="submit" class="login-button" @click="signIn">Zaloguj się</button>
        <SignInGoogleButton></SignInGoogleButton>
        <p class="signup-text">Nie masz jeszcze konta?</p>
        <a @click="router.push('/register')" class="signup-link">Utwórz je</a>
      </form>
      <div class="image-container">
        <img class="image-container-lower"
             src="https://cdn.builder.io/api/v1/image/assets/TEMP/41320b0655af8834da7c942c23029b9f150520dde4203eab9c8723a8be9d8912?apiKey=7836e9d46c0a409dbac8e5fb7888aa0f&"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  flex-grow: 1;
  width: 100%;
}

.login-container {
  width: 50%;
  height: 100%;
  background-color: hotpink;
  display: flex;
  flex-direction: row;
}

.image-container-lower {
  background-color: pink;
  width: 25%;
  height: 100%;
  margin: 0 0 0 0;
}

.image-container-upper {
  background-color: pink;
  width: 25%;
  height: 100%;
}

.image-container img {

}

.login-button {
  border-radius: 36px;
  background-color: #3dccc7;
  padding: 0.2em 0.5em;
  border: none;
  color: #fff;
  font-size: calc((.2em + .5vmin) + (.2em + .5vmax));
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  width: fit-content;
  box-sizing: border-box;
  overflow: hidden;
  margin: 2px auto 2px auto;
  width: auto;
}

.login-button:hover {
  background-color: rgba(46, 187, 182, 0.93);
  -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
}

.signup-link {
  color: #3dccc7;
  cursor: pointer;
}

.signup-link:hover {
  color: rgba(46, 187, 182, 0.93);;
}

</style>