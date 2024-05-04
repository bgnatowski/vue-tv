<script setup>
import FriendComponent from "@/components/FriendComponent.vue"
import TitleTile from "@/components/TitleTile.vue";
import {ref} from "vue";
import SearchBar from "@/components/page/SearchBar.vue";
import {sampleFriends} from "@/services/TVDBService.js";
const sFriends = sampleFriends
</script>

<template>
  <section class="feed-container">
    <TitleTile>Znajomi</TitleTile>
    <SearchBar type="friend" placeholder-txt="Filtruj znajomych"></SearchBar>
      <div class="friends-container">
        <FriendComponent v-for="friend in sFriends" :key="friend.uid" :friend="friend"/>
      </div>
    <main class="user-content">
      <h2>---Koniec---</h2>
    </main>
  </section>
</template>

<style scoped>
.search {
  width: 50%;
  align-self: center;
  margin-bottom: 10px;
}

h1 {
  margin-left: 1rem;
}

.friends-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 5%;
}

@media screen and (max-width: 460px) {
  .friends-container {
    gap: 10%;
  }
}

</style>

