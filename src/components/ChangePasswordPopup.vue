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

</script>
<template>
  <div class="overlay">
    <div class="post">
        <div class="close-bar">
          <div class="icon-button" @click="closePopup">
            <img src="@/assets/close-icon.png" alt="Close icon"/>
          </div>
        </div>
        <form class="change-password-form">
          <h3>Zmień hasło</h3>
          <input type="password" placeholder="Obecne hasło">
          <input type="password" placeholder="Nowe hasło">
          <input type="password" placeholder="Wpisz ponownie nowe hasło">
          <button @click="confirmChangePassword">Potwierdź</button>
        </form>

      </div>
    </div>
</template>
<style scoped>
.post {
  flex-direction: column;
  background-color: white;
  width: 80vw;
  height: 80vh;
  padding: 1em;
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

.change-password-form {
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

@media (min-width: 2000px){
  .icon-button {
    border-radius: 2em;
    padding: 10px;
    width: 50px;
    height: 50px;
  }
}


@media screen and (max-width: 737px) {

}

@media screen and (max-width: 300px)  {
  .lower-bar,
  .upper-bar{
    min-height: auto;
  }

}
</style>