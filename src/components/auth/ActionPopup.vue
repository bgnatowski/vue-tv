<script setup>
import {computed, ref} from "vue";
import paths from "@/router/routerPaths.js";
import {useRouter} from "vue-router";
import {changePassword, deleteUser} from "@/services/AuthenticationService.js";
import {useUserStore} from "@/stores/userStore.js";

// common for action popup//
const props = defineProps({
  actionType: String
})

const emits = defineEmits(['close']);
const errorMsg = ref('')
const router = useRouter();
function closePopup() {
  emits('close');
}

// delete action
const deleted = ref()
const password = ref("");

const isCompletedDeleteForm = computed(() => {
  return !password.value;
})

async function confirmDeleteAccount(password) {
  try {
    deleted.value = await deleteUser(password);
    if(deleted.value) {
      useUserStore().logout();
      await router.push(paths.DELETE_ROUTE);
    }
  } catch (error) {
    errorMsg.value = error;
  }
}


// change password action
const changed = ref()

const currentPassword = ref("");
const newPassword1 = ref("");
const newPassword2 = ref("");
const isCompletedChangeForm = computed(() => {
  return !currentPassword.value && (newPassword1 != newPassword2);
})

async function confirmChangePassword(current, password1, password2) {
  try {
    changed.value = await changePassword(current, password1, password2);
  } catch (error) {
    errorMsg.value = error;
  }
}
</script>

<template>
  <div class="overlay">
    <div class="panel-container">
      <div class="close-bar">
        <div class="icon-button" @click="closePopup">
          <img src="@/assets/close-icon.png" alt="Close icon"/>
        </div>
      </div>
<!--DELETE ACCOUNT-->
      <form class="action-form" v-if="actionType === 'delete'">
        <h1>Usuń konto</h1>
        <input type="password" placeholder="Wpisz swoje obecne hasło" v-model="password">
        <button
            @click.prevent="confirmDeleteAccount(password)"
            :disabled="isCompletedDeleteForm"
            class="action-button">Potwierdz
        </button>
        <p v-if="deleted">Będziemy tęsknić :(</p>
        <p v-else>{{ errorMsg }}</p>
      </form>
<!--CHANGE PASSWORD-->
      <form class="action-form" v-if="actionType === 'change'">
        <h1>Zmień hasło</h1>
        <input type="password" v-model="currentPassword" placeholder="Obecne hasło">
        <input type="password" v-model="newPassword1" placeholder="Nowe hasło">
        <input type="password" v-model="newPassword2" placeholder="Wpisz ponownie nowe hasło">
        <button
            @click.prevent="confirmChangePassword(password)"
            :disabled="isCompletedChangeForm"
            class="action-button">Potwierdz
        </button>
        <p v-if="changed">Hasło zmienione</p>
        <p v-else>{{ errorMsg }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/auth-common.css);

.panel-container {
  flex-direction: column;
  background-color: white;
  width: 25vw;
  height: auto;
  padding: 1em;
}

.panel-container h1 {
  font-size: 1.5em;
}

.panel-container form {
  padding: .8em;
  font-size: .8em;
  width: 100%
}

.delete-account-form input {
  font-size: 1em;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.action-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: .5em;
}

.close-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-height: 10%;
  width: 100%;
}

.icon-button {
  border-radius: 2em;
  padding: 10px;
}

.icon-button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (min-width: 2000px) {
  .icon-button {
    border-radius: 2em;
    padding: 10px;
    width: 50px;
    height: 50px;
  }
}
</style>