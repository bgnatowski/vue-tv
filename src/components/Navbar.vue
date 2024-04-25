<script setup>

import paths from "@/router/routerPaths.js";
import {ref} from "vue";

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
    <nav>
      <div class="branding">
        <router-link :to="paths.HOME_ROUTE" style="text-decoration: none" class="logo-text">
          <h1 class="bruno-ace-bold">VueTV</h1>
        </router-link>
      </div>
      <div class="search">
        <input placeholder="Szukaj"/>
      </div>
      <ul v-show="!mobile" class="navigation">
        <li>
          <div class="link" :class="{'icon-rotate': profileIconRotate}">
            <router-link :to="paths.USER_PROFILE_ROUTE">
              <img @click="toggleRotate" src="@/resources/user.png" alt="User profile icon"/>
            </router-link>
          </div>
        </li>
        <li>
          <div class="link" :class="{'icon-active': sideBarIconRotate}">
            <img @click="onMenuButtonClick" src="@/resources/menu-icon.png" alt="Menu icon">
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  background: rgb(255,255,255, 0.25);
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  position: sticky;
  transition: .5s ease all;
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

nav {
  display: flex;
  background: white;
  flex-direction: row;
  transition: .5s ease all;
  align-content: space-between;
  justify-content: space-between;
}

ul {
  list-style-type: none;
  margin-right: 1em;
}

ul, .link {
  font-weight: 500;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
  display: flex;
}

li {
  padding: .5em 0.1em;
}

.link {
  transition: .5s ease all;
  width: 50px;
  height: 50px;
  padding: 0.5em;
  border-radius: 2em;
}

.link:hover {
  background-color: var(--lighter-main);
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

.link img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin: 0;
}

.branding {
  display: flex;
  align-items: center;
  margin-left: 1em;
  text-decoration: none;
}

.logo-text {
  color: var(--main-color);
  transition: .5s ease all;
  text-decoration: none;
  font-size: 2em;
}

.search {
  align-content: center;
  justify-content: center;
  width: 30%;
  margin: auto 5% auto 5%;
  transition: .5s ease all;
}

.search input {
  outline: none;
  border-radius: 3em;
  border-color: transparent;
  padding: .5rem;
  font-size: 1em;
  color: #747775;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  width: 100%;
}

@media (min-width: 1140px) {
  nav {
    /*max-width: 1144px;*/
  }
}


.icon-active {
  transform: rotate(180deg);
}

.icon-rotate {
  transform: rotate(360deg);
}
</style>
