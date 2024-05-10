<script setup>
import TitleTile from "@/components/TitleTile.vue";
import InvitationTile from "@/components/InvitationTile.vue";
import {computed, onBeforeMount} from "vue";
import {useFriendRequestStore} from "@/stores/FriendRequestStore.js";
import {useUserStore} from "@/stores/UserStore.js";

// --------------- STORES ------------------- //
const friendRequestStore = useFriendRequestStore();
const userStore = useUserStore()

// ------------- INVITATION ------------------//
const friendsRequests = computed(() => {
  return friendRequestStore.getPendingFriendsRequests.filter(r => r.receiverId === userStore.uid);
});


</script>

<template>
  <section class="feed-container">
    <TitleTile>Zaproszenia do znajomych</TitleTile>
    <div class="friends-container">
      <InvitationTile
          v-for="friendRequest in friendsRequests"
          :key="friendRequest" :friend-request="friendRequest"/>
    </div>
    <main v-if="!friendsRequests.length" class="user-content">
      <h1>---BRAK ZAPROSZEŃ---</h1>
    </main>
  </section>
</template>

<style scoped>
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

