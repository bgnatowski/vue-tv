<script>

import movie from "@/models/movie.js";
import MovieDetailsPopup from "@/components/MovieDetailsPopup.vue";

export default {
  components: {MovieDetailsPopup},
  computed: {
    movie() {
      return movie
    }
  },
  data() {
    return {
      isPublic: false,
      isWatched: false,
      isInfoPopup: false
    };
  },
  methods: {
    publicMovie() {
      this.isPublic = !this.isPublic
    },
    showInfo() {
      this.isInfoPopup = !this.isInfoPopup
    }
  }
}

</script>

<template>
  <section class="post">
<!--    <MovieDetailsPopup v-if="isInfoPopup"></MovieDetailsPopup>-->
    <div class="movie-card">
      <div class="movie-poster">
        <img src="https://static.posters.cz/image/1300/plakaty/diuna-czesc-1-i122815.jpg"
             alt="Movie poster for Diuna"/>
      </div>
      <div class="movie-details">
        <div class="movie-text">
          <div class="movie-header">
            <h2 class="movie-title"> {{movie.title}} </h2>
          </div>
          <div class="movie-info">
            <div class="movie-metadata">
              <p class="movie-genre">Gatunek: {{movie.genre}}</p>
              <p class="movie-duration">Długość: {{movie.duration}}</p>
            </div>
          </div>
        </div>
        <div class="buttons">
          <div class="card-action-buttons">
            <div class="card-action-icon" v-if="isPublic" aria-label="Note">
              <img src="@/resources/recommend-icon.png" alt="Note icon"/>
            </div>
            <div class="card-action-icon" aria-label="Note">
              <img src="@/resources/edit-icon.png" alt="Note icon"/>
            </div>
            <div @click="showInfo" class="card-action-icon" aria-label="Info">
              <img src="@/resources/info-icon.png" alt="Info icon"/>
            </div>
            <div @click="publicMovie" class="card-action-icon" aria-label="Hide">
              <img src="@/resources/show-icon.png" v-if="isPublic" alt="Show icon"/>
              <img src="@/resources/hide-icon.png" v-else alt="Hide icon"/>
            </div>
          </div>
          <div class="movie-action-buttons">
            <div class="action-switch">
              <span>Obejrzany</span>
              <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.movie-card {
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 20px;
}

.movie-poster {
  width: 100px;
  height: 160px;
  margin: .2em;
}

.movie-poster img {
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
}

.movie-details {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
  gap: 20px;
}

.movie-text {
  display: flow;
}

.movie-header {
  display: flex;
  gap: 20px;
  font-size: 1.2em;
  color: #000;
  font-weight: 500;
}

.movie-info {
  display: flex;
  gap: 20px;
  font-size: 15px;
}

.movie-metadata {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  color: #000;
  font-weight: 400;
  text-align: left;
}

.movie-duration {
  margin-top: 5px;
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
}

.card-action-buttons {
  display: flex;
  align-content: flex-end;
  justify-content: flex-end;
  padding: .2em;
  gap: 5px;
}

.card-action-icon {
  height: 40px;
  width: 40px;
  border-radius: 2em;
  padding: .5em;
  transition: .5s ease all;
  cursor: pointer;
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
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.movie-action-buttons {
  display: flex;
  flex-direction: column;
  font-weight: 400;
  gap: 5px;
  transition: .5s ease all;
}

.action-switch {
  display: flex;
  justify-content: flex-end;
  gap: 5px;
}

.action-switch span {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

/*checkbox*/
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--lighter-main);
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}


.post-text p {
  margin: 2px;
  padding: 2px;
  text-align: justify;
}
</style>
  