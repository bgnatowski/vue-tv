<script setup>

import paths from "@/router/routerPaths.js";
import {ref} from "vue";
import router from "@/router/index.js";

const props = defineProps({
  isSidebarVisible: Boolean
});

const emit = defineEmits(['toggle-sidebar']);

function onMenuButtonClick() {
  emit('toggle-sidebar');
  sideBarIconRotate.value = !sideBarIconRotate.value
}

function toggleRotate() {
  profileIconRotate.value = !profileIconRotate.value
}

const mobile = ref(false)
const profileIconRotate = ref(false)
const sideBarIconRotate = ref(false)
</script>

<template>
  <header>
    <nav class="header-nav">
      <div class="branding">
          <h1 @click="router.push(paths.HOME_ROUTE)" class="bruno-ace-regular">VueTV</h1>
      </div>
      <div class="search">
        <form class="search-form">
          <input type="search" placeholder="Szukaj">
          <div class="icon-button">
            <img src="@/assets/search-icon.png" alt="search-icon"/>
          </div>
        </form>
      </div>
      <ul v-show="!mobile" class="navigation">
        <li @click="router.push(paths.USER_PROFILE_ROUTE)" class="icon-button" :class="{'rotate360': profileIconRotate}">
            <img @click="toggleRotate" src="@/assets/user.png" alt="User profile icon"/>
        </li>
        <li class="icon-button" :class="{'rotate180': sideBarIconRotate}">
          <img @click="onMenuButtonClick" src="@/assets/menu-icon.png" alt="Menu icon">
        </li>
      </ul>
    </nav>
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
  width: 55px;
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

.search {
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  width: 20%;
  transition: .4s ease all;
}

.search-form{
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.search-form .icon-button{
}

.search input {
  outline: none;
  border-radius: 3em;
  border-color: transparent;
  padding: .7em;
  color: #747775;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 80%
}

.search input:hover {
  transition: .4s ease all;
  padding: .9em;
  height: 90%;
  width: 100%;
}

@media (min-width: 1916px){
  .navigation .icon-button {
    width: 65px;
    height: 65px;
    border-radius: 2em;
    padding: .5em
  }
}

@media (min-width: 3000px){
  .navigation .icon-button {
    width: 70px;
    height: 70px;
    border-radius: 2em;
    padding: .5em
  }
}


@media (min-width: 4000px){
  .navigation .icon-button {
    width: 90px;
    height: 90px;
    border-radius: 2em;
    padding: .5em
  }
}

@media (max-width: 979px) {
  .header-nav {
    gap: 10%
  }

  .search input {
    font-size: .8em;
  }
}

@media (max-width: 500px) {
  .header-nav {
    gap: 5%;
  }

  .search input {
    font-size: .8em;
  }
}

@media (max-width: 360px) {
  .header-nav {
    gap: 0;
  }

  .search input {
    font-size: .6em;
  }
}

</style>
