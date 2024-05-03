<script setup>
import {onMounted, reactive, ref} from "vue";

const props = defineProps({
  id: Number,
  userImage: String,
  username: String,
  detail1: String,
  detail2: String
});

const isShowDropdown = ref(false)

function showDropdown() {
  isShowDropdown.value = true
}

function hideDropdown() {
  isShowDropdown.value = false;
}

const emit = defineEmits(['show-profile']);

function showProfile() {
  emit('show-profile');
  console.log('wyemitowano show profile');
}
</script>

<template>
  <div class="post">
    <div class="dropdown">
      <div class="icon-button" @click="showDropdown">
        <img src="@/assets/img/dots-icon.png" alt="Movie Options"/>
      </div>
      <div v-if="isShowDropdown" class="dropdown-content" @mouseleave="hideDropdown">
        <ul class="dropdown-list">
          <li @click="showProfile" class="dropdown-option">Pokaż profil</li>
          <li class="dropdown-option">Usun znajomego</li>
        </ul>
      </div>
    </div>
    <div class="profile-picture">
      <img
          class="friends-picture"
          :src="userImage"
          :alt="`Profile picture of ${username}`"
      />
    </div>
    <div class="friends-info">
      <h2 class="username">{{ username }}</h2>
      <div class="additional-details">
        <p class="additional-text">{{ detail1 }}</p>
        <p class="additional-text">{{ detail2 }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/dropdown.css);

.dropdown {
  top: auto;
  right: auto;
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

.additional-details {
  text-align: left;
  overflow: auto;
  white-space: normal;
  max-height: 100px;
  -webkit-overflow-scrolling: touch;
}

.additional-text {
  font-size: .8em;
  color: #555;
}

.dropdown-content {
  position: absolute;
  left: 0;
  top: 0; /* Aby dropdown rozkładał się bezpośrednio pod ikoną */
  white-space: nowrap; /* Zapobiega zawijaniu tekstu */
  z-index: 9999; /* Zapewnia, że dropdown będzie na wierzchu */
  background-color: white; /* Tło dla lepszej widoczności */
}

@media screen and (max-width: 800px) {
  .profile-picture {
    width: 150px;
    height: 150px;
  }

  .username {
    font-size: .8em;
  }

  .additional-text {
    font-size: .7em;
  }

  .additional-details {
    max-height: 50px;
  }
}

@media screen and (max-width: 1050px){
  .dropdown,
  .icon-button {
    width: 20px;
    height: 20px;
  }
}

@media screen and (max-width: 760px){
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

  .additional-details {
    max-height: 30px;
  }
}
</style>