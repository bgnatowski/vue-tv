<script setup>
import UserMovesTile from "@/components/UserMoviesTile.vue"
import PostTile from "@/components/PostTile.vue";
import ProfilePostTitle from "@/components/ProfilePostTitle.vue";
import {onBeforeMount, ref} from "vue";
import {useUserStore} from "@/stores/userStore.js";

const userStore = useUserStore();
const username = ref('<uzytkownik>');
onBeforeMount(() => {
  username.value = userStore.currentUsername;
})

</script>

<template>
  <section class="feed-container">
    <div class="movies-column">
      <div class="profile-picture">
        <img src="https://cdn-icons-png.flaticon.com/512/4715/4715330.png" alt="" class="user-profile-pic">
        <p class="user-name">{{ username }}</p>
      </div>
      <ProfilePostTitle>Filmy obejrzane</ProfilePostTitle>
      <UserMovesTile tileType="Filmy do obejrzenia"/>
      <ProfilePostTitle>Filmy obejrzane</ProfilePostTitle>
      <UserMovesTile tileType="Filmy do obejrzenia"/>
    </div>
    <div class="posts-column">
      <ProfilePostTitle>Twoje recenzje</ProfilePostTitle>
      <div class="posts" v-dragscroll>
        <PostTile profile></PostTile>
        <PostTile profile></PostTile>
        <PostTile profile></PostTile>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feed-container {
  flex-direction: row;
  margin: 0;
}

.movies-column {
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 40%;
  padding: 1em;
}
.posts-column{
  padding: 1em 1em 0 1em;
}

.posts {
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 4000px;
  overflow-y: auto;
  scrollbar-width: thin;
  padding: 1em;
}

.profile-picture {
  text-align: center;
}

.user-profile-pic {
  height: 8rem;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
}

.user-name {
  font-size: 1.5rem;
  margin-top: 1rem;
}


@media (max-width: 1400px) {
  .feed-container {
    flex-direction: column;
  }

  .movies-column {
    align-self: center;
    width: 100%
  }
}


@media (max-width: 600px) {
  .feed-container {
    margin: 0;
    padding: 0;
  }
}


</style>
