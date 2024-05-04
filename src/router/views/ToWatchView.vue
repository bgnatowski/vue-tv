<script setup>
import MovieTile from "@/components/MovieTile.vue"
import TitleTile from "@/components/TitleTile.vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import {ref} from "vue";
import {minutesToText} from "@/js/TimeUtils.js";

const showDetails = ref(false);
const selectedMovieId = ref(null);

const handleShowDetails = (id) => {
  console.log("handleShowDetails for movie id: ", id);
  selectedMovieId.value = id;
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
      <template #p>Aby obejrzeć wszystko z tej listy, będziesz potrzebował:</template>
      <template #strong>{{minutesToText(minutes)}}</template>
    </TitleTile>

    <MovieDetailsPopup v-if="showDetails"
                       :movie-id="selectedMovieId"
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