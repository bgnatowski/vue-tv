<script setup>

import {ref} from "vue";

const isShowDropdown = ref(false)
const isWatched = ref(false)

function showDropdown() {
  isShowDropdown.value = true;
}

function hideDropdown() {
  isShowDropdown.value = false;
}

</script>

<template>
  <section class="post">
    <div class="post-card">
      <div class="upper-bar">
        <div class="user-info">
          <div class="user-image">
            <img src="https://cdn-icons-png.flaticon.com/512/4715/4715330.png" alt="" class="user-profile-pic">
          </div>
          <p class="user-name">uzytkownik prowatcher123 polecił film:</p>
        </div>
        <div class="dropdown" @mouseover="showDropdown" @mouseleave="hideDropdown">
          <div class="dropdown-options-icon">
            <img src="@/resources/dots-icon.png" alt="Movie Options"/>
          </div>
          <div v-if="isShowDropdown" class="dropdown-content">
            <a href="#">Opis filmu</a>
            <a href="#" v-if="!isWatched">Dodaj do zobaczenia</a>
          </div>
        </div>
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
        </div>
      </div>
      <div class="post-text">
        <p>Film świetny, ale końcówka do mnie nie przemawia. Tu nie powinno być happy endu. Kiedy Truman
          dociera do ściany jest świetna dramaturgia i bezradność. Gdyby w tamtym momencie skoczył do wody i popełnił
          samobójstwo zakończenie byłoby znacznie mocniejsze i ciekawsze. Truman stałby się prawdziwym bohaterem
          dramatycznym. Coś wielkiego.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.post-card {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
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

.post-text p {
  margin: 2px;
  padding: 2px;
  text-align: justify;
}

.dropdown {
  display: flex;
  align-content: flex-end;
  justify-content: flex-end;
  padding: .2em;
  gap: 5px;
  transition: .5s ease all;
}

.dropdown-options-icon {
  height: 40px;
  width: 40px;
  border-radius: 2em;
  padding: .5em;
  transition: .5s ease all;
  cursor: pointer;
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

.dropdown-content {
  transition: .5s ease all;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  white-space: nowrap;
  border-radius: 1.2em;
  padding: .5em;
}

.dropdown-content a {
  display: flex;
  flex-direction: column;
  color: #000;
  padding: 1em 2em;
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  border-radius: 1.2em;
}

.dropdown-content a:hover {
  background-color: var(--lighter-main);
}

.dropdown .dropdown-content {
  display: block;
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
  .post-text
  .dropdown
  .dropdown-options-icon
  .dropdown-content
  .dropdown-content a{
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
  .post-text {
    font-size: .9em;
    width: 100%;
  }

  .dropdown-content a {
    padding: .5em 1em;
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
  .user-info,
  .post-text
  .dropdown-options-icon
  .dropdown-content
  .dropdown-content a {
    font-size: .75em;
    width: 100%;
  }
}
</style>
