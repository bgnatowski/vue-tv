<script setup>

import {ref, watch} from "vue";
import {searchMovie} from "@/services/TVDBService.js";
import {searchUsersByUsername} from "@/services/UserService.js";

const props = defineProps({
  placeholderTxt: String
})

const emits = defineEmits(['searched-results'])

const searchQuery = ref('');
const searchedMovies = ref([]);
const searchedUsers = ref([]);

watch(searchQuery, async () => {
  searchedMovies.value = await searchMovie(searchQuery.value)
  searchedUsers.value = await searchUsersByUsername(searchQuery.value);

  emits('searched-results', { movies: searchedMovies.value, users: searchedUsers.value });
});

async function reloadSearched() {
  emits('searched-results', { movies: searchedMovies.value, users: searchedUsers.value })
}

</script>
<template>
  <div class="search">
    <form @submit.prevent class="search-form">
      <input type="search" :placeholder="placeholderTxt" v-model="searchQuery" @click="reloadSearched">
    </form>
  </div>
</template>

<style scoped>
.search {
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  width: 20%;
  transition: .4s ease all;
}

input[type=search]::-webkit-search-cancel-button {
  cursor: pointer;
}

@media screen and (max-width: 600px){
  .search {
    width: 100%;
  }
}

.search-form {
  display: flex;
  align-items: center;
  position: relative;
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
  padding: .75em;
  height: 90%;
  width: 100%;
}

</style>