<script setup>
import {onBeforeMount, onMounted, ref, computed, watch} from "vue";
import {fetchAllMovieDetails, fetchMovieDetails} from "@/services/TMDBService.js";
import RatingStars from "@/components/RatingStars.vue";
import {useMovieStore} from "@/stores/MovieStore.js";
import {useUserStore} from "@/stores/UserStore.js";
import {useRoute, useRouter} from "vue-router";
import MovieDetailsTile from "@/components/MovieDetailsTile.vue";

// ----------------- ZMIENNE -----------------//
const route = useRoute();
const router = useRouter()

const isLoaded = ref(false);
const movieDetails = ref({});
// ------------------LADOWANIE DANYCH --------//
onMounted(async () => {
  await loadMovieData(route.params.id);
});

// ---------------------- REAGUJ NA ZMIANE ADRESU -------------- //
watch(() => route.params.id, async (newMovieId) => {
  await loadMovieData(newMovieId);
});

async function loadMovieData(movieId) {
  movieDetails.value = await fetchAllMovieDetails(movieId);
  if(movieDetails.value == null){
    await router.push({name: 'NotFound'});
    return;
  }else if(movieDetails.value){
    isLoaded.value = true;
  }
}
</script>

<template>
  <section class="feed-container" v-if="!isLoaded">
    <div class="loading">
      <p>Ładowanie...</p>
    </div>
  </section>
  <section v-else class="feed-container">
    <MovieDetailsTile
        :movie="movieDetails"
        noInfoButton
    ></MovieDetailsTile>
  </section>
</template>

<style scoped>
</style>

