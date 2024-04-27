<script setup>
import UserMovesTile from "@/components/UserMoviesTile.vue"
import PostTile from "@/components/PostTile.vue";</script>

<template>
  <section class="feed-container">
    <div class="movies-column" v-dragscroll>
      <div class="profile-picture">
        <img src="https://cdn-icons-png.flaticon.com/512/4715/4715330.png" alt="" class="user-profile-pic">
        <p class="user-name">prowatcher123</p>
      </div>
      <UserMovesTile tileType="Filmy obejrzane"/>
      <UserMovesTile tileType="Filmy do obejrzenia"/>
    </div>
    <div class="posts-column">
      <section class="post">
        <div class="info-tile">
          <h1>Posty użytkownika:</h1>
        </div>
      </section>
      <PostTile profile></PostTile>
      <PostTile profile></PostTile>
      <PostTile profile></PostTile>
      <PostTile profile></PostTile>
      <PostTile profile></PostTile>
      <PostTile profile></PostTile>
    </div>
  </section>
</template>

<style scoped>
.feed-container {
  flex-direction: row;
  gap: 1em;
  margin: 0;
}

.movies-column {
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 40%;
  margin: 1em 0;
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

.info-tile {
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  text-align: center;
  gap: 20px;
}

/*@media(max-width: 970px){*/
/*  .movies-column {*/
/*    width: 20%;*/
/*  }*/
/*  .posts-column {*/
/*    width: 80%;*/
/*  }*/
/*}*/

/*@media (max-width: 767px) {*/
/*  .profile-page {*/
/*    flex-direction: column;*/
/*  }*/
/*}*/
</style>
