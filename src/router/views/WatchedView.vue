<script setup>
import TitleTile from "@/components/TitleTile.vue";
import {computed, onMounted, ref, watch, watchEffect} from "vue";
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
const isAnyList = ref(null);
const isWatched = ref(true);
const isToWatch = ref(false);

const handleShowDetails = (showDetailsData) => {
  selectedMovie.value = showDetailsData.movie;
  console.log(selectedMovie.value)
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
                       :on-any-list="isAnyList"
                       :on-to-watch="isToWatch"
                       :on-watched="isWatched"
                       @close="handleClose">
    </MovieDetailsPopup>

    <MovieTile
        v-if="moviesWatchedIds.length"
        watched
        v-for="(movieId) in moviesWatchedIds"
        :key="movieId"
        :movie-id="movieId"
        @show-details="handleShowDetails"
        @emit-duration="addToTotalDuration"
    />
    <div v-else class="user-content">
      <h2>--- Brak filmów na liście. Najpierw dodaj "do obejrzenia" lub dodaj wprost na te listę! ---</h2>
    </div>
  </section>
</template>

<style scoped>
.user-content {
  text-align: center;
}
</style>