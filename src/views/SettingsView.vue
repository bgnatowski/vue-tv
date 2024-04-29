<script setup>
import {ref} from 'vue';
import router from "@/router/index.js";
import paths from "@/router/routerPaths.js";
import ChangePasswordPopup from "@/components/ChangePasswordPopup.vue";
import DeleteAccountPopup from "@/components/DeleteAccountPopup.vue";

const showChangePasswordPopup = ref(false);
const showDeleteAccountPopup = ref(false);

const username = 'Użytkownik';

const confirmChangePassword = () => {
  //todo Logika zmiany hasła
  showChangePasswordPopup.value = false;
};

const confirmDeleteAccount = () => {
  //todo Logika usuwania konta
  showDeleteAccountPopup.value = false;
};

</script>

<template>
  <section class="feed-container">
    <div class="post">
      <div class="user-info">
        <img class="user-avatar" src="https://cdn-icons-png.flaticon.com/512/4715/4715330.png" alt="Avatar użytkownika">
        <h2>{{ username }}</h2>
      </div>
      <div class="settings-actions">
        <button @click="showChangePasswordPopup=true">Zmień hasło</button>
        <button @click="showDeleteAccountPopup=true">Usuń konto</button>
        <button>
          <router-link :to="paths.LOGOUT_ROUTE">Wyloguj</router-link>
        </button>
      </div>
      <ChangePasswordPopup v-if="showChangePasswordPopup" @close="showChangePasswordPopup=false"></ChangePasswordPopup>
      <DeleteAccountPopup v-if="showDeleteAccountPopup" @close="showDeleteAccountPopup=false"></DeleteAccountPopup>
    </div>
  </section>
</template>

<style scoped>
@import url(@/assets/auth-common.css);
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup {
  display: flex;
  flex-direction: column;
  position: fixed;
  padding: 2em;
  border-radius: 3em;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  z-index: 999;
}

.user-info {
  display: flex;
  padding: 2rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 200px;
  height: 200px;
  margin: auto;
}

.user-info img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.settings-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: .5rem auto .2rem auto;
  gap: .2em;
}

.settings-actions button {
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

button:hover:enabled {
  background-color: var(--lighter-main);
  border: 2px solid var(--lighter-main);
  -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
}

</style>
