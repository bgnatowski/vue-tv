<template>
  <div class="post">
    <div class="user-info">
      <div class="user-image">
        <img src="https://cdn-icons-png.flaticon.com/512/4715/4715330.png" alt="" class="user-profile-pic">
      </div>
      <p class="user-name">uzytkownik prowatcher123 polecił film:</p>
    </div>
    <div class="movie-card">
      <div class="movie-poster">
        <img src="https://static.posters.cz/image/1300/plakaty/diuna-czesc-1-i122815.jpg"
             alt="Movie poster for Diuna"/>
      </div>
      <div class="movie-details">
        <div class="movie-text">
          <div class="movie-header">
            <h2 class="movie-title">Diuna</h2>
          </div>
          <div class="movie-info">
            <div class="movie-metadata">
              <p class="movie-genre">Gatunek: Sci-Fi</p>
              <p class="movie-duration">Długość: 2h 04 min</p>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button class="watched-button">Dodaj do "Filmy obejrzane"</button>
          <button class="towatch-button">Dodaj do "Filmy do obejrzenia"</button>
        </div>
      </div>
    </div>
    <div class="post-text">
      <p>Film świetny, ale końcówka do mnie nie przemawia. Tu nie powinno być happy endu. Kiedy Truman
        dociera do ściany jest świetna dramaturgia i bezradność. Gdyby w tamtym momencie skoczył do wody i popełnił
        samobójstwo zakończenie byłoby znacznie mocniejsze i ciekawsze. Truman stałby się prawdziwym bohaterem
        dramatycznym. Coś wielkiego.</p>
    </div>
  </div>
</template>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  border-radius: 2em;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  margin: .5em;
  padding: .5rem 1rem .5rem 1rem;
}

.user-info {
  display: flex;
  padding: .2rem;
  justify-content: flex-start;
  align-content: center;
}

.user-info p {
  justify-content: center;
  align-content: center;
}

.user-image {
  display: flex;
  height: 35px;
  width: 35px;
  align-content: center;
  justify-content: center;
  margin-right: 1em;
}

.icon-div img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

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
  color: #fff;
  font-weight: 600;
  text-align: center;
  gap: 5px;
}

.watched-button,
.towatch-button {
  border-radius: 3em;
  justify-content: center;
  padding: 1rem 1rem;
  border: none;
  cursor: pointer;
  color: white;
  font-size: .8em;
  background-color: var(--main-color);
}

.watched-button:hover,
.towatch-button:hover {
  background-color: var(--lighter-main);
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

.watched-button:active,
.towatch-button:active {
  background-color: var(--clicked-button);
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

.post-text p {
  margin: 2px;
  padding: 2px;
  text-align: justify;
}

@media (max-width: 979px) {
  .movie-card {
    transition: .5s ease all;
  }

  .movie-duration {
    margin-top: 2px;
  }

  .movie-poster {
    width: 50px;
    height: 100px;
    margin: .2em;
  }

  .movie-details,
  .movie-header,
  .movie-info,
  .watched-button,
  .towatch-button,
  .post-text {
    font-size: .9em;
    width: 100%;
  }
}

@media (max-width: 561px) {
  .movie-poster {
    display: none;
  }

  .user-info {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    text-align: left;
  }

  .user-image {
    margin: 2px;
  }

  .movie-details {
    gap: 0;
    padding: 2px;
    margin: 2px;
  }

  .movie-details,
  .movie-header,
  .movie-info,
  .watched-button,
  .towatch-button,
  .post-text {
    font-size: .9em;
    width: 100%;
  }

  .watched-button,
  .towatch-button {
    padding: 6px;
  }
}

@media (max-width: 450px) {
  .user-info {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    text-align: left;
  }

  .user-image {
    margin: 2px;
  }

  .movie-details {
    gap: 0;
    padding: 2px;
    margin: 2px;
  }

  .movie-details,
  .movie-header,
  .movie-info,
  .watched-button,
  .towatch-button,
  .user-info,
  .post-text{
    font-size: .75em;
    width: 100%;
  }

  .watched-button,
  .towatch-button {
    padding: 4px;
  }
}
</style>
<script setup>
</script>