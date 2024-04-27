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
    <nav class="header-nav">
      <div class="branding">
        <router-link :to="paths.HOME_ROUTE" style="text-decoration: none">
          <h1 class="bruno-ace-regular">VueTV</h1>
        </router-link>
      </div>
      <div class="search">
        <input placeholder="Szukaj"/>
      </div>
      <ul v-show="!mobile" class="navigation">
        <li>
          <div class="link" :class="{'rotate360': profileIconRotate}">
            <router-link :to="paths.USER_PROFILE_ROUTE">
              <img @click="toggleRotate" src="@/assets/user.png" alt="User profile icon"/>
            </router-link>
          </div>
        </li>
        <li>
          <div class="link" :class="{'rotate180': sideBarIconRotate}">
            <img @click="onMenuButtonClick" src="@/assets/menu-icon.png" alt="Menu icon">
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

ul {
  list-style-type: none;
  padding: .5em 0.1em;
}

ul, .link {
  font-weight: 500;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-content: center;
  gap: .5em;
}

.link {
  transition: .5s ease all;
  width: 50px;
  height: 50px;
  padding: 0.4em;
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
  justify-content: center;
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
  justify-content: center;
  width: 20%;
  transition: .4s ease all;
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

@media (max-width: 979px) {
  .header-nav{
    gap: 10%
  }
  .search input {
    font-size: .8em;
  }
}
@media (max-width: 500px) {
  .header-nav{
    gap: 5%;
  }
  .search input {
    font-size: .8em;
  }
}

@media (max-width: 360px) {
  .header-nav{
    gap: 0;
  }
  .search input {
    font-size: .6em;
  }
}

</style>
