<script setup>
import MovieItem from "@/components/page/SearchResultMovieItem.vue";
import UserItem from "@/components/page/SearchResultUserItem.vue";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";
import {computed, ref} from "vue";

// ---------------------- PROPS AND EMITS ----------------- //
const props = defineProps({
  results: Object
});
const emits = defineEmits(['hide-results']);

const handleMouseOut = () => {
  emits('hide-results');
  showFilter.value = false;
  isMovies.value = true;
  isUsers.value = true;
};

// --------------------- POPUP -------------- ///
const showDetails = ref(false);
const showFilter = ref(false);
const isMovies = ref(true);
const isUsers = ref(true);
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

const isResult = computed(() => {
  return props.results.movies.length || props.results.users.length;
})

const handleShowFilters = () => {
  showFilter.value = !showFilter.value
  isMovies.value = true;
  isUsers.value = false;
}

const hideOneResults = () => {
  isMovies.value = !isMovies.value;
  isUsers.value = !isUsers.value;
}

</script>

<template>
  <ul class="result" :class="isResult ? 'shadow' : ''" @mouseleave="handleMouseOut">
    <div class="flex-column">
      <div class="flex-row search-slider" v-if="results.movies.length || results.users.length">
        <span class="filter-span">Potrzebujesz filtru? Kliknij -></span>
        <label class="custom-checkbox">
          <input type="checkbox" @click="handleShowFilters">
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="flex-row search-slider" v-if="showFilter">
        <span>filmy</span>
        <label class="switch">
          <input type="checkbox" @change="hideOneResults">
          <span class="slider round"></span>
        </label>
        <span>uzytkownicy</span>
      </div>
    </div>

    <!-- Sekcja z filmami -->
    <template v-if="isMovies && results.movies.length">
      <h4 class="results-title">Filmy</h4>
      <MovieItem
          v-for="movie in results.movies"
          :key="movie.id"
          :movie="movie"
          class="movie-item"
          @show-details="handleShowDetails"
      />
    </template>
    <!-- Sekcja z użytkownikami -->
    <template  v-if="isUsers && results.users.length">
      <h4 class="results-title">Użytkownicy</h4>
      <UserItem
          v-for="user in results.users"
          :key="user.id"
          :user="user"
          class="user-item"
      />
    </template>
  </ul>
  <MovieDetailsPopup v-if="showDetails"
                     :movie="selectedMovie"
                     :on-to-watch="isToWatch"
                     :on-watched="isWatched"
                     @close="handleClose">
  </MovieDetailsPopup>
</template>

<style scoped>
.custom-checkbox {
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-self: center;
  position: relative;
  cursor: pointer;
  color: #444;
}

.custom-checkbox input {
  opacity: 0;
  cursor: pointer;
}

.custom-checkbox .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #ccc;
  border-radius: 4px;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: #9CEAEF;
}

.custom-checkbox .checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.search-slider{
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.search-slider span {
  font-size: 1em;
}
.result {
  background: rgb(255, 255, 255, 1);
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: -1;
  width: 50%;
  overflow-y: auto;
  scrollbar-width: thin;
  max-height: 70vh;
  border-radius: 0 0 1em 1em;
}
.shadow {
  box-shadow: 0 4px 15px 4px rgba(0, 0, 0, 0.25);
}

.results-title{
  margin: 5px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--lighter-main);
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}


@media screen and (max-width: 600px){
  .result {
    width: 80%;
  }
}
</style>