<script setup>
import PostTile from "@/components/PostTile.vue";
import {onMounted, ref} from "vue";

const hasScrollbar = ref(false);

onMounted(() => {
  const postsColumn = document.querySelector('.posts-column');
  if (postsColumn.scrollHeight > postsColumn.clientHeight) {
    hasScrollbar.value = true;
  }
});

</script>

<template>
  <section class="feed-container" :style="hasScrollbar ? 'margin: 0' : ''">
    <div class="posts-column">
      <h1>Recenzje znajomych:</h1>
      <PostTile/>
      <PostTile/>
      <PostTile/>
      <PostTile/>
      <PostTile/>
      <PostTile/>
      <PostTile/>
      <main class="user-content">
        <h2>---Koniec---</h2>
      </main>
    </div>
  </section>
</template>

<style scoped>
.feed-container{
  flex-direction: row;
  gap: 1em;
}

.user-content {
  text-align: center;
}

.posts-column {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1em;
  max-height: 1500px;
  overflow-y: auto;
}

</style>
