<script setup>
import MovieTile from "@/components/MovieTile.vue"
import TitleTile from "@/components/TitleTile.vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import {ref} from "vue";
import minutesToText from "@/services/timeUtils.js";


const showDetails = ref(false);
const selectedMovie = ref(null);

function handleShowDetails(movie) {
  selectedMovie.value = movie;
  showDetails.value = true;
}

function handleClose() {
  showDetails.value = false;
}

const minutes = ref(123456);

</script>

<template>
  <section class="feed-container">
    <TitleTile>
      Filmy do zobaczenia
      <template v-slot:p>Aby obejrzeć wszystko z tej listy, będziesz potrzebował:
        <strong v-text="minutesToText(minutes)"></strong>
      </template>
    </TitleTile>

    <MovieDetailsPopup v-if="showDetails"
                       :movie="selectedMovie"
                       @close="handleClose">

    </MovieDetailsPopup>

    <MovieTile @show-details="handleShowDetails"/>
    <MovieTile @show-details="handleShowDetails"/>
    <MovieTile @show-details="handleShowDetails"/>
    <MovieTile @show-details="handleShowDetails"/>
    <MovieTile @show-details="handleShowDetails"/>
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