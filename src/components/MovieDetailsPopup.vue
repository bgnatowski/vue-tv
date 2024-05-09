<script setup>
import RatingStars from "@/components/RatingStars.vue";
import {computed, ref} from "vue";
import {useMovieStore} from "@/stores/MovieStore.js";
import {formatISODate} from "@/js/TimeUtils.js";
import {useRouter} from "vue-router";

// ------------------------ STORES ------------------------------//
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
    <div class="post popup">
      <div class="upper-bar flex-column">
        <div class="movie-details">
          <div class="movie-poster">
            <img :src="movie.posterPath" alt="Movie poster"/>
          </div>
          <div class="rating flex-column">
            <RatingStars vertical class="rating" read-only :rating="movie.rating"></RatingStars>
          </div>
          <div class="info flex-column">
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
              <tr>
                <td class="tg-0pky tg-size">Ocena:</td>
                <td class="tg-0lax tg-size">{{ movie.rating }}</td>
              </tr>
              </tbody>
            </table>
            <span class="on-list" v-if="onWatched">Na liście: obejrzane</span>
            <span class="on-list" v-else-if="onToWatch">Na liście: do obejrzenia</span>
            <h2>Opis</h2>
            <p>{{ movie.description }}</p>
          </div>
        </div>
      </div>
      <div class="close-bar">
        <div class="icon-button" @click="closePopup">
          <img src="@/assets/img/close-icon.png" alt="Close icon"/>
        </div>
        <div class="dropdown">
          <div class="icon-button" @click="showDropdown">
            <img src="@/assets/img/dots-icon.png" alt="Movie Options"/>
          </div>
          <div v-if="isShowDropdown" class="dropdown-content" @mouseleave="hideDropdown">
            <ul class="dropdown-list">
              <li @click="goToMoviePage" class="dropdown-option">Zobacz strone filmu</li>
              <li @click="addToWatch" v-if="!(onToWatch || onWatched)" class="dropdown-option">Dodaj do obejrzenia</li>
              <li @click="addToWatched" v-if="!(onToWatch || onWatched)" class="dropdown-option">Dodaj do obejrzanych
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/dropdown.css);
@import url(@/assets/popup.css);


.popup {
  width: 70vw;
  height: 70vh;
}

.on-list {
  font-size: 0.7em;
  font-weight: 600;
  color: var(--main-color);
}

.movie-details {
  display: flex;
  padding-left: 15px;
  padding-top: 15px;
  width: auto;
  height: 100%;
}

.info {
  width: fit-content;
  margin-left: 5px;
  flex-grow: 1;
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

.rating {
  margin-left: 5px;
  overflow-x: hidden;
  height: min-content;
  flex-shrink: 0;
}

.movie-poster {
  width: auto;
  height: 330px;
}

.movie-poster img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 1.5em;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.50);
}

h2 {
  margin-top: 10px;
}

.flex-column {
  text-align: justify;
  text-justify: inter-word;
}

.upper-bar {
  height: 100%;
  overflow-y: auto;
  width: 100%
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

@media screen and (max-height: 800px) {
  .popup {
    width: 90vw;
    height: 90vh;
  }
}

@media screen and (max-width: 800px) {
  .popup {
    width: 90vw;
    height: 90vh;
  }

  .movie-poster {
    flex-shrink: 1;
    height: 285px;
    min-width: 40px;
  }

  .movie-details .movie-title {
    font-size: 1em;
  }

  h2 {
    font-size: 1em;
  }

  .tg-size {
    font-size: .8em;
  }

  p {
    font-size: .8em;
  }
}

@media screen and (max-width: 600px) {
  .movie-poster {
    height: 265px;
    min-width: 40px;
  }
}

@media screen and (max-width: 480px) {
  .movie-poster {
    height: 235px;
    min-width: 40px;
  }
}

@media screen and (max-width: 388px) {
  .movie-poster {
    height: 225px;
    min-width: 40px;
  }

  .movie-details .movie-title {
    font-size: 1em;
  }

  h2 {
    font-size: 1em;
  }

  .tg-size {
    font-size: .6em;
  }


  p {
    font-size: .6em;
  }
}

@media screen and (max-width: 330px) {
  .movie-poster,
  .rating {
    display: none
  }
}

</style>