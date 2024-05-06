<script setup>

import {onMounted, ref} from "vue";
import {fetchUserByUid} from "@/services/UserService.js";
import {useFriendRequestStore} from "@/stores/FriendRequestStore.js";
import {useUserStore} from "@/stores/UserStore.js";

// --------------------- STORES -------------------------//
const friendRequestStore = useFriendRequestStore();
const userStore = useUserStore();

// -------------------- PROPS AND EMITS -----------------//
const props = defineProps({
  friendId: ''
});

// -------------------- FUNKCJE -----------------------//

const handleDeleteFriend = async () => {
  await friendRequestStore.sendDeleteRequest(userStore.uid, props.friendId)
  await userStore.deleteFriend(props.friendId)
}

function showProfile() {
  //todo
}

// -------------------ZALADOWANIE DANYCH ----------------//
const friend = ref({
  uid: '',
  username: '',
  photoUrl: '',
  friendsIds: [],
  postsIds: []
})
const isLoaded = ref(false);

onMounted(async () => {
  if (props.friendId != undefined) {
    friend.value = await fetchUserByUid(props.friendId);
    isLoaded.value = true;
  } else {
    console.log('BLAD LADOWANIA')
  }
});

</script>

<template>
  <div class="post" v-if="isLoaded">
    <div @click="handleDeleteFriend" class="delete-friend-icon" aria-label="Delete">
      <img src="@/assets/img/delete-icon.png" alt="Delete icon"/>
    </div>
    <div class="profile-picture">
      <img
          class="friends-picture"
          :src="friend.photoUrl"
          :alt="`Profile picture of ${friend.username}`"
      />
    </div>
    <div class="friends-info">
      <h2 class="username">{{ friend.username }}</h2>
      <button
          @click="showProfile"
          class="action-button">Zobacz profil
      </button>
    </div>
  </div>
  <div v-else class="loading">
    <p>Ładowanie...</p>
  </div>
</template>

<style scoped>
@import url(@/assets/buttons.css);
.post {
  width: 30%;
  height: auto;
  justify-content: flex-start;
}

.profile-picture {
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-self: center;
  width: 150px;
  height: 150px;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
  border: 2px solid var(--lighter-main);
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

.friends-info {
  text-align: center;
}

.username {
  font-size: 1em;
}

.action-button {
  padding: .5em;
  font-size: 1em;
  margin-top: 5px;
}

.username {
  font-size: 1em;
}

.delete-friend-icon {
  align-self: flex-end;
  height: 40px;
  width: 40px;
  padding: 5px;
  border-radius: 2em;
  transition: .5s ease all;
  cursor: pointer;
}

.delete-friend-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: .5s ease all;
}

.delete-friend-icon:hover {
  border: none;
  background-color: var(--lighter-main);
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  transition: .5s ease all;
}

.delete-friend-icon:active {
  background-color: var(--clicked-button);
  transition: .5s ease all;
}


@media screen and (max-width: 800px) {
  .profile-picture {
    width: 140px;
    height: 140px;
  }

  .username {
    font-size: .8em;
  }

}

@media screen and (max-width: 1050px) {
  .dropdown,
  .icon-button {
    width: 20px;
    height: 20px;
  }
}

@media screen and (max-width: 760px) {
  .dropdown,
  .icon-button {
    width: 18px;
    height: 18px;
  }
}

@media screen and (max-width: 460px) {
  .post {
    width: 45%;
  }

  .dropdown,
  .icon-button {
    width: 15px;
    height: 15px;
  }

  .profile-picture {
    width: 100px;
    height: 100px;
  }

}
</style>