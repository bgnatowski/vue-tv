<script setup>
import TitleTile from "@/components/TitleTile.vue";
import {computed, ref} from "vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import {minutesToText} from "@/js/TimeUtils";
import MovieTile from "@/components/MovieTile.vue";
import {useMovieStore} from "@/stores/MovieStore.js";
import NotePopup from "@/components/NotePopup.vue";
import PostPopup from "@/components/PostPopup.vue";
import {usePostStore} from "@/stores/PostStore.js";

// ----------------------- ZMIENNE -----------//
const isWatched = ref(true);
const isToWatch = ref(false);

// --------------- STORES ------------------- //
const movieStore = useMovieStore();
const postStore = usePostStore();

// --------------------- POPUP -------------- ///
const showDetails = ref(false);
const showNote = ref(false);
const showPost = ref(false);
const selectedMovie = ref(null);
const selectedNote = ref(null);
const selectedPost = ref(null);

const handleShowDetails = (showDetailsData) => {
  selectedMovie.value = showDetailsData.movie;
  showDetails.value = true;
}

const handleShowNote = async (showNoteData) => {
  selectedNote.value = showNoteData;
  showNote.value = true;
}

const handleShowPost = (showPostData) => {
  selectedPost.value = showPostData.postData;
  showPost.value = true;
}

function handleClose() {
  showDetails.value = false;
  showNote.value = false;
  showPost.value = false;
}

async function handleReload() {
  await movieStore.fetchCurrentUserMovies();
  await postStore.fetchCurrentUserPosts();
}

// --------------------- MOVIE TILE LADOWANIE DANYCH -------------- ///
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

    <PostPopup v-if="showPost"
               :post-data="selectedPost"
               @close="handleClose"
               @edited="handleReload"
    >
    </PostPopup>

    <MovieTile
        v-if="moviesWatchedIds.length"
        watched
        v-for="(movieId) in moviesWatchedIds"
        :key="movieId"
        :movie-id="movieId"
        @show-details="handleShowDetails"
        @show-note="handleShowNote"
        @show-post="handleShowPost"
        @emit-duration="addToTotalDuration"
    />
    <div v-else class="user-content">
      <h2>--- Brak filmów na liście. Najpierw dodaj "do obejrzenia" lub dodaj wprost na te listę! ---</h2>
    </div>
  </section>
</template>

<style scoped>
</style>