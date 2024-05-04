<script setup>
import { ref } from 'vue';
import {useUserStore} from "@/stores/UserStore.js";
import {useMovieStore} from "@/stores/MovieStore.js";

const props = defineProps({
  movie: Object,
});

const emit = defineEmits(['show-details']);

const isShowDropdown = ref(false);

const showDropdown = () => {
  isShowDropdown.value = true;
};

const hideDropdown = () => {
  isShowDropdown.value = false;
};

const showDetails = (id) => {
  emit('show-details', id);
};

const userStore = useUserStore();
const movieStore = useMovieStore();

const addToWatch = () => {
  let m = props.movie;
  console.log("addToWatch, movie id: ", m.id);
  console.log("handleToWatch, user: ", userStore.uuid);
  userStore.addToUserList('moviesToWatch', m.id)
  movieStore.createUserMovie({
    userId: userStore.uuid, //jakby klucz obcy
    movieId: m.id, //jakby klucz glowny
    isWatched: false,
    isPrivate: true,
    userRating: 0,
    note: '',
  });
};

const addToWatched = () => {
  let m = props.movie;
  console.log("addToWatched, movie id: ", m.id);
  console.log("addToWatched, user: ", userStore.uuid);
  userStore.addToUserList('moviesWatched', m.id)
  movieStore.createUserMovie({
    userId: userStore.uuid,
    movieId: m.id,
    isWatched: true,
    isPrivate: true,
    userRating: 0,
    note: '',
  });
};
</script>

<template>
  <div class="movie-item">
    <img :src="movie.posterPath" alt="Film Poster" class="movie-poster">
    <div class="movie-info">
      <h3>{{ movie.title }}</h3>
      <span>Premiera: {{ movie.releaseDate.substring(0,4) }}</span>
      <span>Gatunki: {{ movie.genres.join(', ') }}</span>
    </div>
    <div class="dropdown">
      <div class="icon-button" @click="showDropdown">
        <img src="@/assets/img/dots-icon.png" alt="Movie Options"/>
      </div>
      <div v-if="isShowDropdown" class="dropdown-content" @mouseleave="hideDropdown">
        <ul class="dropdown-list">
          <li @click="showDetails(movie.id)" class="dropdown-option">Zobacz więcej</li>
          <li @click="addToWatch" class="dropdown-option">Dodaj do obejrzenia</li>
          <li @click="addToWatched" class="dropdown-option">Dodaj do obejrzanych</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/dropdown.css);

.movie-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  position: relative;
  transition: .5s ease all;
}

.movie-item:hover {
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  background-color: var(--lighter-main-transparent);
}

.movie-poster {
  width: 70px;
  height: auto;
  border-radius: 1em;
}

.movie-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 10px;
}

.movie-info h3 {
  margin: 0;
  font-size: 1.2em;
}

.movie-info p {
  margin: 5px 0;
  font-size: 0.9em;
  color: #666;
}

.movie-info span {
  font-size: 0.8em;
  color: #444;
}

.dropdown {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 999;
  transition: .5s ease all;
}

.dropdown-content {
  position: absolute;
  right: 0;
  top: 0;
  white-space: nowrap;
  z-index: 999;
  background-color: white;
  transition: .5s ease all;
}

</style>