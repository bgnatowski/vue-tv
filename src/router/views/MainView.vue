<script setup>
import {ref} from "vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import TitleTile from "@/components/TitleTile.vue";

// --------------------- POPUP -------------- ///
const showDetails = ref(false);
const selectedMovie = ref(null);
const isWatched = ref(null);
const isToWatch = ref(null);
const handleShowDetails = (showDetailsData) => {
  isWatched.value = showDetailsData.onWatched
  isToWatch.value = showDetailsData.onToWatch
  selectedMovie.value = showDetailsData.movie;
  showDetails.value = true;
}
function handleClose() {
  showDetails.value = false;
}

// ------------------ LADOWANIE DANYCH ------------- //
const isLoaded = ref(true);
const postsIds = ref([]);

</script>

<template>
  <section class="feed-container" v-if="!isLoaded">
    <div class="loading">
      <p>Ładowanie...</p>
    </div>
  </section>
  <section v-else class="feed-container">
    <TitleTile>Recenzje znajomych</TitleTile>
    <MovieDetailsPopup v-if="showDetails"
                       :movie="selectedMovie"
                       :on-to-watch="isToWatch"
                       :on-watched="isWatched"
                       @close="handleClose">
    </MovieDetailsPopup>


    <div class="post-container" v-if="postsIds.length">
<!--      <PostTile v-for="postId in postsIds" :key="postId"-->
<!--                :post-id="postId"-->
<!--                @show-details="handleShowDetails"-->
<!--      ></PostTile>-->
    </div>
    <div class="user-content" v-else>
      <h2>---BRAK---</h2>
    </div>
  </section>

</template>

<style scoped>
.user-content {
  text-align: center;
}

</style>
