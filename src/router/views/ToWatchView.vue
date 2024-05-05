<script setup>
import TitleTile from "@/components/TitleTile.vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import {computed, ref} from "vue";
import {minutesToText} from "@/js/TimeUtils.js";
import {useUserStore} from "@/stores/UserStore.js";
import {useMovieStore} from "@/stores/MovieStore.js";
import MovieTile from "@/components/MovieTile.vue";

// --------------- STORES ------------------- //
const userStore = useUserStore();
const movieStore = useMovieStore();

// --------------------- POPUP -------------- ///
const showDetails = ref(false);
const selectedMovie = ref(null);
const handleShowDetails = (movie) => {
  selectedMovie.value = movie;
  showDetails.value = true;
}

function handleClose() {
  showDetails.value = false;
}

// --------------------- MOVIE TILE -------------- ///
const moviesToWatchIds = computed(() => {
  return movieStore.getCurrentUserToWatchIds;
});

// ------------------- TOTAL DURATION ---------- //
const totalDuration = ref(0);
const addToTotalDuration = (duration) => {
  totalDuration.value += duration;
};

</script>

<template>
  <section class="feed-container">
    <TitleTile>
      Filmy do obejrzenia
      <template #p>Aby obejrzeć wszystko z tej listy, będziesz potrzebował:</template>
      <template #strong>{{ minutesToText(totalDuration) }}</template>
    </TitleTile>

    <MovieDetailsPopup v-if="showDetails"
                       :movie="selectedMovie"
                       @close="handleClose">
    </MovieDetailsPopup>

    <MovieTile
        v-for="(movieId) in moviesToWatchIds"
        :key="movieId"
        :movie-id="movieId"
        @show-details="handleShowDetails"
        @emit-duration="addToTotalDuration"
    />
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