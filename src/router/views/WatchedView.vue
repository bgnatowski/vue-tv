<script setup>
import TitleTile from "@/components/TitleTile.vue";
import {computed, ref} from "vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import {minutesToText} from "@/js/TimeUtils";
import MovieTile from "@/components/MovieTile.vue";
import {useMovieStore} from "@/stores/MovieStore.js";
import NotePopup from "@/components/NotePopup.vue";

// ----------------------- ZMIENNE -----------//
const isAnyList = ref(null);
const isWatched = ref(true);
const isToWatch = ref(false);

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

    <NotePopup v-if="showNote"
               :movie-data="selectedNote"
               @close="handleClose"
               @edited="handleReload"
    >
    </NotePopup>

    <MovieTile
        v-if="moviesWatchedIds.length"
        watched
        v-for="(movieId) in moviesWatchedIds"
        :key="movieId"
        :movie-id="movieId"
        @show-details="handleShowDetails"
        @show-note="handleShowNote"
        @emit-duration="addToTotalDuration"
    />
    <div v-else class="user-content">
      <h2>--- Brak filmów na liście. Najpierw dodaj "do obejrzenia" lub dodaj wprost na te listę! ---</h2>
    </div>
  </section>
</template>

<style scoped>
</style>