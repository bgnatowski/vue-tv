<script setup>
import {useRouter} from "vue-router";
import paths from "@/router/routerPaths.js";

const router = useRouter()

const props = defineProps({
  out: Boolean,
})

</script>

<template>
  <div class="panel-container">
    <div v-if="props.out">
      <h1>Wylogowano!</h1>
      <p class="signup-text">Będziemy tęsknić!</p>
      <div class="buttons">
        <button @click="router.push(paths.LOGIN_ROUTE)" class="register-button">Zaloguj ponownie</button>
      </div>
    </div>
    <div v-else>
      <h1>Dziękujęmy za rejestracje!</h1>
      <p class="signup-text">Możesz się zalogować</p>
      <div class="buttons">
        <button @click="router.push(paths.LOGIN_ROUTE)" class="register-button">Zaloguj się</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 3em;
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 13px 3px rgba(0, 0, 0, 0.25);
  width: 50%;
  min-width: min-content;
  padding: 2em;
}

.panel-container h1 {
  width: 100%;
  text-align: center;
  font-size: calc((0.5em + 0.6vmin) + (0.5em + 0.6vmax));
  white-space: nowrap;
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
</style>