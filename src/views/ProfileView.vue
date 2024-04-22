<script setup>
import UserPostTile from "@/components/UserPostTile.vue"
import UserMovesTile from "@/components/UserMoviesTile.vue"</script>

<template>
  <div class="profile-page">
    <div class="movies-column">
      <div class="profile-picture">
        <img src="https://cdn-icons-png.flaticon.com/512/4715/4715330.png" alt="" class="user-profile-pic">
        <p class="user-name">prowatcher123</p>
        <UserMovesTile tileType="Filmy obejrzane"/>
        <UserMovesTile tileType="Filmy do obejrzenia"/>
      </div>
    </div>
    <div class="posts-column">
      <h2>Posty uytkownika:</h2>
      <UserPostTile/>
      <UserPostTile/>
      <UserPostTile/>
      <UserPostTile/>
      <UserPostTile/>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  display: flex;
}

.movies-column {
  flex: 0 0 40%;
  width: 100%;
}

.posts-column {
  flex: 0 0 60%;
  width: 100%;
  overflow-y: auto;
  height: 100vh;
}

.profile-picture {
  margin-top: 3rem;
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

@media (max-width: 767px) {
  .profile-page {
    flex-direction: column;
  }

}
</style>
