<script setup>
import TitleTile from "@/components/TitleTile.vue";
import InvitationComponent from "@/components/InvitationComponent.vue";
import {computed, onMounted} from "vue";
import {useFriendRequestStore} from "@/stores/FriendRequestStore.js";
import {useUserStore} from "@/stores/UserStore.js";

// --------------- STORES ------------------- //
const friendRequestStore = useFriendRequestStore();
const userStore = useUserStore()

// ------------- INVITATION ------------------//
const friendsRequests = computed(() => {
  return friendRequestStore.getPendingFriendsRequests.filter(r => r.receiverId === userStore.uid);
});

onMounted(() =>{
  console.log("friendsRequests: ", friendsRequests)
})

</script>

<template>
  <section class="feed-container">
    <TitleTile>Zaproszenia do znajomych</TitleTile>
    <div class="friends-container">
      <InvitationComponent
          v-for="friendRequest in friendsRequests"
          :key="friendRequest" :friend-request="friendRequest"/>
    </div>
    <main class="user-content">
      <h1>---BRAK---</h1>
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
.user-content {
  margin: auto;
}

@media screen and (max-width: 460px) {
  .friends-container {
    gap: 10%;
  }
}
</style>

