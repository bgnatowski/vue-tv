<script setup>
import Friends from "@/components/FriendsComponent.vue"
import TitleTile from "@/components/TitleTile.vue";
</script>

<template>
  <section class="feed-container">
    <TitleTile>Znajomi</TitleTile>
    <Friends/>
    <Friends/>
    <Friends/>
    <Friends/>
    <main class="user-content">
      <h2>---Koniec---</h2>
    </main>
  </section>>
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

