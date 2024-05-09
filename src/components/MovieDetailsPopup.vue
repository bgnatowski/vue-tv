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
            <h2>Opis</h2>
            <div class="movie-description">
              <p>{{ movie.description }}</p>
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
              <li @click="addToWatched" v-if="!(onToWatch || onWatched)" class="dropdown-option">Dodaj do obejrzanych</li>
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

.rating {
  margin-left: 5px;
}

.movie-poster {
  display: flex;
  width: 150px;
  height: 280px;
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

.lower-bar h2 {
  margin-top: 10px;
}

.flex-column{
  text-align: justify;
  text-justify: inter-word;
  overflow-y: auto;
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


@media screen and (max-width: 1000px) {
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
  .movie-poster {
    width: 150px;
    height: 200px;
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