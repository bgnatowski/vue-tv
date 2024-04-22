<script setup>
import {onMounted, ref, watch} from "vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useRoute} from "vue-router";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue"
import Navbar from "@/components/Navbar.vue";

const route = useRoute();
const isLoggedIn = ref(false);
const showFooter = ref(true);

let auth;

// Stan dla pokazywania/ukrywania Sidebar
const isSidebarVisible = ref(true);

// Funkcja do przełączania widoczności Sidebar
function toggleSidebar() {
  isSidebarVisible.value = !isSidebarVisible.value;
}

onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  })
});

// ustawienie footera
watch(
    () => route.path,
    (newPath) => {
      showFooter.value = newPath !== '/';
    },
    {immediate: true}
);

</script>

<template>
  <Navbar v-if="isLoggedIn" :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar"></Navbar>
  <main class="app">
    <transition name="sidebar">
      <Sidebar v-if="isSidebarVisible && isLoggedIn" styl="ver2"></Sidebar>
    </transition>
    <router-view></router-view>
  </main>
  <Footer v-if="showFooter"></Footer>
</template>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Red Hat Display", sans-serif;
}

:root {
  --main-color: #3DCCC7;
  --lighter-main: #9CEAEF
}

.app {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url("@/resources/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  position: relative;
  min-height: 100vh;
}

/* transition */
.sidebar-leave-active {
  transition: .5s ease all; /* Smooth transition for both enter and leave */
}
.sidebar-leave {
  transform: translateX(0); /* Start position for leave animation (fully on-screen) */
}

.sidebar-leave-to {
  transform: translateX(-100%); /* End position for leave animation (off-screen) */
}

</style>