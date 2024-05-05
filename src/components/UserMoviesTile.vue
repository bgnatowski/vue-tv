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

const movies = ref([]);
const isLoaded = ref(false);

async function fetchMovies(userMovieIds) {
  const fetchedMovies = [];
  for (const movieId of userMovieIds) {
    const movieDetails = await fetchMovieDetails(movieId);
    fetchedMovies.push(movieDetails);
  }
  movies.value = fetchedMovies;
}

watchEffect(async () => {
  let userMovieIds = [];
  if (props.listType === 'watched') {
    userMovieIds = movieStore.getCurrentUserWatchedIds;
  } else if (props.listType === 'to-watch') {
    userMovieIds = movieStore.getCurrentUserToWatchIds;
  }

  // Trigger fetching only if there are IDs to work with
  if (userMovieIds.length) {
    await fetchMovies(userMovieIds);
  }
  isLoaded.value = true;
});

onMounted(async () => {
  console.log('movies', movies.value)
})

</script>
<template>
  <div class="post">
    <div class="movies" v-if="isLoaded">
      <div v-if="movies.length" class="movie-poster" v-for="movie in movies" :key="movie">
        <img :src="movie.posterPath"
             alt="Movie poster"/>
      </div>
      <div v-else>
        <p>Brak filmów na liście</p>
      </div>
    </div>
    <div v-else class="loading">
      <p>Ładowanie...</p>
    </div>
  </div>
</template>

<style scoped>
.post {
  overflow-x: hidden;
  width: 100%;
  padding: .5em 1em;
}

.post h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
  font-size: 1.2em;
  font-family: "Bruno Ace SC", sans-serif;
  white-space: nowrap;
  align-self: center;
}

.movies {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  justify-content: center;
}

.movies::-webkit-scrollbar {
  display: none;
}

.movie-poster {
  width: 150px;
  height: auto;
  padding: 0 .2em;
}

.movie-poster img {
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-radius: 1.2em;
}
</style>

  