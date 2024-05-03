<script setup>

import paths from "@/router/routerPaths.js";
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
import SearchBar from "@/components/page/SearchBar.vue";
import SearchResults from "@/components/page/SearchResults.vue";

const props = defineProps({
  isSidebarVisible: Boolean
});

const screenWidth = ref(window.innerWidth);
const mobile = ref(false)
const profileIconRotate = ref(false)
const sideBarIconRotate = ref(false)
const searchIconRotate = ref(false)
const router = useRouter()

watch(
    () => screenWidth.value,
    (newWidth) => {
      mobile.value = newWidth < 1000;
    },
    {immediate: true}
);

window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth;
});

function onMenuButtonClick() {
  emit('toggle-sidebar');
  sideBarIconRotate.value = !sideBarIconRotate.value
}

function toggleRotate() {
  profileIconRotate.value = !profileIconRotate.value
}

function onSearchIconClick() {
  searchIconRotate.value = !searchIconRotate.value
}


const searchedMovies = ref();
const handleSearchedMovies = (movies) => {
  if(!movies){
    searchedMovies.value = [];
  }else{
    searchedMovies.value = movies;
  }
};

</script>

<template>
  <header>
    <nav class="header-nav">
      <div class="branding">
        <h1 @click="router.push(paths.HOME_ROUTE)" class="bruno-ace-regular">VueTV</h1>
      </div>
      <SearchBar :mobile="mobile" type="movie" placeholder-txt="Szukaj" @searched-movies="handleSearchedMovies"/>
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
    <SearchResults :movies="searchedMovies" @hide-results="searchedMovies = null"></SearchResults>
  </header>
</template>

<style scoped>
header {
  background: rgb(255, 255, 255, 0.25);
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  position: sticky;
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

.header-nav {
  display: flex;
  background: white;
  flex-direction: row;
  transition: .5s ease all;
  align-content: space-around;
  justify-content: space-around;
  width: 100vw;
  padding: 0.4em;
  gap: 20%;
}

.navigation {
  list-style-type: none;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  height: min-content;
  align-self: center;
  gap: 8%;
}

.navigation .icon-button {
  display: flex;
  align-self: center;
  transition: .5s ease all;
  width: 60px;
  height: 55px;
  border-radius: 2em;
  padding: .5em
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
    width: 80px;
    height: 80px;
    border-radius: 2em;
    padding: .1em
  }
}

@media screen and (min-width: 1916px) {
  .navigation .icon-button {
    width: 70px;
    height: 65px;
    border-radius: 2em;
    padding: .5em
  }
}

@media screen and (max-width: 1000px) {
  .search input {
    display: none;
  }

  .header-nav {
    gap: 10%
  }

  .navigation .icon-button {
    width: 65px;
    height: 55px;
  }
}

@media screen and (max-width: 600px){
  .navigation {
    gap: 5px;
    height: 100%;
  }
  .header-nav {
    height: 70px;
  }

  .navigation .icon-button {
    width: 45px;
    height: 45px;
    padding: .5em
  }
}


@media screen and (max-width: 320px){
  .navigation {
    gap: 10px;
    height: 100%;

  }
  .header-nav {
    height: 70px;
  }

  .navigation .icon-button {
    width: 35px;
    height: 35px;
    padding: .4em
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
