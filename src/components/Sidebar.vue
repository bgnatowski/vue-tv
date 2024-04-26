<script setup>
import paths from "@/router/routerPaths.js";</script>
<template>
  <div class="sidebar">
    <router-link :to="paths.MAIN_ROUTE" class="router-link-custom">
      <div class="sidebar-button">
        <div class="icon-button">
          <img src="../resources/main.png" alt="Strona główna">
        </div>
        <span class="button-text">Strona główna</span>
      </div>
    </router-link>
    <router-link :to="paths.WATCHED_ROUTE" class="router-link-custom">
      <div class="sidebar-button">
        <div class="icon-button">
          <img src="@/resources/video.png" alt="Filmy obejrzane">
        </div>
        <span class="button-text">Filmy ukonczone</span>
      </div>
    </router-link>
    <router-link :to="paths.TO_WATCH_ROUTE" class="router-link-custom">
      <div class="sidebar-button">
        <div class="icon-button">
          <img src="@/resources/watching-a-movie.png" alt="Filmy do obejrzenia">
        </div>
        <span class="button-text">Filmy do zobaczenia</span>
      </div>
    </router-link>
    <router-link :to="paths.FRIENDS_ROUTE" class="router-link-custom">
      <div class="sidebar-button">
        <div class="icon-button">
          <img src="@/resources/friends.png" alt="Znajomi">
        </div>
        <span class="button-text">Znajomi</span>
      </div>
    </router-link>
    <router-link :to="paths.INVITATIONS_ROUTE" class="router-link-custom">
      <div class="sidebar-button">
        <div class="icon-button">
          <img src="@/resources/invitation.png" alt="Zaproszenia do znajomych">
        </div>
        <span class="button-text">Zaproszenia do znajomych</span>
      </div>
    </router-link>
    <router-link :to="paths.SETTINGS_ROUTE" class="router-link-custom">
      <div class="sidebar-button">
        <div class="icon-button">
          <img src="@/resources/settings_icon.png" alt="Ustawienia">
        </div>
        <span class="button-text">Ustawienia</span>
      </div>
    </router-link>
    <router-link :to="paths.LOGOUT_ROUTE" class="router-link-custom">
      <div class="sidebar-button">
        <div class="icon-button">
          <img src="@/resources/logout_icon.png" alt="Wyloguj">
        </div>
        <span class="button-text">WYLOGUJ DEV</span>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  background: transparent;
  width: auto;
  margin: .5rem .5rem;
}

.router-link-custom {
  text-decoration: none;

}

.router-link-custom:hover {
  text-decoration: none;
}

.sidebar-button {
  border-radius: 1em 1em 1em 1em;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  min-width: min-content;
  white-space: nowrap;
  background: transparent;
  border: none;
  width: 100%;
  cursor: pointer;
  padding: 20px;
  transition: .5s ease all;
}

.sidebar-button:hover {
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  background-color: var(--lighter-main-transparent);
}

.sidebar-button:active {
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  background-color: var(--clicked-button);
}

.button-text {
  color: #000;
  font-weight: 600;
  transition: .5s ease all;
}

.icon-button {
  display: flex;
  height: 35px;
  width: 35px;
  align-content: center;
  justify-content: center;
  margin-right: 1em;
}

.icon-button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (max-width: 979px) {
  .button-text {
    transition: .5s ease all;
    display: none;
  }

  .icon-button {
    margin: 0
  }

  .icon-button img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
