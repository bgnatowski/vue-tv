<script setup>
import {computed, onBeforeMount, onMounted, reactive, ref} from 'vue';
import routerPaths from "@/router/routerPaths.js";
import {useRouter} from "vue-router";
import ActionPopup from "@/components/auth/ActionPopup.vue";
import changeImageIcon from '@/assets/img/change-image-icon.png';
import {useAuthStore} from "@/stores/AuthStore.js";
import {useUserStore} from "@/stores/UserStore.js";

// ---------------------- STORES ----------------- //

const router = useRouter();
const userStore = useUserStore();
const authStore = useAuthStore();
// ----------------- FIELDS/ACTIONS -------------------//
const showChangePasswordPopup = ref(false);
const showDeleteAccountPopup = ref(false);
const showChangeAvatarPopup = ref(false);
const isGoogleAuth = ref(true);

const user = reactive({
  username: computed(() => userStore.getUsername),
  photoUrl: computed(() => userStore.getPhotoUrl),
});

isGoogleAuth.value = computed( () => {
  isGoogleAuth.value = authStore.isGoogleUser()
})

onMounted( () => {
  console.log("username: ", user.username)
  console.log("photoUrl: ", user.photoUrl)
})

</script>`

<template>
  <section class="feed-container">
    <div class="post">
      <div @click="showChangeAvatarPopup=true" class="profile-picture">
        <img :src="user.photoUrl" alt="profile avatar" class="user-profile-pic">
        <img :src="changeImageIcon" alt="change icon" class="change-image-icon">
      </div>
      <p class="user-name">{{ user.username }}</p>
      <div class="settings-actions">
        <button v-if="!isGoogleAuth" @click="showChangePasswordPopup=true" class="action-button">Zmień hasło</button>
        <button @click="showDeleteAccountPopup=true" class="action-button">Usuń konto</button>
        <button class="action-button" @click="router.push(routerPaths.LOGOUT_ROUTE)">Wyloguj</button>
      </div>
      <ActionPopup :is-google-user="isGoogleAuth" action-type="changePassword" v-if="showChangePasswordPopup"
                   @close="showChangePasswordPopup=false"></ActionPopup>
      <ActionPopup :is-google-user="isGoogleAuth" action-type="delete" v-if="showDeleteAccountPopup"
                   @close="showDeleteAccountPopup=false"></ActionPopup>
      <ActionPopup action-type="changeAvatar" v-if="showChangeAvatarPopup"
                   @close="showChangeAvatarPopup=false"></ActionPopup>
    </div>
  </section>
</template>

<style scoped>
@import url(@/assets/auth-common.css);
@import url(@/assets/buttons.css);

.profile-picture {
  display: flex;
  position: relative;
  overflow: hidden;
  padding: 1em;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 200px;
  height: 200px;
  margin: auto;
  cursor: pointer;
}

.profile-picture:hover .user-profile-pic {
  filter: brightness(80%);
}

.profile-picture:hover .change-image-icon {
  opacity: 1;
}

.user-profile-pic {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
  transition: filter 0.3s;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  border: 2px solid var(--lighter-main)
}

.change-image-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20%;
  height: 20%;
  object-fit: contain;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none; /* Zapobiega interakcji z ikoną */
}

.settings-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: .5rem auto .2rem auto;
  gap: .2em;
}

.user-name {
  font-size: 1.5rem;
  margin: 1rem auto;
  text-align: center;
  justify-self: center;
}

.settings-actions button {
  min-width: 100%;
  white-space: nowrap;
  border-radius: 3em;
  background-color: var(--main-color);
  padding: 1em;
  border: 2px solid var(--main-color);
  color: #fff;
  font-size: calc((.2em + .5vmin) + (.2em + .5vmax));
  font-weight: 600;
  cursor: pointer;
}

button:hover:enabled {
  background-color: var(--lighter-main);
  border: 2px solid var(--lighter-main);
  -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
}

</style>
