<script setup>
import TitleTile from "@/components/TitleTile.vue";
import InvitationComponent from "@/components/InvitationComponent.vue";
import SearchBar from "@/components/page/SearchBar.vue";
import {useUserStore} from "@/stores/UserStore.js";
import {onMounted} from "vue";

// --------------- STORES ------------------- //
const userStore = useUserStore();

// ------------- INVITATION ------------------//
const userInvitationsIds = userStore.invitationsIds;

onMounted(() =>{
  console.log("invitationsIds: ", userInvitationsIds)
  console.log("friendsId: ", userStore.friendsIds)
})

</script>

<template>
  <section class="feed-container">
    <TitleTile>Zaproszenia do znajomych</TitleTile>
    <SearchBar type="find-friend" placeholder-txt="Szukaj znajomych"></SearchBar>
    <div class="friends-container">
<!--      <InviteFriendComponent v-if="isSearched" @send-invitation></InviteFriendComponent>-->
      <InvitationComponent
          v-for="invitationId in userInvitationsIds"
          :key="invitationId" :invitationId="invitationId"/>
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

