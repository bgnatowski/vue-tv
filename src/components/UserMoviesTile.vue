<script setup>

import {computed, onMounted, ref, watchEffect} from "vue";
import {useMovieStore} from "@/stores/MovieStore.js";
import {fetchMovieDetails} from "@/services/TVDBService.js";

// ---------------- STORES ---------------------//
const movieStore = useMovieStore()

// ---------------- PROPS AND EMITS ------------//

const props = defineProps({
  listType: String,
})

const emits = defineEmits(['is-loaded'])

// ---------------------------------------------//

const movies = ref([]);
const isLoaded = ref(false);
const fetchingMovies = ref(false);

const fetchMovies = async (userMovieIds) =>{
  fetchingMovies.value = true;
  const fetchedMovies = [];
  for (const movieId of userMovieIds) {
    const movieDetails = await fetchMovieDetails(movieId);
    fetchedMovies.push(movieDetails);
  }
  movies.value = fetchedMovies;
  fetchingMovies.value = false;
  return true;
}

watchEffect(async () => {
  let userMovieIds = [];
  if (props.listType === 'watched') {
    userMovieIds = movieStore.getCurrentUserWatchedIds;
  } else if (props.listType === 'to-watch') {
    userMovieIds = movieStore.getCurrentUserToWatchIds;
  }
  isLoaded.value = await fetchMovies(userMovieIds);
});


onMounted(async () => {
  console.log('movies', movies.value)
})

</script>
<template>
  <div class="post">
    <div class="movies" v-dragscroll.x>
      <div v-if="!fetchingMovies" class="movie-poster" v-for="movie in movies" :key="movie">
        <img :src="movie.posterPath" alt="Movie poster"/>
      </div>
      <div v-else class="loading">
        <p>Ładowanie...</p>
      </div>
    </div>
    <div v-if="!movies.length && !fetchingMovies && isLoaded">
      <p style="text-align: center;">Brak filmów na liście</p>
    </div>
  </div>
</template>

<style scoped>
.post {
  overflow-x: hidden;
  width: 100%;
  padding: .5em 1em;
}

.movies {
  width: inherit;
  display: flex;
  margin: auto;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  scrollbar-width: thin;
  border-radius: 1.5em;
  max-width: 460px;
}

.movies::-webkit-scrollbar {
  height: 8px;
}

.movies::-webkit-scrollbar-thumb {
  background-color: darkgray;
  border-radius: 4px;
}

.movie-poster {
  width: 150px;
  height: 230px;
  flex-shrink: 0;
  padding: 0.2em;
  cursor: pointer;
}

.movie-poster img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 1.5em;
}
</style>

  