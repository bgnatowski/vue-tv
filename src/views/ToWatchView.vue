<script setup>
import MovieTile from "@/components/MovieTile.vue"

</script>

<template>
  <section class="feed-container">
    <h1>Filmy do zobaczenia</h1>
    <MovieTile/>
    <MovieTile/>
    <MovieTile/>
    <MovieTile/>
    <main class="user-content">
      <h2>---Koniec---</h2>
    </main>
  </section>
</template>

<style scoped>

.user-content {
  text-align: center;
}

</style>