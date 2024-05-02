<script setup>
import FriendComponent from "@/components/FriendComponent.vue"
import TitleTile from "@/components/TitleTile.vue";
import {ref} from "vue";
import InvitationComponent from "@/components/InvitationComponent.vue";
import SearchBar from "@/components/page/SearchBar.vue";

const friends = ref([
  {
    id: 1,
    userImage: "https://randomuser.me/api/portraits/men/21.jpg",
    username: "JohnDoe123",
    detail1: "This is a longer text to test whether it wraps properly and allows scrolling if it overflows.",
    detail2: "Another longer piece of text to see if it requires scrolling to stay within the container.",
  },
  {
    id: 2,
    userImage: "https://randomuser.me/api/portraits/men/25.jpg",
    username: "JaneDoe456",
    detail1: "Some shorter text.",
    detail2: "Another short piece of text.",
  },
  {
    id: 3,
    userImage: "https://randomuser.me/api/portraits/men/11.jpg",
    username: "AliceDoe789",
    detail1: "A variety of text lengths to test scrolling andfafasffasf wrafasfafasfafspping behavior.",
    detail2: "Another text to check how well it works with gsdgdgsgsdgdgsdgsdg content.",
  },
  {
    id: 4,
    userImage: "https://randomuser.me/api/portraits/men/11.jpg",
    username: "AliceDoe789",
    detail1: "A variety of text lengths to test scrolling andfafasffasf wrafasfafasfafspping behavior.",
    detail2: "Another text to check how well it works with gsdgdgsgsdgdgsdgsdg content.",
  },
  {
    id: 5,
    userImage: "https://randomuser.me/api/portraits/men/11.jpg",
    username: "AliceDoe789",
    detail1: "A variety of text lengths to test scrolling andfafasffasf wrafasfafasfafspping behavior.",
    detail2: "Another text to check how well it works with gsdgdgsgsdgdgsdgsdg content.",
  },
])
</script>

<template>
  <section class="feed-container">
    <TitleTile>Zaproszenia do znajomych</TitleTile>
    <SearchBar type="find-friend" placeholder-txt="Szukaj znajomych"></SearchBar>
    <div class="friends-container">
      <InvitationComponent v-for="friend in friends" :key="friend.id" v-bind="friend"/>
    </div>
    <main class="user-content">
      <h2>---Koniec---</h2>
    </main>
  </section>
</template>

<style scoped>
.search {
  width: 50%;
  align-self: center;
  margin-bottom: 10px;
}
h1 {
  margin-left: 1rem;
}

.friends-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 5%;
}

@media screen and (max-width: 460px) {
  .friends-container {
    gap: 10%;
  }
}
</style>

