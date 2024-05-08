<script setup>

import {computed, onMounted, ref} from "vue";
import {fetchMovieDetails} from "@/services/TVDBService.js";
import {useMovieStore} from "@/stores/MovieStore.js";
import {useUserStore} from "@/stores/UserStore.js";
import RatingStars from "@/components/RatingStars.vue";
import AddToMovieListButtons from "@/components/AddToMovieListButtons.vue";

// ------------------ PROPS AND EMITS -----------------------//
const props = defineProps({
  watched: Boolean,
  movieId: '',
  userRating: 0,
})

const emit = defineEmits([
  'emit-duration',
  'show-details',
]);

// --------------------- POPUP TO PARENT --------------------------//
const handleUpShowDetails = (detailData) => {
  emit('show-details', detailData);
}

// --------------------- ZMIENNE -------------------------//
const movie = ref({});
const isLoaded = ref(false);
const isPrivate = ref();
const userRating = ref(0)

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
        </div>
      </div>
      <AddToMovieListButtons
          :movie-details="movie"
          @show-details="handleUpShowDetails"
      ></AddToMovieListButtons>
    </div>
    <div v-else class="loading">
      <p>Ładowanie...</p>
    </div>
  </section>
</template>

<style scoped>
@import url(@/assets/buttons.css);

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
  