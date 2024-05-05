<script setup>
import {ref} from 'vue';
import {useUserStore} from "@/stores/UserStore.js";
import {useMovieStore} from "@/stores/MovieStore.js";
import {fetchMovieDetails} from "@/services/TVDBService.js";

// ----------- STORES ------------------//
const userStore = useUserStore();
const movieStore = useMovieStore();

// ---------- PROPS AND EMITS ---------- //
const props = defineProps({ user: Object });

// ----------- DROPDOWN --------------//
const isShowDropdown = ref(false);
const showDropdown = () => isShowDropdown.value = true;
const hideDropdown = () => isShowDropdown.value = false;

// ------------- SEND REQUEST -------------//
const sendFriendRequest = async () => {
  console.log('sending request...')
  hideDropdown();
};

// -------------- GO TO PROFILE ---------- //
const goToProfile = async () => {
  console.log('go to watch profile')
  hideDropdown();
};

</script>

<template>
  <div class="user-item">
    <img :src="user.photoUrl" alt="User Photo" class="user-photo">
    <div class="user-info">
      <h3>{{ user.username }}</h3>
    </div>
    <div class="dropdown">
      <div class="icon-button" @click="showDropdown">
        <img src="@/assets/img/dots-icon.png" alt="User Options"/>
      </div>
      <div v-if="isShowDropdown" class="dropdown-content" @mouseleave="hideDropdown">
        <ul class="dropdown-list">
          <li @click="goToProfile" class="dropdown-option">Zobacz profil</li>
          <li @click="sendFriendRequest" class="dropdown-option">Wyślij zaproszenie do znajomych</li>
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