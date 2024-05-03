<script setup>

import {ref, watch} from "vue";
import {searchMovie} from "@/services/TVDBService.js";

const props = defineProps({
  mobile: Boolean,
  type: String,
  placeholderTxt: String
})

const emits = defineEmits(['searched-movies'])

const searchQuery = ref('');
const searchedMovies = ref([]);

watch(searchQuery, async (newValue) => {
  if (props.type === 'movie') {
    searchedMovies.value = await searchMovie(searchQuery.value)
    emits('searched-movies', searchedMovies.value)
  } else if (props.type === 'friend') {
    // logika wyszukiwania znajomych
  } else if (props.type === 'find-friend') {
    // logika szukania nowych znajomych
  }
});

async function reloadOnFocus(){
  emits('searched-movies', searchedMovies.value)
}

</script>
<template>
  <div class="search">
    <form @submit.prevent class="search-form">
      <input v-if="!mobile" :placeholder="placeholderTxt" v-model="searchQuery" @focus="reloadOnFocus">
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