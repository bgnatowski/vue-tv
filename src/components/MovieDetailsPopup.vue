<script setup>
import RatingStars from "@/components/RatingStars.vue";
import {computed, ref} from "vue";
import {useUserStore} from "@/stores/UserStore.js";
import {useMovieStore} from "@/stores/MovieStore.js";
import {formatISODate} from "@/js/TimeUtils.js";
import {useRouter} from "vue-router";

// ------------------------ STORES ------------------------------//
const userStore = useUserStore();
const movieStore = useMovieStore();

// ------------------------ PROPS AND EMITS --------------------//
const props = defineProps({
  onWatched: Boolean,
  onToWatch: Boolean,
  movie: {
    id: '',
    title: '',
    genres: '',
    duration: '',
    releaseDate: '',
    posterPath: '',
    description: '',
    rating: '',
    voteCount: ''
  },
});

const emits = defineEmits(['close']);

function closePopup() {
  emits('close');
}

// ----------- DROPDOWN --------------//
const isShowDropdown = ref(false);
const showDropdown = () => {
  isShowDropdown.value = true;
};
const hideDropdown = () => {
  isShowDropdown.value = false;
};

// -------------- TO LISTS ---------- //
const addToWatch = async () => {
  let m = props.movie;
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

const formattedReleaseDate = computed(() => formatISODate(props.movie.releaseDate));

// ------------ TO MOVIE PAGE ---------//
const router = useRouter();
const goToMoviePage = () => {
  hideDropdown()
  closePopup()
  router.push({name: 'MovieDetails', params: {id: props.movie.id}});
}

</script>
<template>
  <div class="overlay">
    <div class="post">
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
            <span class="on-list" v-if="onWatched">Na liście: obejrzane</span>
            <span class="on-list" v-else-if="onToWatch">Na liście: do obejrzenia</span>
          </div>
        </div>
        <div class="lower-bar">
          <h2>Opis</h2>
          <div class="movie-description">
            <p>{{ movie.description }}</p>
          </div>
        </div>
      </div>
      <div class="close-bar">
        <div class="icon-button" @click="closePopup">
          <img src="@/assets/img/close-icon.png" alt="Close icon"/>
        </div>
        <div class="dropdown" v-if="!(onToWatch || onWatched)">
          <div class="icon-button" @click="showDropdown">
            <img src="@/assets/img/dots-icon.png" alt="Movie Options"/>
          </div>
          <div v-if="isShowDropdown" class="dropdown-content" @mouseleave="hideDropdown">
            <ul class="dropdown-list">
              <li @click="goToMoviePage" class="dropdown-option">Zobacz strone filmu</li>
              <li @click="addToWatch" class="dropdown-option">Dodaj do obejrzenia</li>
              <li @click="addToWatched" class="dropdown-option">Dodaj do obejrzanych</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/dropdown.css);
.on-list{
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
  top: 0;
  white-space: nowrap;
  z-index: 9;
  background-color: white;
  transition: .5s ease all;
}

.tg {
  width: fit-content;
  white-space: nowrap;;
}

.post {
  flex-direction: row;
  background-color: white;
  width: 90vw;
  height: 90vh;
  padding: 1em;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.rating {
  margin-left: 5px;
}

.movie-card {
  overflow-y: auto;
  scrollbar-width: thin;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 15px;
}

.upper-bar {
  display: flex;
  height: 50%;
  width: 100%;
}

.lower-bar {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
}

.close-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  widt: fit-content;
}

.icon-button {
  border-radius: 50%;
  padding: 5px;
}

.icon-button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.movie-details {
  display: flex;
  flex-direction: column;
  min-width: 50%;
  width: 100%;
  flex-grow: 0;
  flex-shrink: 1;

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
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 1.5em;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.50);
}

.icon-button:hover {
  background-color: var(--lighter-main);
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

.icon-button:active {
  background-color: var(--clicked-button);
}

.lower-bar h2 {
  margin-top: 10px;
}

.movie-description {
  text-align: justify;
  text-justify: inter-word;
}

.movie-details .movie-title {
  font-size: 1.5em;
}

.tg-size {
  font-size: 1em;
}

.movie-description p {
  font-size: 1em;
}

@media (min-width: 2000px) {
  .icon-button {
    border-radius: 2em;
    padding: 10px;
    width: 50px;
    height: 50px;
  }
}


@media screen and (max-width: 1000px) {
  .close-bar .icon-button {
    width: 30px;
    height: 30px;
  }

  .movie-details .movie-title {
    font-size: 1.2em;
  }

  .tg-size {
    font-size: 1em;
  }

  .movie-description p {
    font-size: 1em;
  }
}

@media screen and (max-width: 700px) {
  .lower-bar,
  .upper-bar {
    height: fit-content;
  }

  .movie-poster {
    width: 150px;
    height: 200px;
  }

  .close-bar .icon-button {
    width: 20px;
    height: 20px;
  }

  .movie-details .movie-title {
    font-size: 1em;
  }

  .tg-size {
    font-size: .7em;
  }

  .movie-description p {
    font-size: .7em;
  }
}

@media screen and (max-width: 400px) {
  .movie-poster {
    width: 100px;
    height: 200px;
  }
}

@media screen and (max-width: 360px) {
  .tg {
    white-space: break-spaces;
  }
}


@media screen and (max-width: 300px) {
  .movie-poster {
    display: none;
  }
}
</style>