<script setup>
import {ref} from "vue";
import {useUserStore} from "@/stores/UserStore.js";
import {useMovieStore} from "@/stores/MovieStore.js";

// ------------------------ STORES ------------------------------//
const userStore = useUserStore();
const movieStore = useMovieStore();

// ------------------------ PROPS AND EMITS --------------------//
const props = defineProps({
  onWatched: Boolean,
  onToWatch: Boolean,
  movie: {
    id: '',
    title: '',
  },
});

const emits = defineEmits(['close']);

function closePopup() {
  emits('close');
}


// -------------- TO LISTS ---------- //


// -----addNote-----
const addToWatch = async () => {
  let m = props.movie;
  await movieStore.createCurrentUserMovie({
    uId: userStore.uid,
    mId: m.id,
    isWatched: false
  });
  hideDropdown()
};


</script>
<template>
  <div class="overlay">
    <div class="post">
      <div class="movie-card">
        <div class="upper-bar">
          <div class="movie-details">
            <!-- <h1 class="movie-title">Notatka dla filmu: {{ movie.title }}</h1> -->
            <h1 class="movie-title">Notatka dla filmu: Godzilla</h1>
            <textarea class="note-area" placeholder="Twoja notatka..." maxlength="500"></textarea>
          </div>
        </div>
        <div class="lower-bar">
            <div class="icon-button" @click="deletePost">
                <img src="@/assets/img/delete-icon.png" alt="Delete icon"/>
            </div>
            <div class="icon-button" @click="savePost">
                <img src="@/assets/img/save-icon.png" alt="Save icon"/>
            </div>
        </div>
      </div>
      <div class="close-bar">
        <div class="icon-button" @click="closePopup">
          <img src="@/assets/img/close-icon.png" alt="Close icon"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.post {
  flex-direction: row;
  background-color: white;
  width: 90vw;
  height: 90vh;
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

.movie-card {
  overflow-y: auto;
  scrollbar-width: thin;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 15px;
}

.upper-bar {
  display: flex;
  height: 90%;
  width: 100%;
}
.lower-bar{
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin-top: 1rem;
}

.close-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: fit-content;
}

.icon-button {
  border-radius: 50%;
  padding: 5px;
}

.icon-button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.movie-details {
  display: flex;
  flex-direction: column;
  min-width: 50%;
  width: 100%;
  flex-grow: 0;
  flex-shrink: 1;

}

.icon-button:hover {
  background-color: var(--lighter-main);
  border: none;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
}

.icon-button:active {
  background-color: var(--clicked-button);
}



.movie-details .movie-title {
  font-size: 1.5em;
}

.note-area{
    height: 100%;
    width: 99%;
    margin-top: 1rem;
    margin-left: 1rem;
    resize: none;
}


@media (min-width: 2000px) {
  .icon-button {
    border-radius: 2em;
    padding: 10px;
    width: 50px;
    height: 50px;
  }
}


@media screen and (max-width: 1000px) {
  .close-bar .icon-button {
    width: 30px;
    height: 30px;
  }

  .movie-details .movie-title {
    font-size: 1.2em;
  }

}

@media screen and (max-width: 700px) {

  .close-bar .icon-button {
    width: 20px;
    height: 20px;
  }

  .movie-title {
    font-size: 1em;
  }
}
</style>