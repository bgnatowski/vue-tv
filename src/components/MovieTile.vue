<template>
    <div class="movie-card">
      <img class="movie-poster" src="https://static.posters.cz/image/1300/plakaty/diuna-czesc-1-i122815.jpg" alt="Movie poster for Diuna" />
      <div class="movie-details">
        <div class="movie-header">
          <h2 class="movie-title">Diuna</h2>
          <div class="buttons">
            <button class="icon-button" aria-label="Wride note">
              <img src="@/resources/edit.png" alt="Note icon" class="icon" />
            </button>
            <button class="icon-button" aria-label="Info">
              <img src="@/resources/info.png" alt="Info icon" class="icon" />
            </button>
            <button class="icon-button" aria-label="Hide">
              <img src="@/resources/hide.png" alt="Hide icon" class="icon" />
            </button>
          </div>
        </div>
        <div class="movie-info">
          <div class="movie-metadata">
            <p class="movie-genre">Gatunek: Sci-Fi</p>
            <p class="movie-duration">Długość: 2h 04 min</p>
          </div>
          <div class="movie-actions">
            <button class="watched-button">Obejrzany</button>
            <button class="remove-button">Usuń</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .movie-card {
    border-radius: 25px;
    box-shadow: 0px 4px 13px 3px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    display: flex;
    gap: 20px;
    padding: 8px 8px;
    margin: 10px;
    height: 14rem;
  }

  .movie-poster {
    aspect-ratio: 0.68;
    object-fit: cover;
    width: 172px;
    max-width: 100%;
    height: 100%;
    border-radius: 17px;
  }

  .movie-details {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    margin: 1vh 0;
    margin-bottom: 0;
  }

  .movie-header {
    display: flex;
    gap: 20px;
    font-size: 30px;
    color: #000;
    font-weight: 500;
    justify-content: space-between;
    align-items: center;
  }

  .movie-title {
    font-family: Red Hat Display, sans-serif;
    margin: 0;
  }

  .icon-button {
    align-self: end;
    background: none;
    border: none;
    cursor: pointer;
    margin: auto 0;
    padding: 0;
  }

  .icon {
    aspect-ratio: 1;
    object-fit: contain;
    width: 34px;
  }

  .movie-info {
    display: flex;
    margin-top: 25px;
    align-items: start;
    gap: 20px;
    font-size: 20px;
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

  .movie-actions {
    display: flex;
    flex-direction: column;
    color: #fff;
    font-weight: 600;
    text-align: center;
  }

  .watched-button,
  .remove-button {
    font-family: Red Hat Display, sans-serif;
    border-radius: 36px;
    justify-content: center;
    padding: 22px 40px;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 15px;
  }

  .watched-button {
    background-color: #3dccc7;
  }

  .remove-button {
    background-color: #cc3d3d;
    margin-top: 9px;
  }

  @media (max-width: 767px) {
    .movie-card {
      transition: 0.3s;
      flex-direction: column; 
      align-items: center; 
      padding-right: 0;
      gap: 5px;
      height: 20rem;
      padding: 25px;
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
    .remove-button {
      font-size: 10px;
      width: 100%; 
      margin-bottom: 0px; 
    }

    .icon {
      width: 15px;
    }

    .watched-button,
    .remove-button {
      padding: 2px 5px;
      margin: 2px;
      
    }
  }
</style>
  