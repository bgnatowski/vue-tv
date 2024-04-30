<script setup>
import {computed, ref} from "vue";
import GoogleButton from "@/components/auth/AuthGoogleButton.vue";
import {authenticate} from "@/services/AuthenticationService.js";
import {useUserStore} from "@/stores/userStore.js";
import paths from "@/router/routerPaths.js";
import {useRouter} from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const errMsg = ref("");

const isCompletedForm = computed(() => {
  return !email.value || !password.value;
})

const login = async () => {
  try {
    const currentUser = await authenticate(email.value, password.value);
    useUserStore().setUser(currentUser.displayName, currentUser.email);
    await router.push(paths.MAIN_ROUTE)
  } catch (error) {
    errMsg.value = error;
  }
};

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
      <GoogleButton class="google-button"></GoogleButton>
    </div>
    <p class="signup-text">Nie masz jeszcze konta?
      <a class="signup-link" @click="router.push(paths.REGISTER_ROUTE)">Utwórz je</a>
    </p>
  </div>
</template>

<style scoped>
@import url(@/assets/auth-common.css);

</style>
