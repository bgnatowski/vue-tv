<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import {fetchMovieDetails} from "@/services/TVDBService.js";
import RatingStars from "@/components/RatingStars.vue";
import {useUserStore} from "@/stores/UserStore.js";
import {formatFirestoreTimestamp} from "@/js/TimeUtils";
import {usePostStore} from "@/stores/PostStore.js";
import {useMovieStore} from "@/stores/MovieStore.js";
import {fetchUserByUid} from "@/services/UserService.js";

// -------------- STORE----------------------------//
const userStore = useUserStore();
const postStore = usePostStore();
const movieStore = useMovieStore();

// ------------ LADOWANIE DANYCH ----------------//
const isLoaded = ref(false);
const user = reactive({
  username: '',
  photoUrl: '',
})

onBeforeMount(async () => {
  if (props.profile) {
    user.photoUrl = userStore.getPhotoUrl
  } else {
    let friend = await fetchUserByUid(props.post.userId)
    if (friend) {
      user.username = friend.username;
      user.photoUrl = friend.photoUrl;
    }
  }
  isLoaded.value = true
})

// -------------- PROPS AND EMITS ------------------//
const props = defineProps({
  profile: Boolean,
  postId: '',
  post: Object,
})
const emits = defineEmits(['show-details']);

// ---------------------- DROPDOWN ----------------//
const isShowDropdown = ref(false)

function showDropdown() {
  isShowDropdown.value = true
}

function hideDropdown() {
  isShowDropdown.value = false;
}

// ---------------------------POKAZANIE POPUPU ----------------//
const showDetails = async () => {
  let movie = await fetchMovieDetails(props.post.movie.id)
  if (props.profile) {
    emits('show-details', {
      movie: movie,
      onWatched: true,
      onToWatch: false
    });
  } else {
    emits('show-details', {
      movie: movie,
      onWatched: movieStore.isOnWatched(movie.id),
      onToWatch: movieStore.isOnToWatch(movie.id)
    });
  }
}
// ------------------- USUWANIE POSTU -----------------//
const handleDeletePost = () => {
  postStore.deleteUserPost(props.post.movie.id);
}

</script>

<template>
  <div class="post">
    <div class="upper-bar">
      <div class="user-info">
        <div class="user-image">
          <img :src="user.photoUrl" alt="user photo">
        </div>
        <p v-if="!profile" class="user-name">uzytkownik {{user.username}} polecił film:</p>
        <p v-else class="user-name">Poleciłeś film:</p>
      </div>
      <div class="dropdown">
        <div class="icon-button" @click="showDropdown">
          <img src="@/assets/img/dots-icon.png" alt="Movie Options"/>
        </div>
        <div v-if="isShowDropdown" class="dropdown-content" @mouseleave="hideDropdown">
          <ul class="dropdown-list">
            <li @click="showDetails" class="dropdown-option">Więcej o filmie</li>
            <li v-if="profile" @click="handleDeletePost" class="dropdown-option">Usuń post</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="post-card" v-if="isLoaded">
      <div class="movie-poster">
        <img :src="post.movie.posterPath"
             alt="Movie poster for Diuna"/>
      </div>
      <div class="movie-details">
        <div>
          <span class="span-date">{{ formatFirestoreTimestamp(post.timestamp) }}</span>
          <h1 class="movie-title">{{ post.movie.title }}</h1>
          <table class="tg">
            <thead>
            <tr>
              <th class="tg-0pky tg-size">Gatunki:</th>
              <th class="tg-0lax tg-size">{{ post.movie.genres.map((genre) => genre.name).join(", ") }}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="tg-0pky tg-size">Długość:</td>
              <td class="tg-0lax tg-size">{{ post.movie.duration }} min</td>
            </tr>
            </tbody>
          </table>
        </div>
        <RatingStars read-only :rating="post.movie.userRating"></RatingStars>
        <p class="post-description" ref="postDescriptionRef" v-dragscroll.y> {{ post.content }}
        </p>
      </div>
    </div>
    <div v-else class="loading">
      <p>Ładowanie...</p>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/dropdown.css);

.dropdown {
  position: sticky;
  z-index: 9;
  transition: .5s ease all;
}

.dropdown-content {
  position: absolute;
  right: 0;
  top: 0;
  white-space: nowrap;
  z-index: 9;
  background-color: white;
  transition: .5s ease all;
}

.span-date {
  font-size: .8em;
  font-style: italic;
}

.user-info {
  display: flex;
  padding: .2rem;
  justify-content: flex-start;
  align-content: flex-start;
}

.user-info p {
  justify-content: center;
  align-content: center;
  font-size: .8em;
}

.upper-bar {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.user-image {
  display: flex;
  height: 45px;
  width: 45px;
  align-content: center;
  justify-content: center;
  margin: auto 1em auto 0;
  border-radius: 50%;

}
.user-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
  border: 2px solid var(--lighter-main)
}


.post-card {
  display: flex;
  height: 100%;
  justify-content: space-between;
}

.movie-poster {
  width: 200px;
  height: auto;
  object-fit: cover;
  margin-right: 10px;
}

.movie-poster img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 1.5em;
}

.movie-details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}

.movie-title {
  color: #000;
  font-size: 1em;
}

.movie-details .post-description {
  text-align: justify;
  text-justify: inter-word;
  overflow-y: auto;
  scrollbar-width: thin;
  hyphens: auto;
  max-height: 150px;
  font-size: .8em;
}

.tg-size {
  font-size: .7em;
}


@media screen and (max-width: 728px) {
  .movie-poster {
    width: 100px;
    height: auto;
    object-fit: cover;
  }
}

@media screen and (max-width: 350px) {
  .movie-poster {
    display: none;
  }
}

</style>

