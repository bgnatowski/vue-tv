<script setup>
import TitleTile from "@/components/TitleTile.vue";
import InvitationComponent from "@/components/InvitationComponent.vue";
import {computed, onMounted} from "vue";
import {useFriendRequestStore} from "@/stores/FriendRequestStore.js";

// --------------- STORES ------------------- //
const friendRequestStore = useFriendRequestStore();

// ------------- INVITATION ------------------//
const friendsRequests = computed(() => {
  return friendRequestStore.getPendingFriendsRequests;
});

onMounted(() =>{
  console.log("friendsRequests: ", friendsRequests)
})

</script>

<template>
  <section class="feed-container">
    <TitleTile>Zaproszenia do znajomych</TitleTile>
<!--    <SearchBar type="find-friend" placeholder-txt="Szukaj znajomych"></SearchBar>-->
    <div class="friends-container">
<!--      <InviteFriendComponent v-if="isSearched" @send-invitation></InviteFriendComponent>-->
      <InvitationComponent
          v-for="friendRequest in friendsRequests"
          :key="friendRequest" :friend-request="friendRequest"/>
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

