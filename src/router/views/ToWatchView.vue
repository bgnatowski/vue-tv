<script setup>
import TitleTile from "@/components/TitleTile.vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import {computed, onBeforeMount, ref} from "vue";
import {minutesToText} from "@/js/TimeUtils.js";
import {useMovieStore} from "@/stores/MovieStore.js";
import MovieTile from "@/components/MovieTile.vue";
import NotePopup from "@/components/NotePopup.vue";

// ------------------ ZMIENNE ----------------//
const isWatched = ref(false);
const isToWatch = ref(true);

// --------------- STORES ------------------- //
const movieStore = useMovieStore();

// --------------------- POPUP -------------- ///
const showDetails = ref(false);
const showNote = ref(false);
const selectedMovie = ref(null);
const selectedNote = ref(null);

const handleShowDetails = (showDetailsData) => {
  selectedMovie.value = showDetailsData.movie;
  showDetails.value = true;
}

const handleShowNote = (showNoteData) => {
  selectedNote.value = showNoteData;
  showNote.value = true;
}

function handleClose() {
  showDetails.value = false;
  showNote.value = false;
}

async function handleReload() {
  await movieStore.fetchCurrentUserMovies();
}
// --------------------- MOVIE TILE LADOWANIE DANYCH -------------- ///
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
                       :on-to-watch="isToWatch"
                       :on-watched="isWatched"
                       @close="handleClose">
    </MovieDetailsPopup>

    <NotePopup v-if="showNote"
               :movie-data="selectedNote"
               @close="handleClose"
               @edited="handleReload"
    >
    </NotePopup>

    <MovieTile
        v-if="moviesToWatchIds.length"
        v-for="(movieId) in moviesToWatchIds"
        :key="movieId"
        :movie-id="movieId"
        @show-details="handleShowDetails"
        @emit-duration="addToTotalDuration"
        @show-note="handleShowNote"
    />
    <div v-else class="user-content">
      <h2>--- Brak filmów na liście. Wyszukaj i dodaj! ---</h2>
    </div>
  </section>
</template>

<style scoped>


</style>