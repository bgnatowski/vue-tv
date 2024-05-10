<script setup>
import {onBeforeMount, ref} from "vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import TitleTile from "@/components/TitleTile.vue";
import {useUserStore} from "@/stores/UserStore.js";
import {usePostStore} from "@/stores/PostStore.js";
import {fetchFriendsPostsByAFriend} from "@/services/PostService.js";
import PostTile from "@/components/PostTile.vue";

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
const isLoaded = ref(false);
const userStore = useUserStore();
const postStore = usePostStore();
const friendsPosts = ref([]);

onBeforeMount(async () => {
  await userStore.fetchCurrentUser()
  let friendsIds = userStore.friendsIds
  console.log('znajomi:', friendsIds)
  friendsPosts.value = await fetchFriendsPostsByAFriend(friendsIds)
  isLoaded.value=true
  console.log('znalezione posty znajomych:',friendsPosts.value)
})


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


    <div class="posts-container" v-dragscroll>
      <PostTile
          v-if="friendsPosts.length"
          v-for="post in friendsPosts"
          :key="post"
          :post="post"
          @show-details="handleShowDetails"
      ></PostTile>
      <div v-else class="user-content">
        <h2>---BRAK RECENZJI---</h2>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>
