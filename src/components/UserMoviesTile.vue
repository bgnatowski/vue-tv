<script setup>

const props = defineProps({
  tileType: String,
  movieList: String,
})

</script>

<template>
  <div class="post">
    <div class="movies">
      <div class="movie-poster">
        <img src="https://static.posters.cz/image/1300/plakaty/diuna-czesc-1-i122815.jpg"
             alt="Movie poster for Diuna"/>
      </div>
      <div class="movie-poster">
        <img src="https://static.posters.cz/image/1300/plakaty/diuna-czesc-1-i122815.jpg"
             alt="Movie poster for Diuna"/>
      </div>
      <div class="movie-poster">
        <img src="https://static.posters.cz/image/1300/plakaty/diuna-czesc-1-i122815.jpg"
             alt="Movie poster for Diuna"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post {
  overflow-x: hidden;
  width: 100%;
  padding: .5em 1em;
}

.post h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
  font-size: 1.2em;
  font-family: "Bruno Ace SC", sans-serif;
  white-space: nowrap;
  align-self: center;
}

.movies {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  justify-content: center;
}

.movies::-webkit-scrollbar {
  display: none;
}

.movie-poster {
  padding: 0 .2em;
}

.movie-poster img {
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-radius: 1.2em;
}

</style>

  