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
      <div class="login-form-container">
        <div class="login-header">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4db38c53bc6c09336ca4a00c67529ee1676d9f5c2e8d4c63cb2218c12f23d406?apiKey=7836e9d46c0a409dbac8e5fb7888aa0f&" alt="Company logo" class="company-logo" />
          <div class="login-form">
            <h1 class="login-title">Zaloguj się</h1>
            <!--  todo email lub nazwa uzytkownika jako logowanie? idk -->
            <form>
              <label for="email" class="form-label" >E-mail</label>
              <input type="email" id="email" class="form-input" placeholder="E-mail" v-model="email"/>
              <label for="password" class="form-label">Hasło</label>
              <input type="password" id="password" class="form-input" v-model="password"/>
              <p v-if="errMsg"> {{ errMsg }}</p>
              <button type="submit" class="login-button" @click="signIn">
                <span class="button-text">Zaloguj się</span>
              </button>
            </form>
            <SignInGoogleButton></SignInGoogleButton>
          </div>
        </div>
        <div class="signup-prompt">
          <p class="signup-text">Nie masz jeszcze konta?</p>
          <a @click="router.push('/register')" class="signup-link">Utwórz je</a>
        </div>
      </div>
    </div>
    <div class="image-container">
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/41320b0655af8834da7c942c23029b9f150520dde4203eab9c8723a8be9d8912?apiKey=7836e9d46c0a409dbac8e5fb7888aa0f&" alt="Decorative background" class="background-image" />
    </div>
  </div>
</template>

<style scoped>
.main-container {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.login-container {
  display: flex;
  gap: 20px;
}

.login-form-container {
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 71%;
}

.login-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  font-size: 28px;
  color: #000;
  font-weight: 500;
}

.login-form {
  align-self: end;
  display: flex;
  flex-direction: column;
}

.login-title {
  align-self: center;
}

.form-input {
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 19px;
  height: 79px;
  margin-top: 11px;
}

.login-button {
  align-self: center;
  background-color: #3dccc7;
  border-radius: 36px;
  color: #fff;
  font-weight: 600;
  justify-content: center;
  margin-top: 37px;
  max-width: 100%;
  padding: 22px 25px;
  width: 200px;
}

.signup-prompt {
  align-self: end;
  display: flex;
  font-size: 24px;
  font-weight: 300;
  gap: 20px;
  margin: 40px 121px 0 0;
  max-width: 100%;
  width: 450px;
}

.signup-text {
  color: #000;
  flex-grow: 1;
  flex-basis: auto;
}

.signup-link {
  color: #3dccc7;
}

.image-container {
  display: flex;
  width: 20%;
  margin: 0 0 0 auto;
  object-position: bottom;
}

.background-image {
  width: 100%;
  flex-grow: 1;
  object-position: center;
  margin: auto;
}

</style>