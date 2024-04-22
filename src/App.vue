<script setup>
import {computed, onMounted, ref} from "vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {signOutUser} from "@/services/AuthenticationService.js";
import {useRoute, useRouter} from "vue-router";
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue"

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
    <Header/>
    <div class="container">
      <div class="column1">
        <Sidebar/>
      </div>
      <div class="column2">
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
        <!--  <Footer v-if="showFooter"></Footer>-->
      </div>
    </div>
</template>

<style>
.container {
    display: flex;
}

.column1 {
  flex: 0 0 20%; 
  z-index: 1; 
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); 
}

.column2 {
  flex: 1; 
  z-index: 0; 
}

Header {
  z-index: 2; 
  position: relative; 
}
@media (max-width: 767px) {
  .column1 {
  flex: 0 0 5%; 
  min-width: 55px;
  transition: 0.3s;
}
}
</style>

