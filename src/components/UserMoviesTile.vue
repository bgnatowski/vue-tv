<script setup>

import {computed, onMounted, ref} from "vue";
import {useMovieStore} from "@/stores/MovieStore.js";
import {fetchMovieDetails} from "@/services/TVDBService.js";

// ---------------- STORES ---------------------//
const movieStore = useMovieStore()

// ---------------- PROPS AND EMITS ------------//
const props = defineProps({
  listType: String,
  moviesIds: Array,
})

const emits = defineEmits(['show-details'])

// -------------------LADOWANIE DANYCH----------------------//
const isFetching = ref(true);
const movies = ref([])

onMounted(async () => {
  console.log("moviesIds?: ", props.moviesIds)
  if(props.moviesIds.length){
    for (const id of props.moviesIds) {
      let details = await fetchMovieDetails(id);
      movies.value.push(details)
    }
    isFetching.value=false;
  }
})

// ---------------------------POKAZANIE POPUPU ----------------//
const showDetails = (m) => {
  emits('show-details', {
    movie: m,
    onWatched: props.listType === 'watched',
    onToWatch: props.listType === 'to-watch'
  });
}

</script>
<template>
  <div class="post" v-dragscroll.x v-if="props.moviesIds.length">
    <div v-if="isFetching">
      <h1> ŁADOWANIE ...</h1>
    </div>
    <div
        class="movie-poster"
        v-for="movie in movies"
        :key="movie"
        v-else
    >
      <img @click="showDetails(movie)" :src="movie.posterPath" alt="Movie poster"/>
    </div>

  </div>
  <div class="post" v-else>
    <h1>BRAK FILMOW NA LIŚCIE</h1>
  </div>
</template>

<style scoped>
.post {
  flex-direction: row;
  overflow-y: clip;
  overflow-x: hidden;
  scrollbar-width: thin;
  width: 100%;
  max-width: 400px;
  align-self: center;
}

@media screen and (max-width: 1000px) {
  .post {
    max-width: 300px;
  }
}

@media screen and (max-width: 850px) {
  .post {
    max-width: 250px;
  }
}

@media screen and (max-width: 800px) {
  .post {
    max-width: 400px;
  }
}

@media screen and (max-width: 600px) {
  .post {
    max-width: inherit;
  }
}

.post::-webkit-scrollbar {
  height: 8px;
}

.post::-webkit-scrollbar-thumb {
  background-color: darkgray;
  border-radius: 4px;
}

.movie-poster {
  width: 130px;
  height: 200px;
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

  