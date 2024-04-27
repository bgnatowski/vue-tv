<script setup>
import MovieTile from "@/components/MovieTile.vue"
</script>

<template>
  <h1>To Watch</h1>
  <div class="watched-container">
    <!-- <header class="user-header">
      <h1>Strona użytkownika</h1>
      <div class="user-actions">
        <button class="settings-btn" @click="router.push('/settings')">Ustawienia</button>
        <button class="logout-btn" @click="handleSingOut">Wyloguj się</button>
      </div>
    </header> -->
    <!-- <Popup/> -->
    <MovieTile/>
    <MovieTile/>
    <MovieTile/>
    <MovieTile/>
    <main class="user-content">
      <h2>---Koniec---</h2>
    </main>
  </div>
</template>

<style scoped>
h1{
  margin-left: 1rem;
}
h2{
  text-align: center;
  color: grey;
}
</style>
