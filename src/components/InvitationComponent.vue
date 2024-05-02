<script setup>
import {onMounted, reactive, ref} from "vue";

const props = defineProps({
  id: Number,
  userImage: String,
  username: String,
});

const isShowDropdown = ref(false)
const isShowButton = ref(true)

function showDropdown() {
  isShowDropdown.value = true
  isShowButton.value = false;
}

function hideDropdown() {
  isShowDropdown.value = false;
  isShowButton.value = true;
}

const emit = defineEmits(['show-profile', 'accept-user', 'decline-user']);

function showProfile() {
  emit('show-profile');
  console.log('wyemitowano show profile');
}

function handleAccept() {
  emit('accept-user');
  console.log('wyemitowano accept-user');
}

function handleDecline() {
  emit('decline-user');
  console.log('wyemitowano decline-user');
}
</script>

<template>
  <div class="post">
    <div class="profile-picture">
      <img
          class="friends-picture"
          :src="userImage"
          :alt="`Profile picture of ${username}`"
      />
    </div>
    <div class="friends-info">
      <h2 class="username">{{ username }}</h2>
      <div class="card-action-buttons">
        <div @click="handleAccept" class="card-action-icon" aria-label="Accept">
          <img src="@/assets/img/accept-icon.png" alt="Accpet icon"/>
        </div>
        <div  @click="handleDecline" class="card-action-icon" aria-label="Decline">
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
}

.post {
  width: 30%;
  height: auto;
  justify-content: flex-start;
}

.profile-picture {
  display: flex;
  padding: 1em;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-self: center;
  width: 200px;
  height: 200px;
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
  padding: .5em;
  justify-content: center;
}

.card-action-icon {
  height: 50px;
  width: 50px;
  border-radius: 2em;
  transition: .5s ease all;
  cursor: pointer;
}

.card-action-icon img{
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
    width: 150px;
    height: 150px;
  }

  .username {
    font-size: .8em;
  }

}

@media screen and (max-width: 460px) {
  .profile-picture {
    width: 100px;
    height: 100px;
  }

  .username {
    font-size: .6em;
  }

}
</style>