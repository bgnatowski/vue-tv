<script setup>
import {computed, reactive, ref} from "vue";
import GoogleButton from "@/components/auth/AuthGoogleButton.vue";
import paths from "@/router/routerPaths.js";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/AuthStore.js";

const router = useRouter();

const credentials = reactive({
  email: '',
  password: ''
});
const authStore = useAuthStore();
const errMsg = ref("");

const isCompletedForm = computed(() => {
  return !credentials.email || !credentials.password;
})

const login = async () => {
  try {
    await authStore.loginUser(credentials)
    await router.push(paths.MAIN_ROUTE)
  } catch (error){
    errMsg.value = error
  }
}
</script>


<template>
  <div class="panel-container">
    <form>
      <h1>Zaloguj się</h1>
      <label id="email" for="email">E-mail</label>
      <input type="email" placeholder="E-mail" v-model="credentials.email"/>
      <label id="password" for="password">Hasło</label>
      <input type="password" placeholder="Hasło" v-model="credentials.password"/>
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
@import url(@/assets/buttons.css);

</style>
