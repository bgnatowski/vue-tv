<script setup>
import MovieItem from "@/components/page/SearchResultMovieItem.vue";
import UserItem from "@/components/page/SearchResultUserItem.vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import {computed, ref} from "vue";

// ---------------------- PROPS AND EMITS ----------------- //
const props = defineProps({
  results: Object
});
const emits = defineEmits(['hide-results']);

const handleMouseOut = () => {
  emits('hide-results');
};

// --------------------- POPUP -------------- ///
const showDetails = ref(false);
const selectedMovie = ref(null);
const isWatched = ref(null);
const isToWatch = ref(null);

const handleShowDetails = (showDetailsData) => {
  isWatched.value = showDetailsData.onWatched
  isToWatch.value = showDetailsData.onToWatch
  selectedMovie.value = showDetailsData.movie;
  showDetails.value = true;
}

function handleClose() {
  showDetails.value = false;
}

const isResult = computed(() => {
  return props.results.movies.length || props.results.users.length;
})

</script>

<template>
  <ul class="result" :class="isResult ? 'shadow' : ''" @mouseleave="handleMouseOut">
    <!-- Sekcja z filmami -->
    <template v-if="results.movies.length > 0">
      <h4 class="results-title">Filmy</h4>
      <MovieItem
          v-for="movie in results.movies"
          :key="movie.id"
          :movie="movie"
          class="movie-item"
          @show-details="handleShowDetails"
      />
    </template>
    <!-- Sekcja z użytkownikami -->
    <template v-if="results.users.length > 0">
      <h4 class="results-title">Użytkownicy</h4>
      <UserItem
          v-for="user in results.users"
          :key="user.id"
          :user="user"
          class="user-item"
      />
    </template>
  </ul>
  <MovieDetailsPopup v-if="showDetails"
                     :movie="selectedMovie"
                     :on-to-watch="isToWatch"
                     :on-watched="isWatched"
                     @close="handleClose">
  </MovieDetailsPopup>
</template>

<style scoped>
.result {
  background: rgb(255, 255, 255, 1);
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: -1;
  width: 50%;
  overflow-y: auto;
  scrollbar-width: thin;
  max-height: 70vh;
  border-radius: 0 0 1em 1em;
}
.shadow {
  box-shadow: 0 4px 15px 4px rgba(0, 0, 0, 0.25);
}

.results-title{
  margin: 5px;
}

@media screen and (max-width: 600px){
  .result {
    width: 80%;
  }
}

</style>