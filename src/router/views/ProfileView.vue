<script setup>
import UserMovesTile from "@/components/UserMoviesTile.vue"
import PostTile from "@/components/PostTile.vue";
import {onBeforeMount, ref} from "vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import TitleTile from "@/components/TitleTile.vue";
import {useAuthStore} from "@/stores/AuthStore.js";

const authStore = useAuthStore();
let user = {};
onBeforeMount(() => {
  user = authStore.user
})

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
    <MovieDetailsPopup v-if="showDetails"
                       :movie="selectedMovie"
                       @close="handleClose">
    </MovieDetailsPopup>
    <section class="movies-column">
      <div class="profile-picture">
        <img :src="user.photoUrl" alt="profile avatar">
      </div>
      <p class="user-name">{{ user.username }}</p>
      <TitleTile>Filmy obejrzane</TitleTile>
      <UserMovesTile tileType="Filmy do obejrzenia"/>
      <TitleTile>Filmy obejrzane</TitleTile>
      <UserMovesTile tileType="Filmy do obejrzenia"/>
    </section>
    <section class="posts-column">
<!--      todo: if-user self -> twoje recenzje else -> recenzje znajomego -->
      <TitleTile>Twoje recenzje</TitleTile>
      <div class="posts" v-dragscroll>
        <PostTile profile @show-details="handleShowDetails"></PostTile>
        <PostTile profile @show-details="handleShowDetails"></PostTile>
        <PostTile profile @show-details="handleShowDetails"></PostTile>
      </div>
    </section>
  </section>
</template>

<style scoped>
.feed-container {
  flex-direction: row;
  margin: 0;
}

.movies-column {
  display: flex;
  flex-direction: column;
  width: 40%;
  padding: 1em;
}
.posts-column{
  padding: 1em 1em 0 1em;
}

.posts {
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 4000px;
  overflow-y: auto;
  scrollbar-width: thin;
  padding: 1em;
}

.profile-picture {
  display: flex;
  position: relative;
  overflow: hidden;
  padding: 1em;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 200px;
  height: 200px;
  margin: .5em auto 0 auto;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
  border: 2px solid var(--lighter-main);
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

.user-name {
  font-size: 1.5rem;
  margin: .5rem;
  text-align: center;
  justify-self: center;
}

@media (max-width: 1400px) {
  .feed-container {
    flex-direction: column;
  }

  .movies-column {
    align-self: center;
    width: 100%
  }
}


@media (max-width: 600px) {
  .feed-container {
    margin: 0;
    padding: 0;
  }
}


</style>
