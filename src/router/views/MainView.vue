<script setup>
import PostTile from "@/components/PostTile.vue";
import {onMounted, ref} from "vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import TitleTile from "@/components/TitleTile.vue";

const hasScrollbar = ref(false);

onMounted(() => {
  const postsColumn = document.querySelector('.posts-column');
  if (postsColumn.scrollHeight > postsColumn.clientHeight) {
    hasScrollbar.value = true;
  }
});

// --------------------- POPUP -------------- ///
const showDetails = ref(false);
const selectedMovie = ref(null);
const handleShowDetails = (movie) => {
  console.log("handleShowDetails for movie: ", movie);
  selectedMovie.value = movie;
  showDetails.value = true;
}
function handleClose() {
  showDetails.value = false;
}

</script>

<template>
  <section class="feed-container" :style="hasScrollbar ? 'margin: 0' : ''">
    <MovieDetailsPopup v-if="showDetails"
                       :movie="selectedMovie"
                       @close="handleClose">
    </MovieDetailsPopup>
    <div class="posts-column">
      <TitleTile>Recenzje znajomych</TitleTile>
      <PostTile @show-details="handleShowDetails"/>
      <PostTile @show-details="handleShowDetails"/>
      <PostTile @show-details="handleShowDetails"/>
      <PostTile @show-details="handleShowDetails"/>
      <main class="user-content">
        <h2>---Koniec---</h2>
      </main>
    </div>
  </section>
</template>

<style scoped>
.feed-container {
  flex-direction: row;
  gap: 1em;
}

.user-content {
  text-align: center;
}

</style>
