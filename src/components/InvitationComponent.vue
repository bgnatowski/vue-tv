<script setup>

import {onMounted, ref} from "vue";
import {fetchUserByUid} from "@/services/UserService.js";
import {useUserStore} from "@/stores/UserStore.js";
import {useFriendRequestStore} from "@/stores/FriendRequestStore.js";

// ---------------------- STORE ------------------------//
const userStore = useUserStore();
const friendRequestStore = useFriendRequestStore();

// -------------------- PROPS AND EMITS --------------- //

const props = defineProps({
  friendRequest: {
    id: '',
    receiverId: '',
    senderId: '',
    status: '',
    timestamp: ''
  }
});

// ---------------------- FUNCTIONS --------------- //
function showProfile() {
  console.log('wyemitowano show profile');
}

const handleAccept = async () => {
  console.log('wyemitowano handleAccept');
  await friendRequestStore.acceptRequest(props.friendRequest.id, props.friendRequest.receiverId)
  await userStore.addFriend(props.friendRequest.senderId);
  console.log('akceptowano zaproszenie i dodano znajomego!')
}

const handleDecline= async () => {
  console.log('wyemitowano handleDecline');
  await friendRequestStore.declineRequest(props.friendRequest.id, props.friendRequest.receiverId)
}

// ----------------------------- ZALADOWANIE DANYCH ----------------//
const userProfile = ref({
  uid: '',
  username: '',
  photoUrl: '',
  friendsIds: [],
  postsIds: []
})
const isLoaded = ref(false);

onMounted(async () => {
  if (props.friendRequest != undefined) {
    userProfile.value = await fetchUserByUid(props.friendRequest.senderId);
    isLoaded.value = true;
  } else {
    console.log('BLAD')
  }
});

</script>

<template>
  <div class="post">
    <div class="profile-picture">
      <img
          class="friends-picture"
          :src="userProfile.photoUrl"
          :alt="`Profile picture of ${userProfile.username}`"
      />
    </div>
    <div class="friends-info">
      <h2 class="username">{{ userProfile.username }}</h2>
      <div class="card-action-buttons">
        <div @click="handleAccept" class="card-action-icon" aria-label="Accept">
          <img src="@/assets/img/accept-icon.png" alt="Accpet icon"/>
        </div>
        <div @click="handleDecline" class="card-action-icon" aria-label="Decline">
          <img src="@/assets/img/decline-icon.png" alt="Decline icon"/>
        </div>
      </div>
      <button
          @click="showProfile"
          class="action-button">Zobacz profil
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/buttons.css);

.action-button {
  padding: .5em;
  font-size: 1em;
  margin-top: 5px;
}

.post {
  width: 30%;
  height: auto;
  justify-content: flex-start;
}

.profile-picture {
  display: flex;
  padding: 10px;
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

.card-action-buttons {
  display: flex;
  justify-content: center;
}

.card-action-icon {
  height: 50px;
  width: 50px;
  border-radius: 2em;
  transition: .5s ease all;
  cursor: pointer;
}

.card-action-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-action-icon:hover {
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

.card-action-icon:active {
  background-color: var(--clicked-button);
}


@media screen and (max-width: 800px) {
  .profile-picture {
    width: 140px;
    height: 140px;
  }

  .username {
    font-size: .8em;
  }

  .friends-info button {
    font-size: .8em;
  }

}

@media screen and (max-width: 460px) {
  .post {
    width: 45%;
  }

  .profile-picture {
    width: 100px;
    height: 100px;
  }

  .card-action-icon {
    height: 35px;
    width: 35px;
  }

  .username {
    font-size: .6em;
  }

  .friends-info button {
    font-size: .6em;
    white-space: break-spaces;
  }

}
</style>