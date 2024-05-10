<script setup>

import {onMounted, ref} from "vue";
import {useMovieStore} from "@/stores/MovieStore.js";
import {fetchMovieDetails} from "@/services/TMDBService.js";

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
  if (props.moviesIds.length) {
    for (const id of props.moviesIds) {
      let details = await fetchMovieDetails(id);
      movies.value.push(details)
    }
    isFetching.value = false;
  }
})

// ---------------------------POKAZANIE POPUPU ----------------//
const showDetails = (m) => {
  if (props.self) {
    emits('show-details', {
      movie: m,
      onWatched: props.listType === 'watched',
      onToWatch: props.listType === 'to-watch'
    });
  } else {
    let isOnToWatch = movieStore.isOnToWatch(m.id)
    let isOnWatched = movieStore.isOnWatched(m.id)
    emits('show-details', {
      movie: m,
      onWatched: isOnToWatch,
      onToWatch: isOnWatched,
    });
  }
}

</script>
<template>
  <div class="post" v-if="props.moviesIds.length">
    <div v-if="isFetching">
      <h1>ŁADOWANIE...</h1>
    </div>
    <div class="movie-scroll-wrapper" v-else>
      <div class="movie-container" v-dragscroll.x>
        <div class="movie-poster" v-for="movie in movies" :key="movie.id">
          <img @click="showDetails(movie)" :src="movie.posterPath" alt="Movie poster"/>
        </div>
      </div>
      <div class="fade-effect"></div>
    </div>
  </div>
  <div class="post" v-else>
    <h1>BRAK FILMÓW NA LIŚCIE</h1>
  </div>
</template>

<style scoped>
.post {
  flex-direction: row;
  width: 100%;
  align-self: center;
}

.movie-scroll-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.movie-container {
  display: flex;
  align-items: flex-end;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  position: relative;
  width: 100%;
}

.fade-effect {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  pointer-events: none;
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
</style>

  