<script setup>
import {onBeforeMount, reactive, ref} from 'vue';
import routerPaths from "@/router/routerPaths.js";
import {useRouter} from "vue-router";
import ActionPopup from "@/components/auth/ActionPopup.vue";
import {useAuthStore} from "@/stores/AuthStore.js";

const showChangePasswordPopup = ref(false);
const showDeleteAccountPopup = ref(false);
const showChangeAvatarPopup = ref(false);

const router = useRouter();
const authStore = useAuthStore();
let user = {};
onBeforeMount(() => {
  user = authStore.user
})
</script>

<template>
  <section class="feed-container">
    <div class="post">
      <div class="profile-picture">
        <img :src="user.photoUrl" alt="profile avatar" class="user-profile-pic">
        <p class="user-name">{{ user.username }}</p>
      </div>
      <div class="settings-actions">
        <button @click="showChangePasswordPopup=true" class="action-button">Zmień hasło</button>
        <button @click="showDeleteAccountPopup=true" class="action-button">Usuń konto</button>
        <button @click="showChangeAvatarPopup=true" class="action-button">Zmień zdjęcie profilowe</button>
        <button class="action-button" @click="router.push(routerPaths.LOGOUT_ROUTE)">Wyloguj</button>
      </div>
      <ActionPopup action-type="changePassword" v-if="showChangePasswordPopup" @close="showChangePasswordPopup=false"></ActionPopup>
      <ActionPopup action-type="delete" v-if="showDeleteAccountPopup" @close="showDeleteAccountPopup=false"></ActionPopup>
      <ActionPopup action-type="changeAvatar" v-if="showChangeAvatarPopup" @close="showChangeAvatarPopup=false"></ActionPopup>
    </div>
  </section>
</template>

<style scoped>
@import url(@/assets/auth-common.css);
.profile-picture {
  display: flex;
  padding: 2rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 200px;
  height: 200px;
  margin: 1.5em auto;
}

.profile-picture {
  text-align: center;
}

.user-profile-pic {
  height: 8rem;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
}

.user-name {
  font-size: 1.5rem;
  margin-top: 1rem;
}

.settings-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: .5rem auto .2rem auto;
  gap: .2em;
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
