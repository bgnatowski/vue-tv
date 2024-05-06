<script setup>
import {nextTick, onMounted, reactive, ref} from "vue";
import {sampleMovie} from "@/services/TVDBService.js";

const isShowDropdown = ref(false)

const props = defineProps({
      profile: Boolean
    }
)

function showDropdown() {
  isShowDropdown.value = true
}

function hideDropdown() {
  isShowDropdown.value = false;
}

const isDraggable = ref(false);
const postDescriptionRef = ref(null);

onMounted(async () => {
  await nextTick();
  if (postDescriptionRef.value.offsetHeight > 100) {
    isDraggable.value = true;
  }
});

const emit = defineEmits(['show-details']);

const movie = sampleMovie;
// ---------------------------POKAZANIE POPUPU ----------------//
const showDetails = () => {
  emit('show-details', movie);
  console.log('MovieTile: wyemitowano show details', movie);
}

const post = reactive({
  content: "Film świetny, ale końcówka do mnie nie przemawia. Tu nie powinno być happy endu. Kiedy Truman\n" +
      "          dociera do ściany jest świetna dramaturgia i bezradność. Gdyby w tamtym momencie skoczył do wody i popełnił\n" +
      "          samobójstwo zakończenie byłoby znacznie mocniejsze i ciekawsze. Truman stałby się prawdziwym bohaterem\n" +
      "          dramatycznym. Coś wielkiegoFilm świetny, ale końcówka do mnie nie przemawia. Tu nie powinno być happy endu. Kiedy Truman\n" +
      "          dociera do ściany jest świetna dramaturgia i bezradność. Gdyby w tamtym momencie skoczył do wody i popełnił\n" +
      "          samobójstwo zakończenie byłoby znacznie mocniejsze i ciekawsze. Truman stałby się prawdziwym bohaterem\n" +
      "          dramatycznym. Coś wielkiego."
})

</script>

<template>
  <div class="post">
    <div class="upper-bar">
      <div class="user-info">
        <div class="user-image">
          <img src="https://cdn-icons-png.flaticon.com/512/4715/4715330.png" alt="" class="user-profile-pic">
        </div>
        <p v-if="!profile" class="user-name">uzytkownik prowatcher123 polecił film:</p>
        <p v-else class="user-name">Poleciłeś film:</p>
      </div>
      <div class="dropdown">
        <div class="icon-button" @click="showDropdown">
          <img src="@/assets/img/dots-icon.png" alt="Movie Options"/>
        </div>
        <div v-if="isShowDropdown" class="dropdown-content" @mouseleave="hideDropdown">
          <ul class="dropdown-list">
            <li @click="showDetails" class="dropdown-option">Więcej o filmie</li>
            <li v-if="!profile" class="dropdown-option">Dodaj do obejrzenia (jesli nie jest jeszcze obejrzany)</li>
            <li v-else class="dropdown-option">Usuń post</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="movie-card">
      <div class="movie-poster">
        <img :src="movie.posterPath"
             alt="Movie poster for Diuna"/>
      </div>
      <div class="movie-details">
        <h1 class="movie-title">{{movie.title}}</h1>
        <div>
          <table class="tg">
            <thead>
            <tr>
              <th class="tg-0pky tg-size">Gatunki:</th>
              <th class="tg-0lax tg-size">{{movie.genres.map((genre) => genre.name).join(", ")}}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="tg-0pky tg-size">Długość:</td>
              <td class="tg-0lax tg-size">{{ movie.duration }} min</td>
            </tr>
            </tbody>
          </table>
        </div>
        <p class="post-description" ref="postDescriptionRef" v-dragscroll="isDraggable"> {{post.content}}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/dropdown.css);
.dropdown {
  position: sticky;
  z-index: 9;
  transition: .5s ease all;
}

.dropdown-content {
  position: absolute;
  right: 0;
  top: unset;
  white-space: nowrap;
  z-index: 9;
  background-color: white;
  transition: .5s ease all;
}

.user-info {
  display: flex;
  padding: .2rem;
  justify-content: flex-start;
  align-content: flex-start;
}

.user-info p {
  justify-content: center;
  align-content: center;
  font-size: .8em;
}

.upper-bar {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.user-image {
  display: flex;
  height: 35px;
  width: 35px;
  align-content: center;
  justify-content: center;
  margin: auto 1em auto 0;
}

.movie-card {
  display: flex;
  height: 100%;
  justify-content: space-between;
}

.movie-poster {
  width: 200px;
  height: auto;
  object-fit: cover;
  margin-right: 10px;
}

.movie-poster img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 1.5em;
}

.movie-details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}

.movie-title {
  color: #000;
  font-size: 1em;
}

.movie-details .post-description {
  text-align: justify;
  text-justify: inter-word;
  overflow-y: auto;
  scrollbar-width: thin;
  hyphens: auto;
  max-height: 150px;
  font-size: .8em;
}

.tg-size{
  font-size: .7em;
}


@media screen and (max-width: 728px) {
  .movie-poster {
    width: 100px;
    height: auto;
    object-fit: cover;
  }
}

@media screen and (max-width: 350px) {
  .movie-poster{
    display: none;
  }
}

</style>

