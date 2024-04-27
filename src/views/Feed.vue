<script setup>
import {useRouter} from "vue-router";
import {signOutUser} from "@/services/AuthenticationService.js";
const router = useRouter()
import Popup from "@/components/Popup.vue";
import PostTile from "@/components/PostTile.vue"


const handleSingOut = () => {
  signOutUser(router);
};
</script>

<template>
  <div class="feed-container">
    <h2>Polecenia znajomych:</h2>
    <!-- <header class="user-header">
      <h1>Strona użytkownika</h1>
      <div class="user-actions">
        <button class="settings-btn" @click="router.push('/settings')">Ustawienia</button>
        <button class="logout-btn" @click="handleSingOut">Wyloguj się</button>
      </div>
    </header> -->
    <!-- <Popup/> -->
    <PostTile/>
    <PostTile/>
    <PostTile/>
    <PostTile/>
    <main class="user-content">
    </main>
  </div>
</template>

<style scoped>
h2 {
  margin: 1rem;
}
.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-actions button {
  margin: 0 10px;
}

</style>

