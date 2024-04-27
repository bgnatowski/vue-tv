<script setup>
import {ref} from "vue";
import movie from "@/models/movie";
import RatingStars from "@/components/RatingStars.vue";

const isShowDropdown = ref(false)
const isShowButton = ref(true)

const props = defineProps({
      show: Boolean = true,
      movie: Object
    }
)

function showDropdown() {
  isShowDropdown.value = true
  isShowButton.value = false;
}

function hideDropdown() {
  isShowDropdown.value = false;
  isShowButton.value = true;
}

const emits = defineEmits(['close']);

// Funkcja do emitowania zdarzenia zamknięcia popupa
function closePopup() {
  emits('close');
}

</script>
<template>
  <div :class="show ? 'show' : 'hide'" class="overlay">
    <div class="post">
      <div class="movie-card">
        <div class="movie-poster">
          <img :src="movie.posterUrl" alt="Movie poster for Diuna"/>
        </div>
        <div class="movie-details">
          <h1 class="movie-title">Diuna</h1>
          <RatingStars read-only="true"></RatingStars>
          <RatingStars></RatingStars>
          <div>
            <table class="tg">
              <thead>
              <tr>
                <td class="tg-0pky">Premiera:</td>
                <td class="tg-0lax">{{ movie.premiere }}</td>
              </tr>
              <tr>
                <th class="tg-0pky">Gatunek:</th>
                <th class="tg-0lax">{{ movie.genre }}</th>
              </tr>
              <tr>
                <td class="tg-0pky">Długość:</td>
                <td class="tg-0lax">{{ movie.duration }}</td>
              </tr>
              </thead>
            </table>
          </div>
          <h2>Opis</h2>
          <p v-text="movie.description" v-dragscroll>
          </p>
        </div>
        <!--        jesli bedzie potrzebne>-->
        <!--        <div class="dropdown" @mouseover="showDropdown" @mouseleave="hideDropdown">-->
        <!--          <div class="dropdown-options-icon" v-if="isShowButton">-->
        <!--            <img src="@/resources/dots-icon.png" alt="Movie Options"/>-->
        <!--          </div>-->
        <!--          <div v-if="isShowDropdown" class="dropdown-content">-->
        <!--            <ul class="dropdown-list">-->
        <!--              <li class="dropdown-option">Wszystkie informacje</li>-->
        <!--              <li class="dropdown-option">2 opcja</li>-->
        <!--            </ul>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="close-button" @click="closePopup">
          <img src="@/assets/close-icon.png" alt="Close icon"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ratings {
  display: flex;
  flex-direction: row;
}

.post {
  background-color: white;
  width: 70%;
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
  z-index: 999;
}

/*.show {*/
/*  display: block;*/
/*}*/

/*.hide {*/
/*  display: none;*/
/*}*/

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
  height: 100%;
  min-width: 50px;
  min-height: 100px;
  max-width: 300px;
  max-height: 600px;
  margin: .2em;
  aspect-ratio: 0.7;

}

.movie-poster img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 1.5em;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.50);
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

.movie-details p {
  text-align: justify;
  text-justify: inter-word;
  overflow-y: auto;
  scrollbar-width: thin;
  hyphens: auto;
}

/*------dropdown----*/
.close-button:hover {
  background-color: var(--lighter-main);
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

.close-button:active {
  background-color: var(--clicked-button);
}

.close-button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.close-button {
  height: 50px;
  width: 50px;
  border-radius: 2em;
  padding: .8em;
  transition: .5s ease all;
  cursor: pointer;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  transition: .5s ease all;
}

.dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  transition: .5s ease all;
}


.dropdown-content {
  transition: .5s ease all;
  position: static;
  background-color: #f9f9f9;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  border-radius: 1.2em;
  padding: .5em;
  font-size: .8em;
}

.dropdown-list {
  list-style-type: none;
  cursor: pointer;
  flex-direction: column;
  color: #000;
  padding: .2em .5em;
  border-radius: 1.2em;
}

.dropdown-option {
  font-size: 1.2em;
  padding: .5em 1em;
  border-radius: 1.2em;
}

.dropdown-options-icon {
  height: 50px;
  width: 50px;
  border-radius: 2em;
  padding: .8em;
  transition: .5s ease all;
  cursor: pointer;
}

.dropdown-option:hover {
  background-color: var(--lighter-main);
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

.dropdown-option:active {
  background-color: var(--clicked-button);
}

.dropdown-options-icon:hover {
  background-color: var(--lighter-main);
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

.dropdown-options-icon:active {
  background-color: var(--clicked-button);
}

.dropdown-options-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.tg {
  border: none;
  border-collapse: collapse;
}

.tg td {
  overflow: hidden;
  word-break: normal;
}

.tg th {
  font-weight: normal;
  overflow: hidden;
  word-break: normal;
  padding: 5px 0;
}

.tg .tg-0pky {
  border-color: inherit;
  text-align: left;
  vertical-align: top;
}

.tg .tg-0lax {
  text-align: left;
  padding: 0 5px;
}


@media (max-width: 979px) {
  .post {
    height: 50rem;
    min-width: 50%;
    overflow-y: scroll;
  }

  .movie-card {
    flex-direction: column;
  }

  .movie-poster {
    margin: auto;
    min-height: 25rem;
  }
}

</style>