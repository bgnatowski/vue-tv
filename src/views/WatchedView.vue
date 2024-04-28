<script setup>
import MovieTile from "@/components/MovieTile.vue"
import InfoTile from "@/components/InfoTile.vue";
import {ref} from "vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";

const showDetails = ref(false);
const selectedMovie = ref(null);

function handleShowDetails(movie) {
  selectedMovie.value = movie;
  showDetails.value = true;
}

function handleClose() {
  showDetails.value = false;
}

</script>

<template>
  <section class="feed-container">
    <InfoTile watched/>
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