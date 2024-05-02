<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import paths from "@/router/routerPaths.js";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/AuthStore.js";
import {storage} from "@/js/firebase.js";
import {ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage';

// common for action popup//
const props = defineProps({
  actionType: String,
  isGoogleUser: Boolean
})


const emits = defineEmits(['close']);

const authStore = useAuthStore();
const router = useRouter();

const errorMsg = ref('')

function closePopup() {
  emits('close');
}

// delete action
const password = ref('');
const username = ref('');

const isCompletedDeleteForm = computed(() => {
  return password.value.length != 0;
})

const isCompletedDeleteGoogleForm = computed(() => {
  return username.value.length != 0;
})

async function confirmDeleteAccount(password) {
  try {
    let isDeleted = await authStore.deleteUser(password);
    if (isDeleted)
      await router.push(paths.DELETE_ROUTE);
  } catch (error) {
    errorMsg.value = error;
  }
}

async function confirmDeleteGoogleAccount(username) {
  try {
    console.log("confirmDelete: ", username)
    let isDeleted = await authStore.deleteGoogleUser(username);
    if (isDeleted)
      await router.push(paths.DELETE_ROUTE);
  } catch (error) {
    errorMsg.value = error;
  }
}

// change password action
const changedPassword = ref()

const credentials = reactive({
  currentPassword: '',
  newPassword1: '',
  newPassword2: ''
});

const isCompletedChangePasswordForm = computed(() => {
  return credentials.currentPassword.length != 0 && credentials.newPassword1.length != 0 && credentials.newPassword2.length != 0 &&
      (credentials.newPassword1 == credentials.newPassword2);
})

async function confirmChangePassword(credentials) {
  try{
    changedPassword.value = await authStore.changePassword(credentials)
  }catch(error){
    errorMsg.value = error
  }
}

// change image action
const changedAvatar = ref()
const file = ref();

async function handleImageUpload(event) {
  file.value = event.target.files[0];
  if (!file) return;
}

async function updateProfilePhotoURL() {
  try {
    if (file.value) {
      const timestamp = Date.now();
      const storagePath = `profilePictures/${authStore.user.uuid}/${timestamp}-${file.value.name}`;
      const fileRef = storageRef(storage, storagePath);
      const metadata = {
        contentType: file.value.type
      };
      await uploadBytes(fileRef, file.value, metadata);
      const downloadUrl = await getDownloadURL(fileRef);
      await authStore.updateUserPhotoURL(downloadUrl);
    } else {
      const fileRef = storageRef(storage, 'profilePictures/default-user-photo.png');
      const defaultUrl = await getDownloadURL(fileRef);
      await authStore.updateUserPhotoURL(defaultUrl);
    }
    changedAvatar.value = true;
  } catch (error) {
    errorMsg.value = 'Nie udało się przesłać obrazka.';
  }
}
</script>

<template>
  <div class="overlay">
    <div class="panel-container">
      <div class="close-bar">
        <div class="icon-button" @click="closePopup">
          <img src="@/assets/img/close-icon.png" alt="Close icon"/>
        </div>
      </div>
      <!--DELETE ACCOUNT-->
      <form @submit.prevent="confirmDeleteAccount(password)" class="action-form" v-if="actionType === 'delete' && !isGoogleUser">
        <h1>Usuń konto</h1>
        <label id="password" for="password">Hasło</label>
        <input type="password" placeholder="Wpisz swoje obecne hasło" v-model="password">
        <button
            type="submit"
            :disabled="!isCompletedDeleteForm"
            class="action-button">Potwierdz
        </button>
        <p>{{ errorMsg }}</p>
      </form>
      <!--DELETE GOOGLE ACCOUNT-->
      <form @submit.prevent="confirmDeleteGoogleAccount(username)" class="action-form" v-if="actionType === 'delete' && isGoogleUser">
        <h1>Usuń konto</h1>
        <label id="username" for="username">Nazwa użytkownika</label>
        <input type="username" placeholder="Wpisz swoją nazwę użytkownika" v-model="username">
        <button
            type="submit"
            :disabled="!isCompletedDeleteGoogleForm"
            class="action-button">Potwierdz
        </button>
        <p>{{ errorMsg }}</p>
      </form>
      <!--CHANGE PASSWORD-->
      <form @submit.prevent="confirmChangePassword(credentials)" class="action-form" v-if="actionType === 'changePassword'" >
        <h1>Zmień hasło</h1>
        <label>Obecne hasło:</label>
        <input type="password" v-model="credentials.currentPassword" placeholder="Obecne hasło">
        <label>Nowe hasło:</label>
        <input type="password" v-model="credentials.newPassword1" placeholder="Nowe hasło">
        <label>Powtórz nowe hasło:</label>
        <input type="password" v-model="credentials.newPassword2" placeholder="Wpisz ponownie nowe hasło">
        <button type="submit" :disabled="!isCompletedChangePasswordForm" class="action-button">Potwierdz</button>
        <p v-if="changedPassword">Hasło zmienione</p>
        <p v-else>{{ errorMsg }}</p>
      </form>
      <!--CHANGE USER IMAGE-->
      <form class="action-form" v-if="actionType === 'changeAvatar'">
        <h1>Zmień zdjęcie profilowe</h1>
        <input type="file" @change="handleImageUpload" accept="image/png, image/jpeg"/>
        <button
            @click.prevent="updateProfilePhotoURL"
            :disabled="!file"
            class="action-button">Zmień
        </button>
        <button
            @click.prevent="updateProfilePhotoURL"
            :disabled="file"
            class="action-button">Usuń
        </button>
        <p v-if="changedAvatar">Awatar zmieniony</p>
        <p v-else>{{ errorMsg }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/auth-common.css);
@import url(@/assets/buttons.css);

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

.action-button {
  margin: 5px;
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