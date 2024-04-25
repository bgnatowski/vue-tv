<script setup>

    const props = defineProps({
        tileType: String,
        movieList: String,
    })

</script>

<template>
    <div class="post">
      <h2>{{props.tileType}}</h2>
      <div class="movies">
        <img class="movie-poster" src="https://static.posters.cz/image/1300/plakaty/diuna-czesc-1-i122815.jpg" alt="Movie poster for Diuna" />
        <img class="movie-poster" src="https://static.posters.cz/image/1300/plakaty/diuna-czesc-1-i122815.jpg" alt="Movie poster for Diuna" />
        <img class="movie-poster" src="https://static.posters.cz/image/1300/plakaty/diuna-czesc-1-i122815.jpg" alt="Movie poster for Diuna" />
      </div>
</div>
  </template>
  
  <style scoped>
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  .post{
    border-radius: 25px;
    box-shadow: 0px 4px 13px 3px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    margin: 10px;
    padding: .5rem;
    display: flex;
    flex-direction: column;
  }

  .movies {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }
  .movie-poster {
    object-fit: cover;
    aspect-ratio: .7;
    object-fit: fill;
    height: 11.5rem;
    border-radius: 17px;
  }
  @media (max-width: 767px) {
    .movie-poster {
    height: 8.3rem;
  }
  }
</style>

  