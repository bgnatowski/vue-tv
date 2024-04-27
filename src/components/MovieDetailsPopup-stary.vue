<!--<script setup xmlns="http://www.w3.org/1999/html">-->
<!--import {ref} from "vue";-->
<!--import {defineProps, defineEmits} from "vue";-->

<!--// Pobieramy prop show i dane filmu-->
<!--const props = defineProps({-->
<!--  show: Boolean,-->
<!--  movie: Object-->
<!--});-->

<!--const emits = defineEmits(['close']);-->

<!--// Funkcja do emitowania zdarzenia zamknięcia popupa-->
<!--function closePopup() {-->
<!--  emits('close');-->
<!--}-->

<!--</script>-->
<!--<template>-->
<!--&lt;!&ndash;  <div :class="show ? 'show' : 'hide'" class="overlay">&ndash;&gt;-->
<!--    <section class="post">-->
<!--      <main class="movie-details">-->
<!--        <div class="close-button" @click="closePopup">-->
<!--          <img src="@/resources/close-icon.png" alt="Close icon"/>-->
<!--        </div>-->
<!--        <div class="movie-info">-->
<!--          <div class="movie-poster">-->
<!--            <img :src="movie.posterUrl" alt="Movie poster" class="poster-image"/>-->
<!--          </div>-->
<!--          <div class="movie-metadata">-->
<!--            <div class="metadata-header">-->
<!--              <h1 class="movie-title"> {{ movie.description }}</h1>-->
<!--            </div>-->
<!--            <div class="movie-specs">-->
<!--              Premiera: {{ movie.premiere }}<br/>-->
<!--              Długość: {{ movie.duration }}}<br/>-->
<!--              Gatunek: {{ movie.genre }}-->
<!--            </div>-->
<!--            <h2 class="description-title">Opis</h2>-->
<!--            <div class="movie-description">-->
<!--              <span> {{ movie.description }}</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </main>-->
<!--    </section>-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--</template>-->

<!--<style scoped>-->

<!--.show {-->
<!--  display: block;-->
<!--}-->

<!--.hide {-->
<!--  display: none;-->
<!--}-->

<!--.overlay {-->
<!--  position: fixed;-->
<!--  top: 0;-->
<!--  left: 0;-->

<!--  background-color: rgba(0, 0, 0, 0.7);-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--}-->

<!--.movie-details {-->
<!--  border-radius: 23px;-->
<!--  border: 5px solid rgba(156, 234, 239, 1);-->
<!--  background-color: #fff;-->
<!--  padding: 30px 32px 48px;-->
<!--  width: 80%;-->
<!--  max-width: 1200px;-->
<!--  scrollbar-width: none;-->
<!--}-->

<!--.movie-info {-->
<!--  display: flex;-->
<!--  gap: 20px;-->
<!--}-->

<!--.movie-poster {-->
<!--  width: 10%-->
<!--}-->

<!--.poster-image {-->
<!--  width: 100%;-->
<!--  box-shadow: 0px 4px 13.3px 3px rgba(0, 0, 0, 0.5);-->
<!--  margin: auto 0;-->
<!--  border-radius: 34px;-->
<!--}-->

<!--.movie-metadata {-->
<!--  margin-left: 20px;-->
<!--  max-height: 100%;-->
<!--  overflow-y: scroll;-->
<!--}-->

<!--.metadata-header {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  font-size: 24px;-->
<!--  color: #000;-->
<!--  font-weight: 600;-->
<!--}-->

<!--.close-button {-->
<!--  height: 40px;-->
<!--  width: 40px;-->
<!--  border-radius: 2em;-->
<!--  padding: .5em;-->
<!--  transition: .5s ease all;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.close-button img {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  object-fit: contain;-->
<!--}-->

<!--.close-button:hover {-->
<!--  background-color: var(&#45;&#45;lighter-main);-->
<!--  border: none;-->
<!--  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);-->
<!--}-->

<!--.close-button:active {-->
<!--  background-color: var(&#45;&#45;clicked-button);-->
<!--}-->

<!--.movie-title {-->
<!--  margin-top: 9px;-->
<!--  margin-bottom: 0;-->
<!--  font: 500 64px "Red Hat Display", sans-serif;-->
<!--  text-align: left;-->
<!--}-->

<!--.rating-image {-->
<!--  width: 123px;-->
<!--  margin-top: 32px;-->
<!--  max-width: 100%;-->
<!--}-->

<!--.movie-specs {-->
<!--  font-family: "Red Hat Display", sans-serif;-->
<!--  margin-top: 20px;-->
<!--  text-align: left;-->
<!--}-->

<!--.description-title {-->
<!--  margin-top: 20px;-->
<!--  text-align: left;-->
<!--}-->

<!--.movie-description {-->
<!--  text-align: justify;-->
<!--  font-family: "Red Hat Display", sans-serif;-->
<!--  margin-top: 18px;-->

<!--}-->

<!--.movie-description span {-->
<!--  font-size: 20px;-->
<!--}-->

<!--@media (max-width: 767px) {-->
<!--  .movie-details {-->
<!--    padding: 0 20px;-->
<!--    max-height: 90%;-->
<!--    overflow-y: scroll;-->
<!--  }-->

<!--  .movie-info {-->
<!--    flex-direction: column;-->
<!--  }-->

<!--  .movie-poster {-->
<!--    width: 100%;-->
<!--  }-->

<!--  .poster-image {-->
<!--    margin-top: 10px;-->
<!--  }-->

<!--  .movie-metadata {-->
<!--    width: 100%;-->
<!--    margin: auto;-->
<!--  }-->

<!--  .metadata-header {-->
<!--    max-width: 100%;-->
<!--  }-->

<!--  .movie-title {-->
<!--    max-width: 100%;-->
<!--    font-size: 40px;-->
<!--  }-->

<!--  .movie-specs {-->
<!--    max-width: 100%;-->
<!--  }-->

<!--  .description-title {-->
<!--    max-width: 100%;-->
<!--  }-->

<!--  .movie-description {-->
<!--    max-width: 100%;-->
<!--  }-->
<!--}-->
<!--</style>-->