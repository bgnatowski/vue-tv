<script setup>

import {computed, onMounted, ref} from "vue";
import {fetchMovieDetails} from "@/services/TVDBService.js";
import {useMovieStore} from "@/stores/MovieStore.js";
import {useUserStore} from "@/stores/UserStore.js";
import RatingStars from "@/components/RatingStars.vue";

// ------------------ PROPS AND EMITS -----------------------//
const props = defineProps({
  watched: Boolean,
  movieId: '',
  userRating: 0,
})

const emit = defineEmits([
  'show-details',
  'emit-duration',
]);

// ------------------- INSTANCJE STORES -------------------//
const movieStore = useMovieStore();
const userStore = useUserStore();

// --------------------- ZMIENNE -------------------------//
const movie = ref({});
const isLoaded = ref(false);
const isPrivate = ref();
const userRating = ref(0)

// ------------------- MOVE TO USER LIST ----------------------//
const moveToWatched = () => {
  movieStore.createCurrentUserMovie({
    uId: userStore.uid,
    mId: props.movieId,
    isWatched: false
  });
};

const moveToWatch = () => {
  movieStore.createCurrentUserMovie({
    uId: userStore.uid,
    mId: props.movieId,
    isWatched: true
  });
};

// ---------------------- IS ON LIST? --------- //
const isOnWatched = computed(() => movieStore.isOnWatched(props.movieId))
const isOnToWatch = computed(() => movieStore.isOnToWatch(props.movieId))

// ---------------------------POKAZANIE POPUPU ----------------//
const showDetails = () => {
  emit('show-details', {
    movie: movie.value,
    onWatched: isOnWatched.value,
    onToWatch: isOnToWatch.value
  });
}
// ----------------------------- ZALADOWANIE DANYCH ----------------//
onMounted(async () => {
  if (props.movieId !== undefined) {
    movie.value = await fetchMovieDetails(props.movieId);
    emit("emit-duration", movie.value.duration)
    userRating.value = props.userRating;
    isLoaded.value = true;
  } else {
    console.log('BLAD')
  }
});

</script>

<template>
  <section class="post">
    <div class="movie-card" v-if="isLoaded">
      <div class="movie-poster">
        <img :src="movie.posterPath" alt="Movie poster"/>
      </div>
      <div class="movie-details">
        <div class="movie-center">
          <div class="movie-text">
            <h2> {{ movie.title }} </h2>
            <div class="movie-metadata">
              <p class="metadata-title">Premiera: <span>{{ movie.releaseDate.substring(0, 4) }}</span></p>
              <p class="metadata-title">Gatunki: <span>{{ movie.genres.map((genre) => genre.name).join(", ") }}</span>
              </p>
              <p class="metadata-title">Długość: <span>{{ movie.duration }} min</span></p>
              <p class="metadata-title" v-if="watched">Ocena: <span>{{ userRating }}/10</span></p>
              <RatingStars v-if="watched" read-only :rating="userRating"></RatingStars>
            </div>
          </div>
          <div class="buttons" v-if="!(isOnToWatch || isOnWatched)">
            <button class="action-button" @click="moveToWatch">Do obejrzenia</button>
            <button class="action-button" @click="moveToWatched">Do obejrzanych</button>
          </div>
          <div v-else>
            <span class="on-list" v-if="isOnWatched">Na liście: obejrzane</span>
            <span class="on-list" v-else-if="isOnToWatch">Na liście: do obejrzenia</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading">
      <p>Ładowanie...</p>
    </div>
  </section>
</template>

<style scoped>
@import url(@/assets/buttons.css);
.action-button{
  align-self: flex-start;
  min-width: fit-content;
  width: 150px;
  padding: .8em;
  font-size: .6em;
}
.on-list{
  font-size: 0.7em;
  font-weight: 600;
  color: var(--main-color);
}

.post {
  min-height: fit-content;
}

.movie-card {
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: auto;
}

.movie-poster {
  width: 130px;
  height: 180px;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
}

.movie-poster img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 1.5em;
}

.movie-details {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding: 0 1em;
  width: 100%;
  /*height: fit-content;*/
}

.movie-text h2 {
  font-size: 1.3em;
  color: #000;
  font-weight: 600;
  width: 100%;
}

.movie-metadata {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
}

.movie-metadata .metadata-title {
  font-weight: 600;
  text-align: left;
  font-size: .8em;
}

.movie-metadata p {
  font-weight: 400;
  text-align: left;
  font-size: .9em;
}

.movie-details span {
  font-weight: 300;
  text-align: left;
  font-size: .9em;
}

.movie-center {
  display: flex;
  flex-direction: column;
  width: 60%;
  justify-content: space-between;
}

.buttons {
  display: flex;
  flex-direction: column;
  width: 40%;
  min-width: fit-content;
}

.card-action-buttons {
  display: flex;
  align-content: flex-end;
  justify-content: flex-end;
}

.cab-min-width {
  min-width: 250px;
}

.card-action-icon {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  padding: 10px;
  transition: .3s ease all;
  cursor: pointer;
}

.card-action-icon:hover {
  background-color: var(--lighter-main);
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

.card-action-icon:active {
  background-color: var(--clicked-button);
}

.card-action-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.movie-action-buttons {
  display: flex;
  position: relative;
  font-weight: 400;
  transition: .5s ease all;
  justify-content: flex-start;
}

.action-switch {
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 5px;
}

.action-switch span {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

/*checkbox*/
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}

.switch-text p {
  font-size: .8em;
  text-align: right;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
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

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

@media screen and (max-width: 800px) {
  .movie-center {
    width: 100%;
  }

  .buttons {
    height: fit-content;
    width: auto;
  }

  .card-action-buttons {
    min-height: 185px;
    flex-direction: column-reverse;
    justify-content: flex-end;
    align-self: flex-end;
    min-width: unset
  }

  .card-action-icon {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    padding: 8px;
  }
}


@media screen and (max-width: 500px) {
  .movie-poster {
    width: 100px;
    height: auto;
    object-fit: cover;
  }

  .card-action-buttons {
    padding: 0;
  }

  .card-action-icon {
    height: 35px;
    width: 35px;
  }

  .movie-details {
    padding: 5px;
  }

  .switch {
    width: 40px;
    height: 24px;
  }

  .slider:before {
    height: 16px;
    width: 16px;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(15px);
    -ms-transform: translateX(15px);
    transform: translateX(15px);
  }
}

@media screen and (max-width: 420px) {
  .movie-poster {
    width: 50px;
    height: auto;
    object-fit: cover;
  }

  .movie-text h2 {
    font-size: 1em;
  }

  .movie-metadata p {
    font-size: .6em;
  }

  .movie-metadata .metadata-title {
    font-size: .6em;
  }
}

@media screen and (max-width: 350px) {
  .movie-poster {
    display: none;
  }
}
</style>
  