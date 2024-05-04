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
    <div class="upper-bar" v-if="!profile">
      <div class="user-info">
        <div class="user-image">
          <img src="https://cdn-icons-png.flaticon.com/512/4715/4715330.png" alt="" class="user-profile-pic">
        </div>
        <p class="user-name">uzytkownik prowatcher123 polecił film:</p>
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
              <th class="tg-0pky">Gatunki:</th>
              <th class="tg-0lax">{{movie.genres.map((genre) => genre.name).join(", ")}}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="tg-0pky">Długość:</td>
              <td class="tg-0lax">{{ movie.duration }} min</td>
            </tr>
            </tbody>
          </table>
        </div>
        <p class="post-description" ref="postDescriptionRef" v-dragscroll="isDraggable"> {{post.content}}
        </p>
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
  </div>
</template>

<style scoped>
@import url(@/assets/dropdown.css);
.user-info {
  display: flex;
  padding: .2rem;
  justify-content: flex-start;
  align-content: flex-start;
}

.user-info p {
  justify-content: center;
  align-content: center;
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
  gap: 20px;
  height: 100%;
  position: relative;
}

.movie-poster {
  width: 300px;
  height:100%;
  margin: .2em;
  aspect-ratio: 0.7;
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
  margin: 0.5em 0;
  padding: 0.5em 0;
  width: 100%;
  gap: 10px;
}

.movie-title {
  color: #000;
  font-size: 2em;
}

.movie-details .post-description {
  text-align: justify;
  text-justify: inter-word;
  overflow-y: auto;
  scrollbar-width: thin;
  hyphens: auto;
  max-height: 150px;
}

.dropdown-content {
  position: absolute;
  right: 0;
  top: 0; /* Aby dropdown rozkładał się bezpośrednio pod ikoną */
  white-space: nowrap; /* Zapobiega zawijaniu tekstu */
  z-index: 9999; /* Zapewnia, że dropdown będzie na wierzchu */
  background-color: white; /* Tło dla lepszej widoczności */
}

@media screen and (max-width: 728px) {
  .movie-poster{
    display: none;
  }
  .movie-card {
    flex-direction: column;
  }
}

</style>

