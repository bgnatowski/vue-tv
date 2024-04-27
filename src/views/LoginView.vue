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
  <div class="panel-container">
    <form>
      <h1>Zaloguj się</h1>

      <label id="email" for="email">E-mail</label>
      <input type="email" placeholder="E-mail" v-model="email"/>
      <label id="password" for="password">Hasło</label>
      <input type="password" placeholder="Hasło" v-model="password"/>

      <p v-if="errMsg"> {{ errMsg }}</p>
    </form>

    <div class="buttons">
      <button
          @click="login"
          :disabled="isCompletedForm"
          type="submit"
          class="action-button">Zaloguj się
      </button>
      <SignInGoogleButton class="google-button"></SignInGoogleButton>
    </div>
    <p class="signup-text">Nie masz jeszcze konta?
      <a class="signup-link" @click="router.push(paths.REGISTER_ROUTE)">Utwórz je</a>
    </p>
  </div>
</template>

<style scoped>
@import url(@/assets/auth-common.css);

</style>