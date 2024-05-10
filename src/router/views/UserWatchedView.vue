<script setup>
import TitleTile from "@/components/TitleTile.vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import {onMounted, ref} from "vue";
import {minutesToText} from "@/js/TimeUtils.js";
import {fetchUserByUid} from "@/services/UserService.js";
import {fetchAllPublicUserMovies} from "@/services/MovieService.js";
import {useRoute, useRouter} from "vue-router";
import UserMovieTile from "@/components/UserMovieTile.vue";

// ----------------- ZMIENNE -----------------//
const route = useRoute();
const router = useRouter()

const userProfile = ref({});
const userMovies = ref([]);

const isLoaded = ref(false);
const watchedMovies = ref([]);

// ------------------- ZALADOWANIE DANYCH ------//
onMounted(async () => {
  const userId = route.params.id;
  userProfile.value = await fetchUserByUid(userId);

  if(userProfile.value == null){
    await router.push({name: 'NotFound'});
    return;
  }

  userMovies.value = await fetchAllPublicUserMovies(userId);
  if(userProfile.value && userMovies.value){
    isLoaded.value = true
  }

  watchedMovies.value = userMovies.value.filter(m => m.isWatched)
});

// --------------------- POPUP -------------- ///
const showDetails = ref(false);
const selectedMovie = ref(null);
const isWatched = ref(false);
const isToWatch = ref(true);
const handleShowDetails = (showDetailsData) => {
  isWatched.value = showDetailsData.onWatched
  isToWatch.value = showDetailsData.onToWatch
  selectedMovie.value = showDetailsData.movie;
  showDetails.value = true;
}

function handleClose() {
  showDetails.value = false;
}

// ------------------- TOTAL DURATION ---------- //
const totalDuration = ref(0);
const addToTotalDuration = (duration) => {
  totalDuration.value += duration;
};

</script>

<template>
  <section class="feed-container" v-if="!isLoaded">
    <div class="loading">
      <p>Ładowanie...</p>
    </div>
  </section>
  <section v-else class="feed-container">
    <TitleTile>
      Filmy do obejrzenia uzytkownika: {{userProfile.username}}
      <template #p>Aby obejrzeć wszystko z tej listy, <strong>{{userProfile.username}}</strong> bedzie potrzebował:</template>
      <template #strong>{{ minutesToText(totalDuration) }}</template>
    </TitleTile>

    <MovieDetailsPopup v-if="showDetails"
                       :movie="selectedMovie"
                       :on-to-watch="isToWatch"
                       :on-watched="isWatched"
                       @close="handleClose">
    </MovieDetailsPopup>

    <UserMovieTile
        v-if="watchedMovies.length"
        v-for="(movie) in watchedMovies"
        :key="movie"
        :movie-id="movie.movieId"
        :user-rating="movie.userRating"
        @show-details="handleShowDetails"
        @emit-duration="addToTotalDuration"
        watched
    />
    <div v-else class="user-content">
      <h2>--- Brak filmów na liście uzytkownika. ---</h2>
    </div>
  </section>
</template>

<style scoped>


</style>