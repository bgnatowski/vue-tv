<script setup>
import RatingStars from "@/components/RatingStars.vue";

const props = defineProps({
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
  }
});

const emits = defineEmits(['close']);
function closePopup() {
  emits('close');
}

</script>
<template>
  <div class="overlay">
    <div class="post">
      <div class="movie-card">
        <div class="close-bar">
          <div class="icon-button" @click="closePopup">
            <img src="@/assets/img/close-icon.png" alt="Close icon"/>
          </div>
        </div>
        <div class="upper-bar">
          <div class="movie-poster">
            <img :src="movie.posterPath" alt="Movie poster"/>
          </div>
          <div class="movie-details">
            <h1 class="movie-title">{{movie.title}}</h1>
            <div class="table">
              <div class="column-1">
                <p>Premiera:</p>
                <p>Gatunki:</p>
                <p>Długość:</p>
                <p>Ilość ocen:</p>
              </div>
              <div class="column-2">
                <p>{{ movie.releaseDate }}</p>
                <p>{{ movie.genres.map((genre) => genre.name).join(", ") }}</p>
                <p>{{ movie.duration }}</p>
                <p>{{ movie.voteCount }}</p>
              </div>
            </div>
            <RatingStars read-only :rating="movie.rating"></RatingStars>
          </div>
        </div>
        <div class="lower-bar">
          <h2>Opis</h2>
          <div class="movie-description">
            <p v-text="movie.description" v-dragscroll="true"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post {
  flex-direction: row;
  background-color: white;
  width: 80vw;
  height: 80vh;
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

.movie-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: .5em;
}

.upper-bar {
  display: flex;
  min-height: 40%;
  max-height: 40%;
  width: 100%;
}

.lower-bar {
  display: flex;
  flex-direction: column;
  min-height: 40%;
  max-height: 40%;
  width: 100%;
}

.close-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-height: 10%;
  width: 100%;
}

.icon-button {
  border-radius: 2em;
  padding: 10px;
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
  gap: .3rem;
  max-height: fit-content;
  overflow-y: auto;
}

.movie-poster {
  display: flex;
  width: auto;
  height: 100%;
  margin-right: 1em;
}

.movie-poster img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 1.5em;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.50);
}

.movie-card .icon-button:hover {
  background-color: var(--lighter-main);
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

.movie-card .icon-button:active {
  background-color: var(--clicked-button);
}

.lower-bar h2 {
  margin-top: 10px;
}

.movie-description {
  text-align: justify;
  text-justify: inter-word;
  overflow-y: auto;
  scrollbar-width: thin;
  min-height: fit-content;
}

.movie-details .movie-title {
  font-size: 2em;
}

.table {
  display: flex;
  flex-direction: row;
  white-space: nowrap;
}

.table p {
  font-size: 1em;
}

.table .column-1 {
  font-weight: 600;
  margin-right: 5px;
}

@media (min-width: 2000px){
  .icon-button {
    border-radius: 2em;
    padding: 10px;
    width: 50px;
    height: 50px;
  }
}


@media screen and (max-width: 737px) {
  .movie-details .movie-title {
    font-size: 1.2em;
  }

  .movie-description p,
  .table p {
    font-size: .8em;
  }
}

@media screen and (max-width: 300px)  {
  .movie-poster {
    display: none;
  }

  .lower-bar,
  .upper-bar{
    min-height: auto;
  }

  .movie-details .movie-title {
    font-size: 1em;
  }

  .movie-description p,
  .table p {
    font-size: .5em;
  }
}
</style>