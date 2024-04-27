<script setup>
import MovieTile from "@/components/MovieTile.vue"
import InfoTile from "@/components/InfoTile.vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";

</script>

<template>
  <section class="feed-container">
    <InfoTile></InfoTile>
    <MovieDetailsPopup></MovieDetailsPopup>
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