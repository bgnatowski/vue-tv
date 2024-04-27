<script setup>
import {ref} from 'vue';

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
</script>

<template>
  <section class="feed-container">
    <div class="settings-container">
      <div class="user-info">
        <img class="user-avatar" src="https://cdn-icons-png.flaticon.com/512/4715/4715330.png" alt="Avatar użytkownika">
        <h2>{{ username }}</h2>
      </div>
      <div class="settings-actions">
        <button @click="showChangePasswordPopup">Zmień hasło</button>
        <button @click="showDeleteAccountPopup">Usuń konto</button>
      </div>

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
  </section>
</template>

<style scoped>
.settings-container {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  border-radius: 2em;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  margin: .5em 0;
  padding: .5rem 1rem .5rem 1rem;
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
  display: flex;
  flex-direction: column;
  padding: 2em;
  border-radius: 3em;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  background-color: #fff;
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
