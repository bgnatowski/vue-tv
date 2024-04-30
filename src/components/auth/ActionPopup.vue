<script setup>
import {computed, reactive, ref} from "vue";
import paths from "@/router/routerPaths.js";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/AuthStore.js";


// common for action popup//
const props = defineProps({
  actionType: String
})

const emits = defineEmits(['close']);

const authStore = useAuthStore();
const router = useRouter();

const errorMsg = ref('')

function closePopup() {
  emits('close');
}

// delete action
const deleted = ref()
const password = ref('');

const isCompletedDeleteForm = computed(() => {
  return !password.value;
})

function confirmDeleteAccount(password) {
  authStore.deleteUser(password)
      .then((isDeleted) => {
        if (isDeleted) {
          deleted.value = isDeleted
          router.push(paths.DELETE_ROUTE);
        }
      })
      .catch((error) => errorMsg.value = error);
}


// change password action
const changedPassword = ref()

const credentials = reactive({
  currentPassword: '',
  newPassword1: '',
  newPassword2: ''
});

const isCompletedChangePasswordForm = computed(() => {
  return !credentials.currentPassword && (credentials.newPassword1 != credentials.newPassword2);
})

function confirmChangePassword(credentials) {
  authStore.changePassword(credentials)
      .then((isUpdated) => {
        changedPassword.value = isUpdated;
      })
      .catch((error) => errorMsg.value = error)
}

// change image action
const changedAvatar = ref()
const isCompletedChangeAvatarForm = ref(false)

async function confirmChangeAvatar(image) {
  try {
    // changedAvatar.value = await
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
      <form class="action-form" v-if="actionType === 'changePassword'">
        <h1>Zmień hasło</h1>
        <input type="password" v-model="credentials.currentPassword" placeholder="Obecne hasło">
        <input type="password" v-model="credentials.newPassword1" placeholder="Nowe hasło">
        <input type="password" v-model="credentials.newPassword2" placeholder="Wpisz ponownie nowe hasło">
        <button
            @click.prevent="confirmChangePassword(password)"
            :disabled="isCompletedChangePasswordForm"
            class="action-button">Potwierdz
        </button>
        <p v-if="changedPassword">Hasło zmienione</p>
        <p v-else>{{ errorMsg }}</p>
      </form>
      <!--CHANGE USER IMAGE-->
      <form class="action-form" v-if="actionType === 'changeAvatar'">
        <h1>Zmień zdjęcie profilowe</h1>
        <!--        <input type="file" v-model="currentPassword" placeholder="Obecne hasło">-->
        <button
            @click.prevent="confirmChangeAvatar(password)"
            :disabled="isCompletedChangeAvatarForm"
            class="action-button">Zmień
        </button>
        <p v-if="changedAvatar">Awatar zmieniony</p>
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