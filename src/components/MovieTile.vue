<script setup>

import {onMounted, ref, watch} from "vue";
import {fetchMovieDetails} from "@/services/TVDBService.js";
import {useMovieStore} from "@/stores/MovieStore.js";
import {useUserStore} from "@/stores/UserStore.js";
import RatingStars from "@/components/RatingStars.vue";

// ------------------ PROPS AND EMITS -----------------------//
const props = defineProps({
  watched: Boolean,
  movieId: {type: Number, required: true}
})
const emit = defineEmits([
  'show-details',
  'emit-duration',
]);

// ------------------- INSTANCJE STORES -------------------//
const movieStore = useMovieStore();
const userStore = useUserStore();

// ------------------- DELETE FROM LIST -------------------//
const deleteMovie = () => {
  movieStore.removeCurrentUserMovie(
      userStore.uid,
      props.movieId,
  );
};

// ------------------- MOVE TO WATCHED ----------------------//
const moveToWatched = () => {
  movieStore.modifyCurrentUserMovie(
      userStore.uid,
      props.movieId,
      {isWatched: true}
  );
};

// ------------------- RATING UPDATE ----------------------//
const userRating = ref('');

const updateRating = (newRating) => {
  movieStore.modifyCurrentUserMovie(
      userStore.uid,
      props.movieId,
      {userRating: newRating}
  );
  userRating.value = newRating;
};

// ------------------- CHANGE VISIBLE/PUBLIKACJA -----------//
const isPrivate = ref();

function publicMovie() {
  movieStore.modifyCurrentUserMovie(
      userStore.uid,
      props.movieId,
      {isPrivate: false}
  );
  isPrivate.value = false;
}

function unpublicMovie() {
  movieStore.modifyCurrentUserMovie(
      userStore.uid,
      props.movieId,
      {isPrivate: true}
  );
  isPrivate.value = true;
}

// ------------------- WATCHER NA AKTUALIZACJE W STORE --------//
watch(
    () => isPrivate.value,
    (newVal) => {
      isPrivate.value = newVal !== undefined ? newVal : true;
    },
    {immediate: true}
);

// ---------------------------POKAZANIE POPUPU ----------------//
const showDetails = () => {
  emit('show-details', movie.value);
  console.log('showDetails,',movie.value)
}

// ----------------------------- ZALADOWANIE DANYCH ----------------//
const movie = ref({});
const isLoaded = ref(false);

onMounted(async () => {
  if (props.movieId != undefined) {
    movie.value = await fetchMovieDetails(props.movieId);
    emit("emit-duration", movie.value.duration)
    isPrivate.value = movieStore.getCurrentUserMovieById(props.movieId).isPrivate;
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
              <p class="metadata-title">Gatunki: <span>{{ movie.genres.map((genre) => genre.name).join(", ") }}</span></p>
              <p class="metadata-title">Długość: <span>{{ movie.duration }} min</span></p>
              <p class="metadata-title">Twoja ocena: <span>{{ userRating }}/10</span></p>
              <RatingStars @rating-value="updateRating" v-if="watched"></RatingStars>
            </div>
          </div>
          <div class="movie-action-buttons" v-if="!watched">
            <div class="action-switch">
              <div class="switch-text">
                <p>Obejrzałeś?</p>
                <p>Przesuń &#8594;</p>
              </div>
              <label class="switch">
                <input @change="moveToWatched" type="checkbox">
                <span class="slider round"> </span>
              </label>
            </div>
          </div>
        </div>
        <div class="buttons">
          <div class="card-action-buttons" :class="watched ? 'cab-min-width' : ''">
            <!--            todo: recommend -->
            <div class="card-action-icon" v-if="!isPrivate && watched" aria-label="Recommend">
              <img src="@/assets/img/recommend-icon.png" alt="Recommend icon"/>
            </div>
            <!--            todo: note -->
            <div class="card-action-icon" aria-label="Note">
              <img src="@/assets/img/edit-icon.png" alt="Note icon"/>
            </div>
            <div @click="showDetails" class="card-action-icon" aria-label="Info">
              <img src="@/assets/img/info-icon.png" alt="Info icon"/>
            </div>
            <div class="card-action-icon" aria-label="Hide">
              <img src="@/assets/img/hide-icon.png" v-if="isPrivate" alt="Hide icon" @click="publicMovie"/>
              <img src="@/assets/img/show-icon.png" v-else alt="Show icon" @click="unpublicMovie"/>
            </div>
            <div @click="deleteMovie" class="card-action-icon" aria-label="Delete">
              <img src="@/assets/img/delete-icon.png" alt="Delete icon"/>
            </div>
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
  .buttons{
    height: fit-content;
    width: auto;
  }
  .card-action-buttons{
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
  .movie-poster{
    display: none;
  }
}
</style>
  