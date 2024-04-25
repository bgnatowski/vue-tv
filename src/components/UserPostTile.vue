<template>
    <div class="post">
    <div class="movie-card">
      <img class="movie-poster" src="https://static.posters.cz/image/1300/plakaty/diuna-czesc-1-i122815.jpg" alt="Movie poster for Diuna" />
      <div class="movie-details">
        <div class="movie-header">
          <h2 class="movie-title">Diuna</h2>
          <div class="dropdown">
              <div class="dropdown-btn"><img src="@/resources/dots.png" alt="" class="icon" /></div>
              <div class="dropdown-content">
                  <a href="#">Option 1</a>
                  <a href="#">Option 2</a>
                  <a href="#">Option 3</a>
              </div>
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
        <p class="text">Film świetny, ale końcówka do mnie nie przemawia. Tu nie powinno być happy endu. Kiedy Truman dociera do ściany jest świetna dramaturgia i bezradność. Gdyby w tamtym momencie skoczył do wody i popełnił samobójstwo zakończenie byłoby znacznie mocniejsze i ciekawsze. Truman stałby się prawdziwym bohaterem dramatycznym. Coś wielkiego.</p>
    </div>
</div>
  </template>
  
  <style scoped>
  .post{
    border-radius: 25px;
    box-shadow: 0px 4px 13px 3px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    margin: 10px;
    padding: .5rem;
    display: flex;
    flex-direction: column;
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
  .dropdown-btn {
      background-color: transparent;
      border-color: transparent;
      margin-right: 1em;
      height: 50px;
      width: 20px;
  }

  .dropdown-btn img {
    height: 100%;
    object-fit: contain;
  }
  .dropdown {
      position: relative;
      display: inline-block;
  }
.icon {
  margin-right: 0;
}
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    right: 0; 
    white-space: nowrap; 
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    width: 100%; 
    box-sizing: border-box; 
}

.dropdown:hover .dropdown-content {
    display: block;
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
    margin-top: 0;
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

  .text{
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
      margin-top: 1rem;
    }

    .movie-poster {
      aspect-ratio: auto;
      height: 100%;
      width: 9rem;
    }

    .movie-details,
    .movie-header,
    .movie-info {
      font-size: 10px;
      width: 100%; 
      margin-bottom: 0px; 
    }

    .post-text{
        margin-top: 1.5rem;
        padding-top: 1rem;
    }
  }
</style>

  