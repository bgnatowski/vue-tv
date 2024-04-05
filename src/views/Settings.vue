<template>
  <div class="settings-container">
    <header class="settings-header">
      <h1>Ustawienia</h1>
      <button class="logout-btn" @click="handleSingOut">Wyloguj się</button>
    </header>
    <div class="user-info">
      <img class="user-avatar" src="https://randomuser.me/api/portraits/women/90.jpg" alt="Avatar użytkownika">
      <h2>{{ username }}</h2>
    </div>
    <div class="settings-actions">
      <button @click="showChangePasswordPopup = true">Zmień hasło</button>
      <button @click="showDeleteAccountPopup = true">Usuń konto</button>
    </div>
    <footer>
      <button><router-link to="/feed">Wróć</router-link></button>
    </footer>

    <!-- Popup Zmiany Hasła -->
    <div v-if="showChangePasswordPopup" class="popup-overlay" @click.self="closeChangePasswordPopup">
      <div class="popup">
        <button class="close-btn" @click="closeChangePasswordPopup">X</button>
        <h3>Zmień hasło</h3>
        <input type="password" placeholder="Obecne hasło">
        <input type="password" placeholder="Nowe hasło">
        <input type="password" placeholder="Wpisz ponownie nowe hasło">
        <button @click="confirmChangePassword">Potwierdź</button>
      </div>
    </div>

    <!-- Popup Usunięcia Konta -->
    <div v-if="showDeleteAccountPopup" class="popup-overlay" @click.self="closeDeleteAccountPopup">
      <div class="popup">
        <button class="close-btn" @click="closeDeleteAccountPopup">X</button>
        <h3>Usuń konto</h3>
        <input type="password" placeholder="Wpisz swoje obecne hasło">
        <button @click="confirmDeleteAccount">Potwierdź</button>
        <p>Będziemy tęsknić :(</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {signOutUser} from "@/services/AuthenticationService.js";

const router = useRouter();

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

const closeChangePasswordPopup = () => {
  showChangePasswordPopup.value = false;
};

const closeDeleteAccountPopup = () => {
  showDeleteAccountPopup.value = false;
};

const handleSingOut = () => {
  signOutUser(router);
};
</script>

<style scoped>
.settings-container {
}
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
}
.popup {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
