<script setup>
import {computed, onMounted, ref} from "vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {signOutUser} from "@/services/AuthenticationService.js";
import {useRoute, useRouter} from "vue-router";
import Footer from "@/views/Footer.vue";

const isLoggedIn = ref(false);
const router = useRouter()
const route = useRoute()

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

const showFooter = computed(() => {
  return !route.meta.hideFooter;
});

</script>

<template>
  <router-view></router-view>
  <!--  <nav style="border-color: #2c3e50; border-style: dashed; padding: 1px;">-->
  <!--    <p>dev navigation</p>-->
  <!--    <router-link to="/"> Home</router-link>-->
  <!--    <router-link to="/feed"> Feed</router-link>-->
  <!--    <router-link to="/register"> Register</router-link>-->
  <!--    <router-link to="/sign-in"> Login</router-link>-->
  <!--    <router-link to="/settings"> Settings</router-link>-->
  <!--    <router-link to="/watched"> Watched</router-link>-->
  <!--    <router-link to="/to_watch"> To watch</router-link>-->
  <!--    <button @click="handleSingOut" v-if="isLoggedIn">Sign out</button>-->
  <!--  </nav>-->
  <Footer v-if="showFooter"></Footer>
</template>

<style>
</style>
