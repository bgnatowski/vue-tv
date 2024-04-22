<script setup>
import {useRouter} from "vue-router";
import {signOutUser} from "@/services/AuthenticationService.js";
const router = useRouter()
import Header from "@/components/Header.vue";

const handleSingOut = () => {
  signOutUser(router);
};
</script>

<template>
  <div class="feed-container">
    <!-- <header class="user-header">
      <h1>Strona użytkownika</h1>
      <div class="user-actions">
        <button class="settings-btn" @click="router.push('/settings')">Ustawienia</button>
        <button class="logout-btn" @click="handleSingOut">Wyloguj się</button>
      </div>
    </header> -->
    <Header></Header>
    <main class="user-content">
      <h2>Witaj użytkowniku!</h2>
      <div class="cards-container">
        <div class="card watched-movies">
          <h3>Twoja lista obejrzanych filmów</h3>
          <p>Obejrzano: 2</p>
        </div>
        <div class="card to-watch-movies">
          <h3>Twoja lista filmów do obejrzenia</h3>
          <p>Do obejrzenia: 2</p>
        </div>
      </div>
      <div class="watched-stats">
        <p>Do tej pory obejrzałeś:</p>
        <p>8 dni 12 godzin i 15 minut filmów!</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.feed-container {
  text-align: center;
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-actions button {
  margin: 0 10px;
}

.cards-container {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.card {
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 200px;
  height: 150px;
}

.watched-movies {
  background-color: #17a2b8;
}

.to-watch-movies {
  background-color: #28a745;
}

.watched-stats {
  margin-top: 20px;
}
</style>
