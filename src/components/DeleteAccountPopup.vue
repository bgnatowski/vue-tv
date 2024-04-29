<script setup>
import movie from "@/models/movie";
import RatingStars from "@/components/RatingStars.vue";

const props = defineProps({
  movie: Object
});

const emits = defineEmits(['close']);

// Funkcja do emitowania zdarzenia zamknięcia popupa
function closePopup() {
  emits('close');
}

function confirmDeleteAccount() {
  console.log("Usuwanie konta")
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
        <form class="delete-account-form">
          <h1>Usuń konto</h1>
          <input type="password" placeholder="Wpisz swoje obecne hasło">
          <div class="buttons"></div>
          <button @click="confirmDeleteAccount" class="action-button">Potwierdź</button>
          <p>Będziemy tęsknić :(</p>
        </form>
      </div>
    </div>
</template>
<style scoped>
@import url(@/assets/auth-common.css);
.panel-container{
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

.panel-container form label {
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

.delete-account-form {
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


@media screen and (max-width: 737px) {

}

@media screen and (max-width: 300px) {
  .lower-bar,
  .upper-bar {
    min-height: auto;
  }

}
</style>