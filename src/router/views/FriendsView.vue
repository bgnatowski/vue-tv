<script setup>
import TitleTile from "@/components/TitleTile.vue";
import {useFriendRequestStore} from "@/stores/FriendRequestStore.js";
import {computed, onMounted, watch} from "vue";
import {useUserStore} from "@/stores/UserStore.js";
import FriendComponent from "@/components/FriendComponent.vue";

// --------------- STORES ------------------- //
const friendRequestStore = useFriendRequestStore();
const userStore = useUserStore();

// ------------- ACCEPTED FRIENDS --------------//
const friendsAcceptedRequests = computed(() => {
  return friendRequestStore.getAcceptedFriendsRequests.filter(r => r.receiverId !== userStore.uid);
});

const friendsToDeleteRequests = computed(() => {
  return friendRequestStore.getToDeleteFriendsRequests;
});

const friendsIds = computed( () => userStore.getFriendsIds)

function updateFriendsFromRequests() {
  if(friendsAcceptedRequests.value != undefined){
    friendsAcceptedRequests.value.forEach((request) => {
      if (!friendsIds.value.includes(request.receiverId)) {
        userStore.addFriend(request.receiverId);
        console.log(`Uzytkownik ${request.receiverId} zaakceptował twoje(${request.senderId}) zaproszenie.`)
      }
      friendRequestStore.deleteOldRequest(request.id);
    });
  }
  if(friendsToDeleteRequests.value != null){
    friendsToDeleteRequests.value.forEach((request) => {
      if (friendsIds.value.includes(request.senderId)) {
        userStore.deleteFriend(request.senderId);
        console.log(`Uzytkownik ${request.senderId} usunał Cię(${request.receiverId}) ze znajomych.`)
      }
      friendRequestStore.deleteOldRequest(request.id);
    });
  }
}

watch(friendsAcceptedRequests, () => {
  updateFriendsFromRequests();
});

onMounted(() => {
  updateFriendsFromRequests();
  console.log("friendsIds:", friendsIds.value);
  console.log("friendsAcceptedRequests:", friendsAcceptedRequests.value);
});

</script>

<template>
  <section class="feed-container">
    <TitleTile>Znajomi</TitleTile>
    <div class="friends-container" v-if="friendsIds.length">
      <FriendComponent v-for="friendId in friendsIds" :key="friendId" :friend-id="friendId"/>
    </div>
    <div class="user-content" v-else>
      <h2>---BRAK ZNAJOMYCH---</h2>
    </div>
  </section>
</template>

<style scoped>
.user-content {
  margin: auto;
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

