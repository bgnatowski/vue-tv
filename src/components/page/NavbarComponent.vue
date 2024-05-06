<script setup>

import paths from "@/router/routerPaths.js";
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
import SearchBar from "@/components/page/SearchBar.vue";
import SearchResults from "@/components/page/SearchResults.vue";
// ------------------ PROPS AND EMITS ----------------//

const props = defineProps({
  isSidebarVisible: Boolean
});

const emits = defineEmits(['toggle-sidebar'])

// ---------------------SCREEN ----------------------//
const screenWidth = ref(window.innerWidth);
const mobile = ref(false)

watch(
    () => screenWidth.value,
    (newWidth) => {
      mobile.value = newWidth < 600;
    },
    {immediate: true}
);

window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth;
});

// --------------------- BUTTON FUNCTIONS ------------------//
const router = useRouter()
const profileIconRotate = ref(false)
const sideBarIconRotate = ref(false)
const searchIconRotate = ref(false)
const hideBranding = ref(false)

function onMenuButtonClick() {
  emits('toggle-sidebar');
  sideBarIconRotate.value = !sideBarIconRotate.value
}

function toggleRotate() {
  profileIconRotate.value = !profileIconRotate.value
}

function onSearchIconClick() {
  searchIconRotate.value = !searchIconRotate.value
  hideBranding.value = !hideBranding.value;
}


// ----------------------- HANDLE RESULTS -------------------- //
const searchedResults = ref({ movies: [], users: [] });

const handleSearchedResults = (results) => {
  // Sprawdź, czy przekazane dane zawierają filmy i użytkowników
  if (results && results.movies && results.users) {
    searchedResults.value = results;
  } else {
    searchedResults.value = { movies: [], users: [] };
  }
};

</script>

<template>
  <header>
    <nav class="header-nav">
      <div class="branding" v-if="!mobile || !hideBranding">
        <h1 @click="router.push(paths.HOME_ROUTE)" class="bruno-ace-regular">VueTV</h1>
      </div>
      <SearchBar v-if="!mobile || hideBranding" placeholder-txt="Szukaj" @searched-results="handleSearchedResults"/>
      <ul class="navigation">
        <li v-if="mobile" class="icon-button" @click="onSearchIconClick" :class="{'rotate360': searchIconRotate}">
          <img src="@/assets/img/search-icon.png" alt="search-icon">
        </li>
        <li @click="router.push(paths.USER_PROFILE_ROUTE)" class="icon-button"
            :class="{'rotate360': profileIconRotate}">
          <img @click="toggleRotate" src="@/assets/img/user.png" alt="User profile icon"/>
        </li>
        <li class="icon-button" :class="{'rotate180': sideBarIconRotate}">
          <img @click="onMenuButtonClick" src="@/assets/img/menu-icon.png" alt="Menu icon">
        </li>
      </ul>
    </nav>
    <SearchResults :results="searchedResults" @hide-results="searchedResults = { movies: [], users: [] }"></SearchResults>
  </header>
</template>

<style scoped>
header {
  background: rgb(255, 255, 255, 0.25);
  top: 0;
  left: 0;
  z-index: 99;
  width: 100vw;
  position: sticky;
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

.header-nav {
  display: flex;
  background: white;
  flex-direction: row;
  transition: .5s ease all;
  justify-content: space-between;
  width: 100vw;
  padding: 0.4em;
}

.navigation {
  list-style-type: none;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  height: min-content;
  align-self: center;
  margin-right: 10px;
}

.navigation .icon-button {
  display: flex;
  align-self: center;
  transition: .5s ease all;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  padding: .5em;
  margin: 0 5px;
}

.navigation .icon-button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin: 0;
}

.navigation .icon-button:hover {
  background-color: var(--lighter-main);
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

.branding {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
}

.branding h1 {
  font-size: 1.5em;
  color: var(--main-color);
  transition: .5s ease-in;
}

.branding h1:hover {
  font-size: 1.6em;
}

@media screen and (min-width: 3000px) {
  .navigation .icon-button {
    width: 100px;
    height: 100px;
  }
}


@media screen and (max-width: 1000px) {
  .search input {
    display: none;
  }
}

@media screen and (max-width: 600px){
  .navigation {
    height: 100%;
  }
  .header-nav {
    height: 70px;
  }

  .navigation .icon-button {
    width: 45px;
    height: 45px;
  }
  .branding{
    width: 100%;
    justify-content: flex-start;
    cursor: pointer;
  }
}


@media screen and (max-width: 320px){
  .navigation {
    height: 100%;

  }
  .header-nav {
    height: 70px;
  }

  .navigation .icon-button {
    width: 35px;
    height: 35px;
  }
}

@media screen and (max-width: 280px){
  .icon-button {
    height: 18px;
    width: 18px;
  }

  .sidebar {
    gap: 0;
    height: 70px;
  }

  .sidebar-button {
    padding: 12px;
    overflow-y: auto;
  }
}

</style>
