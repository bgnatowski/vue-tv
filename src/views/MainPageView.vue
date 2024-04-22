<script setup>
import PostTile from "@/components/PostTile.vue";</script>

<template>
    <section class="feed-container">
      <PostTile/>
      <PostTile/>
      <PostTile/>
      <PostTile/>
      <main class="user-content">
        <h2>---Koniec---</h2>
      </main>
    </section>
</template>

<style scoped>
.feed-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
