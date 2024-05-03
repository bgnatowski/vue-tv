<script setup>
import MovieItem from "@/components/page/MovieItem.vue";

const props = defineProps({
  movies: Array
});
const emits = defineEmits(['hide-results']);

const handleMouseOut = () => {
  emits('hide-results');
};
</script>

<template>
  <ul class="result" @mouseleave="handleMouseOut">
    <MovieItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        class="movie-item"
    />
  </ul>
</template>

<style scoped>
.result {
  background: rgb(255, 255, 255, 1);
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: -1;
  width: 50%;
  box-shadow: 0 4px 15px 4px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  scrollbar-width: thin;
  max-height: 70vh;
  border-radius: 0 0 1em 1em;
}

</style>