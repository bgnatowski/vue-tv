<script setup>
import TitleTile from "@/components/TitleTile.vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import {onMounted, ref} from "vue";
import {minutesToText} from "@/js/TimeUtils.js";
import {useUserStore} from "@/stores/UserStore.js";
import MovieTile from "@/components/MovieTile.vue";
import {useMovieStore} from "@/stores/MovieStore.js";

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
const userStore = useUserStore();
const moviesToWatchIds = ref([]);
onMounted( () => {
  moviesToWatchIds.value = userStore.moviesToWatchIds;
})

// ------------------- TOTAL DURATION ---------- //
const totalDuration = ref(0);
const addToTotalDuration = (duration) => {
  totalDuration.value += duration;
};

// ------------------- CHANGE VISIBLE -----------//
const movieStore = useMovieStore()
const handleChangeVisible = ({ movieId, value }) => {
  console.log('change visible movie ', movieId, value)
  movieStore.modifyUserMovie(userStore.uuid, movieId, { isPrivate: value })
}

</script>

<template>
  <section class="feed-container">
    <TitleTile>
      Filmy do zobaczenia
      <template #p>Aby obejrzeć wszystko z tej listy, będziesz potrzebował:</template>
      <template #strong>{{minutesToText(totalDuration)}}</template>
    </TitleTile>

    <MovieDetailsPopup v-if="showDetails"
                       :movie="selectedMovie"
                       @close="handleClose">
    </MovieDetailsPopup>

    <MovieTile
        v-for="(movieId, index) in moviesToWatchIds"
        :key="index"
        :movie-id="movieId"
        @show-details="handleShowDetails"
        @emit-duration="addToTotalDuration"
        @change-visible="handleChangeVisible"
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