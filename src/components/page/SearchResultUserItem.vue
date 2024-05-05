<script setup>
import {computed, onMounted, ref} from 'vue';
import {useUserStore} from "@/stores/UserStore.js";
import {useMovieStore} from "@/stores/MovieStore.js";
import {useFriendRequestStore} from "@/stores/FriendRequestStore.js";

// ----------- STORES ------------------//
const userStore = useUserStore();
const movieStore = useMovieStore();
const friendsRequestStore = useFriendRequestStore();

// ---------- PROPS AND EMITS ---------- //
const props = defineProps({ user: Object });

// ----------- DROPDOWN --------------//
const isShowDropdown = ref(false);
const showDropdown = () => isShowDropdown.value = true;
const hideDropdown = () => isShowDropdown.value = false;

// ------------- COMPUTED --------------//
const isFriend = computed(() => userStore.getFriendsIds.includes(props.user.id));
const isMe = computed(() => userStore.getUid == props.user.uid);
const isAlreadySent = computed(() => friendsRequestStore.isPendingFor(userStore.uid, props.user.id));

// ------------- SEND REQUEST -------------//
const sendFriendRequest = async () => {
  console.log('sending?')
  if(!isAlreadySent.value && !isFriend.value){
    console.log('sending request...');
    await friendsRequestStore.sendInvitationRequest(userStore.uid, props.user.id);
    console.log('friendRequests:', friendsRequestStore.getFriendsRequests)
    hideDropdown();
  }
};

// -------------- GO TO PROFILE ---------- //
const goToProfile = async () => {
  console.log('go to watch profile')
  hideDropdown();
};

onMounted(() =>{
  console.log(`${props.user.username} isFriend: ${isFriend.value}`)
  console.log(`${props.user.username} isMe: ${isMe.value}`)
  console.log(`${props.user.username} isAlreadySent: ${isAlreadySent.value}`)
})


</script>

<template>
  <div class="user-item">
    <img :src="user.photoUrl" alt="User Photo" class="user-photo">
    <div class="user-info" v-if="isMe">
      <h3>{{ user.username }}</h3>
      <h2>Twoj profil</h2>
    </div>
    <div class="user-info" v-else>
      <h3>{{ user.username }}</h3>
      <h2 v-if="isFriend">Znajomy</h2>
    </div>
    <div class="dropdown">
      <div class="icon-button" @click="showDropdown">
        <img src="@/assets/img/dots-icon.png" alt="User Options"/>
      </div>
      <div v-if="isShowDropdown" class="dropdown-content" @mouseleave="hideDropdown">
        <ul class="dropdown-list">
          <li @click="goToProfile" class="dropdown-option">Zobacz profil</li>
          <li @click="sendFriendRequest" v-if="!isAlreadySent && !isFriend" class="dropdown-option">Wyślij zaproszenie do znajomych</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/dropdown.css);

.user-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  position: relative;
  transition: .5s ease all;
}

.user-item:hover {
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  background-color: var(--lighter-main-transparent);
}

.user-photo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.user-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 10px;
}

.user-info h3 {
  margin: 0;
  font-size: 1.2em;
}
.user-info h2 {
  margin: 0;
  font-size: .8em;
  color: #444444;
}

.dropdown {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 999;
  transition: .5s ease all;
}

.dropdown-content {
  position: absolute;
  right: 0;
  top: 0;
  white-space: nowrap;
  z-index: 999;
  background-color: white;
  transition: .5s ease all;
}

</style>