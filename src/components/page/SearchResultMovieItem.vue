<script setup>
import {computed, onMounted, ref} from 'vue';
import {useMovieStore} from "@/stores/MovieStore.js";
import {fetchMovieDetails} from "@/services/TMDBService.js";
import {useRouter} from "vue-router";
import {formatGenres, formatSearchGenres} from "@/js/DataUtils.js";

// ----------- STORES ------------------//
const movieStore = useMovieStore();

// ---------- PROPS AND EMITS ---------- //
const props = defineProps({movie: Object,});
const emits = defineEmits(['show-details']);

onMounted(() => {
  // console.log(props.movie)
})

// ----------- DROPDOWN --------------//
const isShowDropdown = ref(false);
const showDropdown = () => isShowDropdown.value = true;
const hideDropdown = () => isShowDropdown.value = false;

// ------------- POPUP -------------//
const showDetails = async () => {
  const movieDetails = await fetchMovieDetails(props.movie.id)
  emits('show-details', {
    movie: movieDetails,
    onWatched: isOnWatched.value,
    onToWatch: isOnToWatch.value
  });
}

// ------------ TO MOVIE PAGE ---------//
const router = useRouter();
const goToMoviePage = () => {
  hideDropdown()
  router.push({name: 'MovieDetails', params: {id: props.movie.id}});
}

// -------------- TO LISTS ---------- //
const addToWatch = async () => {
  let m = props.movie;
  await movieStore.createCurrentUserMovie({
    mId: m.id,
    isWatched: false
  });
  hideDropdown()
};

const addToWatched = async () => {
  let m = props.movie;
  await movieStore.createCurrentUserMovie({
    mId: m.id,
    isWatched: true
  });
  hideDropdown()
};

// ---------------------- IS ON LIST? --------- //
const isOnWatched = computed(() => movieStore.isOnWatched(props.movie.id))
const isOnToWatch = computed(() => movieStore.isOnToWatch(props.movie.id))

// ------------------ CAN BE ON WATCHED --------- //
const canBeOnWatched = computed(() => {
  const releaseDateString = props.movie.releaseDate;
  if (!releaseDateString || releaseDateString === 'brak informacji') {
    return false;
  }

  const releaseDate = new Date(releaseDateString);
  const today = new Date();
  return releaseDate <= today;
});

const formattedReleaseDate = computed(() => {
  if (!props.movie.releaseDate || props.movie.releaseDate === 'brak informacji') {
    return 'Brak informacji';
  }
  return props.movie.releaseDate.substring(0, 4); // Show only the year
});

const formattedGenres = computed(() => formatSearchGenres(props.movie.genres));

</script>

<template>
  <div class="movie-item">
    <img :src="movie.posterPath" alt="Film Poster" class="movie-poster">
    <div class="movie-info">
      <h3>{{ movie.title }}</h3>
      <span>Premiera: {{ formattedReleaseDate }}</span>
      <span>Gatunki: {{ formattedGenres }}</span>
      <span class="on-list" v-if="isOnWatched">Na liście: obejrzane</span>
      <span class="on-list" v-else-if="isOnToWatch">Na liście: do obejrzenia</span>
    </div>
    <div class="icon-button" @click="showDropdown">
      <img src="@/assets/img/dots-icon.png" alt="Movie Options"/>
    </div>
    <div class="dropdown">
      <div v-if="isShowDropdown" class="dropdown-content" @mouseleave="hideDropdown">
        <ul class="dropdown-list">
          <li @click="showDetails" class="dropdown-option">Szybki podgląd</li>
          <li @click="goToMoviePage" class="dropdown-option">Zobacz strone filmu</li>
          <li @click="addToWatch" v-if="!(isOnToWatch || isOnWatched)" class="dropdown-option">Dodaj do obejrzenia</li>
          <li @click="addToWatched" v-if="!(isOnToWatch || isOnWatched) && canBeOnWatched" class="dropdown-option">Dodaj do obejrzanych</li>
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

.movie-info .on-list{
  font-size: 0.7em;
  font-weight: 600;
  color: var(--main-color);
}

.dropdown {
  position: absolute;
  z-index: 9;
  transition: .5s ease all;
}

.dropdown-content {
  position: absolute;
  right: 15px;
  top: -15px;
  white-space: nowrap;
  z-index: 999999;
  background-color: white;
  transition: .5s ease all;
}

@media screen and (max-width: 600px){
  .movie-poster {
    width: 50px;
    height: auto;
    border-radius: 1em;
  }
}
@media screen and (max-width: 350px) {
  .movie-poster{
    display: none;
  }
}

</style>