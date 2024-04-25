<script setup>
import paths from "@/router/routerPaths.js";

const props = defineProps({
  styl: String,
})

</script>
<template>
    <div :class="styl" class="sidebar">
        <router-link :to="paths.MAIN_ROUTE" class="router-link-custom">
            <button class="sidebar-button">
                <img src="../resources/main.png" alt="Strona główna">
                <span class="button-text">Strona główna</span>
            </button>
        </router-link>
        <router-link :to="paths.TO_WATCH_ROUTE" class="router-link-custom">
            <button class="sidebar-button">
                <img src="@/resources/video.png" alt="Filmy obejrzane">
                <span class="button-text">Filmy obejrzane</span>
            </button>
        </router-link>
        <router-link :to="paths.WATCHED_ROUTE" class="router-link-custom">
            <button class="sidebar-button">
                <img src="@/resources/watching-a-movie.png" alt="Filmy do obejrzenia">
                <span class="button-text">Filmy do obejrzenia</span>
            </button>
        </router-link>
      <router-link :to="paths.FRIENDS_ROUTE" class="router-link-custom">
        <button class="sidebar-button">
          <img src="@/resources/friends.png" alt="Znajomi">
          <span class="button-text">Znajomi</span>
        </button>
      </router-link>
      <router-link :to="paths.INVITATIONS_ROUTE" class="router-link-custom">
        <button class="sidebar-button">
          <img src="@/resources/invitation.png" alt="Zaproszenia do znajomych">
          <span class="button-text">Zaproszenia do znajomych</span>
        </button>
      </router-link>
      <router-link :to="paths.SETTINGS_ROUTE" class="router-link-custom">
        <button class="sidebar-button">
          <img src="@/resources/settings_icon.png" alt="Ustawienia">
          <span class="button-text">Ustawienia</span>
        </button>
      </router-link>
      <router-link :to="paths.LOGOUT_ROUTE" class="router-link-custom">
        <button class="sidebar-button">
          <img src="@/resources/logout_icon.png" alt="Wyloguj">
          <span class="button-text">WYLOGUJ DEV</span>
        </button>
      </router-link>
    </div>
</template>

<style>
.sidebar {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  padding-top: 1rem;
  /* ODKOMENTUJ DLA SPRAWDZENIA INNEJ WERSJI WYGLADU SIDEBARA ALA facebookowy
  padding-right: .5rem;
  background-color: rgba(255, 255, 255, 0.5);
   */
}

.router-link-custom{
  text-decoration: none;

}

.router-link-custom:hover{
  text-decoration: none;
}

.sidebar-button {
  border-radius: 0 1em 1em 0;
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
  padding: 1.5em;
}

.ver1 .sidebar-button:hover{
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  background-color: var(--main-color);
}

.ver2 .sidebar-button:hover{
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  background-color: var(--lighter-main);
}

.button-text{
  font-weight: 600;
}

img {
  height: 3vh;
  margin-right: 10px;
}

</style>
