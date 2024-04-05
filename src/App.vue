<script setup>
import {onMounted, ref} from "vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {signOutUser} from "@/services/AuthenticationService.js";
import {useRouter} from "vue-router";

const isLoggedIn = ref(false);
const router = useRouter()

let auth;
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  })
});

const handleSingOut = () => {
  signOutUser(router);
};

</script>

<template>
  <nav style="border-color: #2c3e50; border-style: dashed; padding: 1px;">
    <p>dev navigation</p>
    <router-link to="/"> Home</router-link>
    <router-link to="/feed"> Feed</router-link>
    <router-link to="/register"> Register</router-link>
    <router-link to="/sign-in"> Login</router-link>
    <router-link to="/settings"> Settings</router-link>
    <router-link to="/watched"> Watched</router-link>
    <router-link to="/to_watch"> To watch</router-link>
    <button @click="handleSingOut" v-if="isLoggedIn">Sign out</button>
  </nav>

  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
