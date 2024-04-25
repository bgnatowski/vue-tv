<script setup>
import {onMounted, ref, watch} from "vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useRoute} from "vue-router";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue"

const route = useRoute();
const isLoggedIn = ref(false);
const showFooter = ref(true);

let auth;
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
  <header>
    <Header v-if="isLoggedIn"></Header>
  </header>
  <main class="container">
    <!--    ver1 lub ver2 - zmien w celu sprawdzenia ktory kolor lepszy dla sidebara -->
    <Sidebar v-if="isLoggedIn" styl="ver2"/>
    <router-view></router-view>
  </main>
  <footer>
    <Footer v-if="showFooter"></Footer>
  </footer>
</template>

<style>
header {
  background-color: #fff;
  box-shadow: 0 4px 13px rgba(0, 0, 0, 0.25);
  position: fixed;
  width: 100%;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url("@/resources/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: 100vh;
  width: 100%;
  padding-top: 5em; /* odstep od gory hardcoded narazie xd*/
}
</style>