<script setup>

import movie from "@/models/movie.js";
</script>

<template>
  <div class="overlay">
    <main class="movie-details">
      <div class="close-button">
        <div class="close-button">
          <img src="@/resources/close-icon.png" alt="Close icon"/>
        </div>
      </div>
      <div class="movie-info">
        <div class="movie-poster">
          <img :src="movie.posterUrl" alt="Movie poster" class="poster-image"/>
        </div>
        <div class="movie-metadata">
          <div class="metadata-header">
            <h1 class="movie-title"> {{ movie.description }}</h1>
          </div>
          <div class="movie-specs">
            Premiera: {{ movie.premiere }}<br/>
            Długość: {{ movie.duration }}}<br/>
            Gatunek: {{ movie.genre }}
          </div>
          <h2 class="description-title">Opis</h2>
          <div class="movie-description">
          <span> {{movie.description}}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
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
}

.movie-details {
  border-radius: 23px;
  border: 5px solid rgba(156, 234, 239, 1);
  background-color: #fff;
  padding: 30px 32px 48px;
  width: 80%;
  max-width: 1200px;
  scrollbar-width: none;
}

.movie-info {
  display: flex;
  gap: 20px;
}

.movie-poster {
  width: 39%;
}

.poster-image {
  aspect-ratio: 0.67;
  width: 100%;
  box-shadow: 0px 4px 13.3px 3px rgba(0, 0, 0, 0.5);
  margin: auto 0;
  border-radius: 34px;
}

.movie-metadata {
  width: 61%;
  margin-left: 20px;
  max-height: 100%;
  overflow-y: scroll;
}

.metadata-header {
  display: flex;
  flex-direction: column;
  font-size: 24px;
  color: #000;
  font-weight: 600;
}

.close-button {
  height: 40px;
  width: 40px;
  border-radius: 2em;
  padding: .5em;
  transition: .5s ease all;
  cursor: pointer;
}

.close-button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.close-button:hover {
  background-color: var(--lighter-main);
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

.close-button:active {
  background-color: var(--clicked-button);
}

.movie-title {
  margin-top: 9px;
  margin-bottom: 0;
  font: 500 64px "Red Hat Display", sans-serif;
  text-align: left;
}

.rating-image {
  width: 123px;
  margin-top: 32px;
  max-width: 100%;
}

.movie-specs {
  font-family: "Red Hat Display", sans-serif;
  margin-top: 20px;
  text-align: left;
}

.description-title {
  margin-top: 20px;
  font: 700 32px "Red Hat Display", sans-serif;
  text-align: left;
}

.movie-description {
  text-align: justify;
  font-family: "Red Hat Display", sans-serif;
  margin-top: 18px;
}

@media (max-width: 767px) {
  .movie-details {
    padding: 0 20px;
    max-height: 90%;
    overflow-y: scroll;
  }

  .movie-info {
    flex-direction: column;
  }

  .movie-poster {
    width: 100%;
  }

  .poster-image {
    margin-top: 10px;
  }

  .movie-metadata {
    width: 100%;
    margin: auto;
  }

  .metadata-header {
    max-width: 100%;
  }

  .movie-title {
    max-width: 100%;
    font-size: 40px;
  }

  .movie-specs {
    max-width: 100%;
  }

  .description-title {
    max-width: 100%;
  }

  .movie-description {
    max-width: 100%;
  }
}
</style>