<script setup>
import TitleTile from "@/components/TitleTile.vue";
import {computed, ref} from "vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import {minutesToText} from "@/js/TimeUtils";
import {useUserStore} from "@/stores/UserStore.js";
import MovieTile from "@/components/MovieTile.vue";
import {useMovieStore} from "@/stores/MovieStore.js";

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
const moviesWatchedIds = computed(() => {
  return movieStore.getCurrentUserWatchedIds;
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
      Filmy obejrzane
      <template v-slot:p>Do tej pory na obejrzenie wszystkich filów spedziłeś:
      </template>
      <template #strong>{{ minutesToText(totalDuration) }}</template>
    </TitleTile>

    <MovieDetailsPopup v-if="showDetails"
                       :movie="selectedMovie"
                       @close="handleClose">
    </MovieDetailsPopup>

    <MovieTile
        watched
        v-for="(movieId, index) in moviesWatchedIds"
        :key="index"
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