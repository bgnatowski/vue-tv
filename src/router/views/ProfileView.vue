<script setup>
import UserMovesTile from "@/components/UserMoviesTile.vue"
import PostTile from "@/components/PostTile.vue";
import {computed, reactive, ref} from "vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import TitleTile from "@/components/TitleTile.vue";
import {useUserStore} from "@/stores/UserStore.js";
import paths from "@/router/routerPaths.js";
import {useRouter} from "vue-router";

// ----------------- STORES -------------------//
const userStore = useUserStore();
const router = useRouter()
// ------------------  COMPUTED --------------//
const user = reactive({
  username: computed(() => userStore.getUsername),
  photoUrl: computed(() => userStore.getPhotoUrl),
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
  <section class="feed-container">
    <MovieDetailsPopup v-if="showDetails"
                       :movie="selectedMovie"
                       @close="handleClose">
    </MovieDetailsPopup>
    <section class="movies-column">
      <div class="profile-picture">
        <img :src="userStore.photoUrl" alt="profile avatar">
      </div>
      <p class="user-name">{{ userStore.username }}</p>
      <TitleTile class="list"
                 @click="router.push(paths.WATCHED_ROUTE)"
      >
        Filmy obejrzane
      </TitleTile>
      <UserMovesTile list-type="watched"/>
      <TitleTile class="list"
                 @click="router.push(paths.TO_WATCH_ROUTE)"
      >
        Filmy do obejrzenia
      </TitleTile>
      <UserMovesTile list-type="to-watch"/>
    </section>
    <section class="posts-column">
      <!--      todo: if-user self -> twoje recenzje else -> recenzje znajomego -->
      <TitleTile>Twoje recenzje</TitleTile>
      <div class="posts" v-dragscroll>
        <PostTile profile @show-details="handleShowDetails"></PostTile>
        <PostTile @show-details="handleShowDetails"></PostTile>
      </div>
    </section>
  </section>
</template>

<style scoped>
.list:hover {
  cursor: pointer;
}

.list:hover {
  transition: .5s ease all;
  background-color: var(--lighter-main-transparent)
}

.feed-container {
  flex-direction: row;
}

.movies-column {
  display: flex;
  flex-direction: column;
  width: 40%;
}

.posts-column {
  display: flex;
  flex-direction: column;
  width: 60%;
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
  flex-direction: column;
  width: 200px;
  height: 200px;
  align-self: center;
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
  text-align: center;
  justify-self: center;
}

@media (max-width: 800px) {
  .feed-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .posts-column,
  .movies-column {
    align-self: center;
    width: 100%
  }
}



</style>
