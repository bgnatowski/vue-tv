<script setup>
import {computed, ref} from 'vue';
import {useUserStore} from "@/stores/UserStore.js";
import {useMovieStore} from "@/stores/MovieStore.js";
import {fetchMovieDetails} from "@/services/TVDBService.js";

// ----------- STORES ------------------//
const userStore = useUserStore();
const movieStore = useMovieStore();

// ---------- PROPS AND EMITS ---------- //
const props = defineProps({movie: Object,});
const emit = defineEmits(['show-details']);

// ----------- DROPDOWN --------------//
const isShowDropdown = ref(false);
const showDropdown = () => {
  isShowDropdown.value = true;
};
const hideDropdown = () => {
  isShowDropdown.value = false;
};

// ------------- POPUP -------------//
const showDetails = async () => {
  const movieDetails = await fetchMovieDetails(props.movie.id)
  emit('show-details', movieDetails);
  console.log('MovieTile: wyemitowano show details', props.movie);
}

// -------------- TO LISTS ---------- //
const addToWatch = async () => {
  let m = props.movie;
  // console.log("addToWatch, movie id: ", m.id);
  await movieStore.createCurrentUserMovie({
    uId: userStore.uid,
    mId: m.id,
    isWatched: false
  });
  hideDropdown()
};

const addToWatched = async () => {
  let m = props.movie;
  await movieStore.createCurrentUserMovie({
    uId: userStore.uid,
    mId: m.id,
    isWatched: true
  });
  hideDropdown()
};

// ---------------------- IS ON LIST? --------- //
const isOnWatched = computed(() => movieStore.isOnWatched(props.movie.id))
const isOnToWatch = computed(() => movieStore.isOnToWatch(props.movie.id))
const isOnAnyList = computed(() => movieStore.isOnAnyList(props.movie.id))

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
</script>

<template>
  <div class="movie-item">
    <img :src="movie.posterPath" alt="Film Poster" class="movie-poster">
    <div class="movie-info">
      <h3>{{ movie.title }}</h3>
      <span>Premiera: {{ formattedReleaseDate }}</span>
      <span>Gatunki: {{ movie.genres.join(', ') }}</span>
      <span class="on-list" v-if="isOnWatched">Na liście: obejrzane</span>
      <span class="on-list" v-else-if="isOnToWatch">Na liście: do obejrzenia</span>
    </div>
    <div class="dropdown">
      <div class="icon-button" @click="showDropdown">
        <img src="@/assets/img/dots-icon.png" alt="Movie Options"/>
      </div>
      <div v-if="isShowDropdown" class="dropdown-content" @mouseleave="hideDropdown">
        <ul class="dropdown-list">
          <li @click="showDetails" class="dropdown-option">Zobacz więcej</li>
          <li @click="addToWatch" v-if="!isOnAnyList" class="dropdown-option">Dodaj do obejrzenia</li>
          <li @click="addToWatched" v-if="!isOnAnyList && canBeOnWatched" class="dropdown-option">Dodaj do obejrzanych</li>
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
  position: sticky;
  z-index: 9;
  transition: .5s ease all;
}

.dropdown-content {
  position: absolute;
  right: 0;
  top: unset;
  white-space: nowrap;
  z-index: 9;
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