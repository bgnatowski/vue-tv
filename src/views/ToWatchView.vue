<script setup>
import MovieTile from "@/components/MovieTile.vue"
</script>

<template>
  <div class="watched-container">
    <h1>Filmy do obejrzenia</h1>
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
.watched-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
}
h1{
  margin-left: 1rem;
}

</style>