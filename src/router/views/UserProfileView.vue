<script setup>
import ProfileMovies from "@/components/ProfileMovies.vue"
import PostTile from "@/components/PostTile.vue";
import {onMounted, ref, watch} from "vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import TitleTile from "@/components/TitleTile.vue";
import {useRoute, useRouter} from "vue-router";
import {fetchUserByUid} from "@/services/UserService.js";
import {fetchAllPublicUserMovies} from "@/services/MovieService.js";
import {useUserStore} from "@/stores/UserStore.js";
import {fetchPosts} from "@/services/PostService.js";

// ----------------- ZMIENNE -----------------//
const userStore = useUserStore();

const route = useRoute();
const router = useRouter()

const userProfile = ref({});
const userMovies = ref([]);
const userPosts = ref([]);

const isLoaded = ref(false);
const isFriend = ref(false);
const toWatchMoviesIds = ref([]);
const watchedMoviesIds = ref([]);

// ------------------LADOWANIE DANYCH --------//
onMounted(async () => {
  await loadUserData(route.params.id);
});

// ---------------------- REAGUJ NA ZMIANE ADRESU -------------- //
watch(() => route.params.id, async (newUserId) => {
  await loadUserData(newUserId);
});

async function loadUserData(userId) {
  // Reset danych przed nowym zaladowaniem
  userProfile.value = {};
  userMovies.value = [];
  userPosts.value = [];
  isLoaded.value = false;

  // Pobierz dane nowego użytkownika
  userProfile.value = await fetchUserByUid(userId);
  userMovies.value = await fetchAllPublicUserMovies(userId);

  // Jesli uzytkownik nie istenieje
  if(userProfile.value == null){
    await router.push({name: 'NotFound'});
    return;
  }

  // Jesli uzytkownik jest friendem zaladuj recenzje
  // await userStore.fetchCurrentUser();
  if(userStore.hasFriend(userProfile.value.uid)){
    userPosts.value = await fetchPosts([userProfile.value.uid])
    isFriend.value = true;
  }

  if (userProfile.value && userMovies.value) {
    isLoaded.value = true;
    toWatchMoviesIds.value = userMovies.value.filter(m => !m.isWatched).map(m => m.movieId);
    watchedMoviesIds.value = userMovies.value.filter(m => m.isWatched).map(m => m.movieId);
  }
}

// --------------------- POPUP -------------- //
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

const pushToUserWatched = () => {
  router.push({name: 'UserWatched', params: {id: userProfile.value.uid}});
};

const pushToUserToWatch = () => {
  router.push({name: 'UserToWatch', params: {id: userProfile.value.uid}});
};

</script>

<template>
  <section class="feed-container" v-if="!isLoaded">
    <div class="loading">
      <p>Ładowanie...</p>
    </div>
  </section>
  <section v-else class="feed-container">
    <MovieDetailsPopup v-if="showDetails"
                       :movie="selectedMovie"
                       :on-to-watch="isToWatch"
                       :on-watched="isWatched"
                       @close="handleClose">
    </MovieDetailsPopup>
    <section class="movies-column">
      <div class="profile-picture">
        <img :src="userProfile.photoUrl" alt="profile avatar">
      </div>
      <p class="user-name">{{ userProfile.username }}</p>

      <TitleTile class="list"
                 @click="pushToUserToWatch">Filmy do obejrzenia</TitleTile>
      <ProfileMovies
          list-type="to-watch"
          movies-list="movies"
          :movies-ids="toWatchMoviesIds"
          @show-details="handleShowDetails"
      />

      <TitleTile class="list" @click="pushToUserWatched">Filmy obejrzane</TitleTile>
      <ProfileMovies
          list-type="watched"
          movies-list="movies"
          :movies-ids="watchedMoviesIds"
          @show-details="handleShowDetails"
      />


    </section>
    <section class="posts-column">
      <TitleTile>Recenzje {{userProfile.username}}:</TitleTile>
      <div class="posts" v-dragscroll>
        <PostTile
            v-if="userPosts.length"
            v-for="post in userPosts"
            :key="post"
            :post="post"
            :user="userProfile"
            @show-details="handleShowDetails"
        >
        </PostTile>
        <div v-else-if="!userPosts.length" class="user-content">
          <h2>---BRAK RECENZJI---</h2>
        </div>
        <div v-if="!isFriend" class="user-content">
          <h2>---NIE JESTEŚCIE ZNAJOMYMI---</h2>
        </div>
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
