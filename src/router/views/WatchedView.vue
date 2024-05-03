<script setup>
import MovieTile from "@/components/MovieTile.vue"
import TitleTile from "@/components/TitleTile.vue";
import {ref} from "vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import {minutesToText} from "@/js/TimeUtils";

const showDetails = ref(false);
const selectedMovie = ref(null);

function handleShowDetails(movie) {
  selectedMovie.value = movie;
  showDetails.value = true;
}

function handleClose() {
  showDetails.value = false;
}
const minutes = ref(1234);

</script>

<template>
  <section class="feed-container">
    <TitleTile>
      Filmy obejrzane
      <template v-slot:p>Do tej pory na obejrzenie wszystkich filów spedziłeś:
      </template>
      <template #strong>{{minutesToText(minutes)}}</template>
    </TitleTile>

    <MovieDetailsPopup v-if="showDetails"
                       :movie="selectedMovie"
                       @close="handleClose">

    </MovieDetailsPopup>

    <MovieTile watched @show-details="handleShowDetails"/>
    <MovieTile watched @show-details="handleShowDetails"/>
    <MovieTile watched @show-details="handleShowDetails"/>
    <MovieTile watched @show-details="handleShowDetails"/>
    <MovieTile watched @show-details="handleShowDetails"/>
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