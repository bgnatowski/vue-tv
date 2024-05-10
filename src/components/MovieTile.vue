<script setup>

import {computed, onBeforeMount, onMounted, ref, watch, watchEffect} from "vue";
import {fetchMovieDetails} from "@/services/TMDBService.js";
import {useMovieStore} from "@/stores/MovieStore.js";
import RatingStars from "@/components/RatingStars.vue";
import {usePostStore} from "@/stores/PostStore.js";
import {formatGenres} from "@/js/DataUtils.js";

// ------------------ PROPS AND EMITS -----------------------//
const props = defineProps({
  watched: Boolean,
  movieId: {type: Number, required: true}
})
const emit = defineEmits([
  'show-details',
  'show-note',
  'show-post',
  'emit-duration',
]);

// ------------------- INSTANCJE STORES -------------------//
const movieStore = useMovieStore();

// --------------------- ZMIENNE -------------------------//
const movie = ref({});
const isLoaded = ref(false);
const isPrivate = ref();
const userRating = ref(0)
const movieNote = ref('')

// ------------------- DELETE FROM LIST -------------------//
const deleteMovie = () => {
  movieStore.removeCurrentUserMovie(
      props.movieId,
  );
  emit("emit-duration", -movie.value.duration)
};

// ------------------- MOVE TO WATCHED ----------------------//
const moveToWatched = () => {
  movieStore.modifyCurrentUserMovie(
      props.movieId,
      {isWatched: true}
  );
  emit("emit-duration", -movie.value.duration)
};

// ------------------- RATING UPDATE ----------------------//
const updateRating = async () => {
  await movieStore.modifyCurrentUserMovie(
      props.movieId,
      {userRating: userRating.value}
  );
  //todo on update rating -> check if there is already post -> update user rating in post otherwise do nothing
};

// ------------------- CHANGE VISIBLE/PUBLIKACJA -----------//
const publicMovie = () => {
  movieStore.modifyCurrentUserMovie(
      props.movieId,
      {isPrivate: false}
  );
  isPrivate.value = false;
}
const unpublicMovie = () => {
  movieStore.modifyCurrentUserMovie(
      props.movieId,
      {isPrivate: true}
  );
  isPrivate.value = true;
}
// ---------------------- IS ON LIST? --------- //
const isOnWatched = computed(() => movieStore.isOnWatched(movie.value.id))
const isOnToWatch = computed(() => movieStore.isOnToWatch(movie.value.id))

// ---------------------------POKAZANIE POPUPU ----------------//
const showDetails = () => {
  emit('show-details', {
    movie: movie.value,
    onWatched: isOnWatched.value,
    onToWatch: isOnToWatch.value
  });
}

const showNote = () => {
  emit('show-note', {
    id: movie.value.id,
    title: movie.value.title,
    note: movieNote.value
  });
}

const showPost = () => {
  emit('show-post', {
    postData: {
      id: movie.value.id,
      title: movie.value.title,
      duration: movie.value.duration,
      posterPath: movie.value.posterPath,
      genres: movie.value.genres,
      userRating: userRating.value
    },
  });
}

// ----------------------------- ZALADOWANIE DANYCH ----------------//
onBeforeMount(async () => {
  if (props.movieId !== undefined) {
    movie.value = await fetchMovieDetails(props.movieId);
    emit("emit-duration", movie.value.duration)
    isLoaded.value = true;
  } else {
    console.log('BLAD')
  }
});

watch(() => movieStore.getCurrentUserMovieById(props.movieId), (newMovie) => {
  isPrivate.value = newMovie.isPrivate
  movieNote.value = newMovie.note;
  userRating.value = newMovie.userRating;
}, { deep: true, immediate: true });

const formattedGenres = computed(() => formatGenres(movie.value.genres));

</script>

<template>
  <section class="post">
    <div class="popup-card" v-if="isLoaded">
      <div class="movie-poster">
        <img :src="movie.posterPath" alt="Movie poster"/>
      </div>
      <div class="movie-details">
        <div class="movie-center">
          <div class="movie-text">
            <h2> {{ movie.title }} </h2>
            <div class="movie-metadata">
              <p class="metadata-title">Premiera: <span>{{ movie.releaseDate.substring(0, 4) }}</span></p>
              <p class="metadata-title">Gatunki: <span>{{ formattedGenres }}</span>
              </p>
              <p class="metadata-title">Długość: <span>{{ movie.duration }} min</span></p>
              <p class="metadata-title" v-if="watched">Twoja ocena: <span>{{ userRating }}/10</span></p>
              <RatingStars @rating-value="e => userRating=e" @click="updateRating" :rating="userRating" v-if="watched"></RatingStars>
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
            <div @click="showPost" class="card-action-icon" v-if="!isPrivate && watched" aria-label="Recommend">
              <img src="@/assets/img/recommend-icon.png" alt="Recommend icon"/>
              <span class="button-span" v-if="!isPrivate && watched">Recenzja</span>
            </div>
            <div @click="showNote" class="card-action-icon" aria-label="Note">
              <img src="@/assets/img/edit-icon.png" alt="Note icon"/>
              <span class="button-span">Notatka</span>
            </div>
            <div @click="showDetails" class="card-action-icon" aria-label="Info">
              <img src="@/assets/img/info-icon.png" alt="Info icon"/>
              <span class="button-span">Więcej informacji</span>
            </div>
            <div class="card-action-icon" aria-label="Hide">
              <img src="@/assets/img/hide-icon.png" v-if="isPrivate" alt="Hide icon" @click="publicMovie"/>
              <img src="@/assets/img/show-icon.png" v-else alt="Show icon" @click="unpublicMovie"/>
              <p class="button-span" v-if="isPrivate">Ukryty</p>
              <span class="button-span" v-else>Publiczny</span>
            </div>
            <div @click="deleteMovie" class="card-action-icon" aria-label="Delete">
              <img src="@/assets/img/delete-icon.png" alt="Delete icon"/>
              <span class="button-span">Usuń</span>
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
@import url(@/assets/movie-buttons.css);

.post {
  min-height: fit-content;
}

.popup-card {
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
}


@media screen and (max-width: 500px) {
  .movie-poster {
    width: 100px;
    height: auto;
    object-fit: cover;
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

  .movie-details {
    padding-bottom: 1em;
    margin-bottom: 10px;
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
  