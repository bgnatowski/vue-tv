<script setup>

const props = defineProps({
  tileType: String,
  movieList: String,
})

</script>

<template>
  <div class="post">
    <h2>{{ props.tileType }}</h2>
    <div class="movies" v-dragscroll.x>
      <div class="movie-poster">
        <img  src="https://static.posters.cz/image/1300/plakaty/diuna-czesc-1-i122815.jpg"
              alt="Movie poster for Diuna"/>
      </div>
      <div class="movie-poster">
        <img  src="https://static.posters.cz/image/1300/plakaty/diuna-czesc-1-i122815.jpg"
              alt="Movie poster for Diuna"/>
      </div>
      <div class="movie-poster">
        <img  src="https://static.posters.cz/image/1300/plakaty/diuna-czesc-1-i122815.jpg"
              alt="Movie poster for Diuna"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post {
}
.post h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
  font-size: 1.2em;
  font-family: "Bruno Ace SC", sans-serif;
}

.movies {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.movies::-webkit-scrollbar {
  display: none;
}

.movie-poster {
  height: 200px;
  margin: .2em;
}

.movie-poster img {
  height: 100%;
  object-fit: fill;
  border-radius: 12px;
}

/*@media(max-width: 767px){*/
/*  .movies {*/
/*    display: flex;*/
/*    flex-direction: column;*/
/*    justify-content: center;*/
/*    align-content: center;*/
/*    width: auto;*/
/*    margin: auto;*/
/*  }*/
/*}*/

</style>

  