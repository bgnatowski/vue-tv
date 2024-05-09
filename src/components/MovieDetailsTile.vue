<script setup>
import RatingStars from "@/components/RatingStars.vue";
import AddToMovieListButtons from "@/components/AddToMovieListButtons.vue";
import {computed} from "vue";
import {formatISODate} from "@/js/TimeUtils.js";

const props = defineProps({
  movie: Object,
  noInfoButton: Boolean
})

const emit = defineEmits([
  'show-details',
]);

// --------------------- POPUP TO PARENT --------------------------//
const handleUpShowDetails = (detailData) => {
  emit('show-details', detailData);
}

const formattedReleaseDate = computed(() => formatISODate(props.movie.releaseDate));

</script>

<template>
  <section class="post">
    <div class="popup-card">
      <div class="upper-bar">
        <div class="movie-poster">
          <img :src="movie.posterPath" alt="Movie poster"/>
        </div>
        <div class="movie-details">
          <h1 class="movie-title">{{ movie.title }}</h1>
          <table class="tg">
            <thead>
            <tr>
              <th class="tg-0pky tg-size">Premiera:</th>
              <th class="tg-0lax tg-size">{{ formattedReleaseDate }}</th>
            </tr>
            <tr>
              <th class="tg-0pky tg-size">Gatunki:</th>
              <th class="tg-0lax tg-size">{{ movie.genres.map((genre) => genre.name).join(", ") }}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="tg-0pky tg-size">Długość:</td>
              <td class="tg-0lax tg-size">{{ movie.duration }} min</td>
            </tr>
            <tr>
              <td class="tg-0pky tg-size">Ilość ocen:</td>
              <td class="tg-0lax tg-size">{{ movie.voteCount }}</td>
            </tr>
            </tbody>
          </table>
          <RatingStars class="rating" read-only :rating="movie.rating"></RatingStars>
          <AddToMovieListButtons
              :movie-details="movie"
              @show-details="handleUpShowDetails"
              :noInfoButton="noInfoButton"
              row="row"
          ></AddToMovieListButtons>
        </div>
      </div>
      <div class="lower-bar">
        <h2>Opis</h2>
        <div class="movie-description">
          <p>{{ movie.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rating {
  margin: 5px 0;
}
.popup-card{
  margin-right: 1em;
  margin-left: 1em;
}

.upper-bar{
  display: flex;
  padding: .5em;
}

.tg {
  border-collapse: separate;
  border-spacing: 0 .2em;
}

.movie-poster {
  display: flex;
  width: fit-content;
  height: auto;
  margin-right: 1em;
  flex-grow: 0;
  flex-shrink: 1;
}

.movie-poster img {
  height: 20rem;
  width: 100%;
  object-fit: cover;
  border-radius: 1.5em;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.50);
}

.movie-title{
  font-size: 2em;
}

.lower-bar{
  margin-top: 1rem;
}

</style>