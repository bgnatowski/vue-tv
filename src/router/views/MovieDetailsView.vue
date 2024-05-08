<script setup>
import { onBeforeMount, onMounted, ref, computed } from "vue";
import {fetchMovieDetails} from "@/services/TVDBService.js";
import RatingStars from "@/components/RatingStars.vue";
import {useMovieStore} from "@/stores/MovieStore.js";
import {useUserStore} from "@/stores/UserStore.js";

const props = defineProps(['id'])
const movie = ref({});
// ------------------- INSTANCJE STORES -------------------//
const movieStore = useMovieStore();
const userStore = useUserStore();

// ---------------------- IS ON LIST? --------- //
const isOnWatched = computed(() => movieStore.isOnWatched(movie.value.id))
const isOnToWatch = computed(() => movieStore.isOnToWatch(movie.value.id))

onBeforeMount(async () => {
  movie.value = await fetchMovieDetails(props.id);
});

// -------------- TO LISTS ---------- //
const addToWatch = async () => {
  await movieStore.createCurrentUserMovie({
    uId: userStore.uid,
    mId: movie.value.id,
    isWatched: false
  });
};

const addToWatched = async () => {
  await movieStore.createCurrentUserMovie({
    uId: userStore.uid,
    mId: movie.value.id,
    isWatched: true
  });
};
</script>



<template>
      <div class="movie-card">
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
                <th class="tg-0lax tg-size">{{ movie.releaseDate }}</th>
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
            <span class="on-list" v-if="isOnWatched">Na liście: obejrzane</span>
            <span class="on-list" v-else-if="isOnToWatch">Na liście: do obejrzenia</span>
            <div class="buttons">
            <div class="card-action-icon" aria-label="Note">+ 
              <img src="@/assets/img/watching-a-movie.png" alt="To Watch" @click="addToWatch"/>
            </div>
            <div class="card-action-icon" aria-label="Note">+
              <img src="@/assets/img/video.png" alt="To Watched" @click="addToWatched"/>
            </div>
            </div>
          </div>
        </div>
        <div class="lower-bar">
          <h2>Opis</h2>
          <div class="movie-description">
            <p>{{ movie.description }}</p>
          </div>
        </div> 
        
      </div>
</template>

<style scoped>
.on-list{
  font-size: 0.7em;
  font-weight: 600;
  color: var(--main-color);
}
.movie-card{
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

.buttons{
  display: flex;
}

.card-action-icon {
  display: flex;
  height: 4em;
  width: 4em;
  border-radius: 50%;
  padding: 10px;
  transition: .3s ease all;
  cursor: pointer;
  margin: .3rem;
  align-items: center;
  justify-content: center;
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
  width: 2rem;
  height: 2rem;
  object-fit: contain;
  margin-left: .2em;
}
</style>

