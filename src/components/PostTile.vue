<template>
  <div class="post">
    <div class="user-info">
      <div class="user-image">
        <img src="https://cdn-icons-png.flaticon.com/512/4715/4715330.png" alt="" class="user-profile-pic">
      </div>
      <p class="user-name">uzytkownik prowatcher123 polecił film:</p>
    </div>
    <div class="movie-card">
      <img class="movie-poster" src="https://static.posters.cz/image/1300/plakaty/diuna-czesc-1-i122815.jpg"
           alt="Movie poster for Diuna"/>
      <div class="movie-details">
        <div class="movie-header">
          <h2 class="movie-title">Diuna</h2>
          <div class="buttons">
            <button class="watched-button">Dodaj do "Filmy obejrzane"</button>
            <button class="towatch-button">Dodaj do "Filmy do obejrzenia"</button>
          </div>
        </div>
        <div class="movie-info">
          <div class="movie-metadata">
            <p class="movie-genre">Gatunek: Sci-Fi</p>
            <p class="movie-duration">Długość: 2h 04 min</p>
          </div>
        </div>
      </div>
    </div>
    <div class="post-text">
      <p class="text">Film świetny, ale końcówka do mnie nie przemawia. Tu nie powinno być happy endu. Kiedy Truman
        dociera do ściany jest świetna dramaturgia i bezradność. Gdyby w tamtym momencie skoczył do wody i popełnił
        samobójstwo zakończenie byłoby znacznie mocniejsze i ciekawsze. Truman stałby się prawdziwym bohaterem
        dramatycznym. Coś wielkiego.</p>
    </div>
  </div>
</template>

<style scoped>
.post {
  border-radius: 25px;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  margin: 10px;
  padding: .5rem 1rem .5rem 1rem;
  display: flex;
  flex-direction: column;
}

.user-info {
  display: flex;
  padding: .2rem;
  margin: 0;
  /* padding-top: 0; */
  /* justify-content: left; */
  align-items: center;
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
  height: 10rem;
  display: flex;
  gap: 20px;
}

.movie-poster {
  aspect-ratio: .7;
  object-fit: fill;
  height: 10rem;
  border-radius: 17px;
}

.movie-details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
}

.movie-header {
  display: flex;
  /* gap: 20px; */
  font-size: 20px;
  color: #000;
  font-weight: 500;
  justify-content: space-between;
  align-items: center;
}

.movie-title {
  font-family: Red Hat Display, sans-serif;
  margin: 0;
  padding-top: 0;
}

.movie-info {
  display: flex;
  align-items: start;
  gap: 20px;
  font-size: 15px;
  justify-content: space-between;
}

.movie-metadata {
  display: flex;
  flex-direction: column;
  color: #000;
  font-weight: 400;
  text-align: left;
}

.movie-genre,
.movie-duration {
  font-family: Red Hat Display, sans-serif;
  margin: 0;
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
}

.watched-button,
.towatch-button {
  font-family: Red Hat Display, sans-serif;
  border-radius: 36px;
  justify-content: center;
  padding: 11px 20px;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 15px;
}

.watched-button {
  background-color: #3dccc7;
}

.towatch-button {
  background-color: #3dccc7;
  margin-top: 9px;
}

.text {
  text-align: justify;
}

@media (max-width: 767px) {
  .post {
    padding-top: 0;
  }

  .movie-card {
    transition: 0.3s;
    flex-direction: column;
    align-items: center;
    padding-right: 0;
    gap: 5px;
    height: 15rem;
  }

  .movie-poster {
    aspect-ratio: auto;
    height: 100%;
    width: 9rem;
  }

  .movie-details,
  .movie-header,
  .movie-info,
  .watched-button,
  .towatch-button {
    font-size: 10px;
    width: 100%;
    margin-bottom: 0;
  }
  .watched-button,
  .towatch-button {
    padding: 2px 5px;
    margin: 2px;

  }

  .post-text {
    margin-top: 1.5rem;
    padding-top: 1rem;
  }
}
</style>
  