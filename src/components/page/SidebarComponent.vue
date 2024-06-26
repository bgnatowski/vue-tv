<script setup>
import paths from "@/router/routerPaths.js";
import {hasAcceptedInvitations, hasPendingInvitations} from "@/router/index.js";
import {computed} from "vue";

const showNotificationInvite = computed(() => {
  return hasPendingInvitations.value;
})

const showNotificationFriend = computed(() => {
  return hasAcceptedInvitations.value;
})

</script>
<template>
  <div class="sidebar">
    <router-link :to="paths.MAIN_ROUTE" class="router-link-custom">
      <template v-slot="{ isActive }">
        <div :class="['sidebar-button', { active: isActive }]">
          <div class="icon-button">
            <img src="../../assets/img/main.png" alt="Strona główna">
          </div>
          <span class="button-text">Strona główna</span>
        </div>
      </template>
    </router-link>
    <router-link :to="paths.MY_PROFILE_ROUTE" class="router-link-custom">
      <template v-slot="{ isActive }">
        <div :class="['sidebar-button', { active: isActive }]">
          <div class="icon-button">
            <img src="@/assets/img/person-icon.png" alt="Strona główna">
          </div>
          <span class="button-text">Twój profil</span>
        </div>
      </template>
    </router-link>
    <router-link :to="paths.TO_WATCH_ROUTE" class="router-link-custom">
      <template v-slot="{ isActive }">
        <div :class="['sidebar-button', { active: isActive }]">
          <div class="icon-button">
            <img src="@/assets/img/watching-a-movie.png" alt="Filmy do obejrzenia">
          </div>
          <span class="button-text">Filmy do obejrzenia</span>
        </div>
      </template>
    </router-link>
    <router-link :to="paths.WATCHED_ROUTE" class="router-link-custom">
      <template v-slot="{ isActive }">
        <div :class="['sidebar-button', { active: isActive }]">
          <div class="icon-button">
            <img src="@/assets/img/video.png" alt="Filmy obejrzane">
          </div>
          <span class="button-text">Filmy obejrzane</span>
        </div>
      </template>
    </router-link>
    <router-link :to="paths.FRIENDS_ROUTE" class="router-link-custom">
      <template v-slot="{ isActive }">
        <div :class="['sidebar-button', { active: isActive }]">
          <div class="icon-button">
            <div class="notification" v-if="showNotificationFriend">
              <img src="@/assets/img/notification-icon.png">
            </div>
            <img src="@/assets/img/friends.png" alt="Znajomi">
          </div>
          <span class="button-text">Znajomi</span>
        </div>
      </template>
    </router-link>
    <router-link :to="paths.INVITATIONS_ROUTE" class="router-link-custom">
      <template v-slot="{ isActive }">
        <div :class="['sidebar-button', { active: isActive }]">
          <div class="icon-button">
            <div class="notification" v-if="showNotificationInvite">
              <img src="@/assets/img/notification-icon.png">
            </div>
            <img src="@/assets/img/invitation.png" alt="Zaproszenia do znajomych">
          </div>
          <span class="button-text">Zaproszenia do znajomych</span>
        </div>
      </template>
    </router-link>
  </div>
</template>

<style scoped>
.sidebar-button.active {
  text-decoration: underline var(--main-color);
}

.sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  background: transparent;
  width: auto;
  margin: .5rem .5rem;
}

.router-link-custom {
  text-decoration: none;

}

.router-link-custom:hover {
  text-decoration: none;
}

.sidebar-button {
  border-radius: 1em;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  min-width: min-content;
  white-space: nowrap;
  background: transparent;
  border: none;
  width: 100%;
  cursor: pointer;
  padding: 20px;
  transition: .5s ease all;
}

.sidebar-button:hover {
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  background-color: var(--lighter-main-transparent);
}

.sidebar-button:active {
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  background-color: var(--clicked-button);
}

.button-text {
  color: #000;
  font-weight: 600;
  transition: .5s ease all;
}

.icon-button {
  margin-right: 1em;
  border-radius: unset;
}

.icon-button:hover {
  background-color: unset;
  border: none;
  box-shadow: unset;
}

.notification {
  margin: 0;
  width: 30px;
  height: 30px;
  background-color: #e31d1d;
  border-radius: 50%;
  display: block;
  padding: 4px;
  position: absolute;
  z-index: 999;
  transform: translateY(-50%) translateX(60%);
}

.notification img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}


@media screen and (max-width: 1200px) {
  .icon-button {
    margin: 0;
  }

  .button-text {
    transition: .5s ease all;
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .icon-button {
    margin: 0;
    height: 28px;
    width: 28px;
  }

  .button-text {
    transition: .5s ease all;
    display: none;
  }

  .sidebar-button {
    border-radius: 2.5em;
    padding: 18px;
  }

  .sidebar {
    margin: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    flex-direction: row;
    position: fixed;
    justify-content: space-evenly;
    align-items: center;
    z-index: 999;
    background-color: white;
    box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
    height: 75px;
  }

}

@media screen and (max-width: 500px) {
  .icon-button {
    height: 25px;
    width: 25px;
  }

  .sidebar {
    gap: 0;
    height: 70px;
  }

  .sidebar-button {
    padding: 17px;
  }
}

@media screen and (max-width: 460px) {
  .icon-button {
    height: 24px;
    width: 24px;
  }

  .sidebar-button {
    padding: 16px;
  }
}

@media screen and (max-width: 400px) {
  .icon-button {
    height: 23px;
    width: 23px;
  }


  .sidebar-button {
    padding: 15px;
  }
}

@media screen and (max-width: 320px) {
  .icon-button {
    height: 20px;
    width: 20px;
  }

  .sidebar {
    gap: 0;
    height: 60px;
  }

  .sidebar-button {
    padding: 13px;
  }
}

@media screen and (max-width: 280px) {
  .icon-button {
    height: 18px;
    width: 18px;
  }

  .sidebar-button {
    padding: 12px;
    overflow-y: auto;
  }
}

</style>
