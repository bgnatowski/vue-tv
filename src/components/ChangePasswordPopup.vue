<script setup>
import {computed, ref} from "vue";
import {changePassword, deleteUser} from "@/services/AuthenticationService.js";
import paths from "@/router/routerPaths.js";

const emits = defineEmits(['close']);
function closePopup() {
  emits('close');
}

const changed = ref()
const errorMsg = ref('')

async function confirmChangePassword(current, password1, password2) {
  try {
    changed.value = await changePassword(current, password1, password2);
  } catch (error) {
    errorMsg.value = error;
  }
}

const currentPassword = ref("");
const newPassword1 = ref("");
const newPassword2 = ref("");
const isCompletedForm = computed(() => {
  return !currentPassword.value && (newPassword1 != newPassword2);
})

</script>
<template>
  <div class="overlay">
    <div class="panel-container">
        <div class="close-bar">
          <div class="icon-button" @click="closePopup">
            <img src="@/assets/close-icon.png" alt="Close icon"/>
          </div>
        </div>
        <form class="change-password-form">
          <h1>Zmień hasło</h1>
          <input type="password" v-model="currentPassword" placeholder="Obecne hasło">
          <input type="password" v-model="newPassword1" placeholder="Nowe hasło">
          <input type="password" v-model="newPassword2" placeholder="Wpisz ponownie nowe hasło">
          <button
              @click.prevent="confirmChangePassword(password)"
              :disabled="isCompletedForm"
              class="action-button">Potwierdz
          </button>
          <p v-if="changed">Hasło zmienione</p>
          <p v-else>{{ errorMsg }}</p>
        </form>

      </div>
    </div>
</template>
<style scoped>
@import url(@/assets/auth-common.css);

.panel-container {
  flex-direction: column;
  background-color: white;
  width: 25vw;
  height: auto;
  padding: 1em;
}

.panel-container h1 {
  font-size: 1.5em;
}

.panel-container form {
  padding: .8em;
  font-size: .8em;
  width: 100%
}

.change-password-form input {
  font-size: 1em;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.change-password-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: .5em;
}

.close-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-height: 10%;
  width: 100%;
}

.icon-button {
  border-radius: 2em;
  padding: 10px;
}

.icon-button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (min-width: 2000px) {
  .icon-button {
    border-radius: 2em;
    padding: 10px;
    width: 50px;
    height: 50px;
  }
}


@media screen and (max-width: 737px) {

}

@media screen and (max-width: 300px)  {
  .lower-bar,
  .upper-bar{
    min-height: auto;
  }

}
</style>