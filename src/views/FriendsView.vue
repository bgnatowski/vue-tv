<script setup>
import Friends from "@/components/Friends.vue"
</script>

<template>
  <div class="watched-container">
    <h1>Znajomi</h1>
    <Friends/>
    <Friends/>
    <Friends/>
    <Friends/>
    <main class="user-content">
      <h2>---Koniec---</h2>
    </main>
  </div>
</template>

<style scoped>
.watched-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
}

h1 {
  margin-left: 1rem;
}

</style>

