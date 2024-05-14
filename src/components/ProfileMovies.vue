<script setup>

import {onMounted, onUnmounted, ref, watch} from "vue";
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
const maxWidth = ref("");


const calculateMaxWidth = () => {
  const postElement = document.querySelector(".post");
  if (postElement) {
    const postWidth = postElement.clientWidth;
    const calculatedWidth = postWidth - (120);
    maxWidth.value = `${calculatedWidth}px`;
  }
  console.log(maxWidth.value)
};

onMounted(async () => {
  if (props.moviesIds.length) {
    for (const id of props.moviesIds) {
      let details = await fetchMovieDetails(id);
      movies.value.push(details)
    }
    isFetching.value = false;
  }
  calculateMaxWidth();
  window.addEventListener("resize", calculateMaxWidth);
})

onUnmounted(() => {
  window.removeEventListener("resize", calculateMaxWidth);
});

watch(() => props.moviesIds, calculateMaxWidth);

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
    <div class="movie-scroll-wrapper" :style="{ maxWidth: maxWidth }" v-else>
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
  width: 90%;
  align-self: center;
  text-align: center;
}

.movie-scroll-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.movie-container {
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  position: relative;
  width: 100%;
  justify-content: flex-start;
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
</style>