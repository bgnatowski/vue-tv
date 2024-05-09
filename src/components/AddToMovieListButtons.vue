<script setup>
import {useMovieStore} from "@/stores/MovieStore.js";
import {useUserStore} from "@/stores/UserStore.js";
import {computed} from "vue";

// ------------------ PROPS AND EMITS -----------------------//
const props = defineProps({
  movieDetails: Object,
  noInfoButton: Boolean
})
const emit = defineEmits([
  'show-details',
]);

// ------------------- INSTANCJE STORES -------------------//
const movieStore = useMovieStore();

// ------------------- MOVE TO USER LIST ----------------------//
const moveToWatched = () => {
  movieStore.createCurrentUserMovie({
    mId: props.movieDetails.id,
    isWatched: false
  });
};

const moveToWatch = () => {
  movieStore.createCurrentUserMovie({
    mId: props.movieDetails.id,
    isWatched: true
  });
};

// ---------------------------POKAZANIE POPUPU ----------------//
const showDetails = () => {
  emit('show-details', {
    movie: props.movieDetails,
    onWatched: isOnWatched.value,
    onToWatch: isOnToWatch.value
  });
}

// ---------------------- IS ON LIST? --------- //
const isOnWatched = computed(() => movieStore.isOnWatched(props.movieDetails.id))
const isOnToWatch = computed(() => movieStore.isOnToWatch(props.movieDetails.id))

</script>

<template>
  <div class="buttons" :class="noInfoButton ? 'flex-row' : ''">
    <button class="card-action-buttons" :class="noInfoButton ? 'card-flex' : ''" @click="moveToWatch" v-if="!(isOnToWatch || isOnWatched)">
      <div class="card-action-icon">
        <i class="plus-sign">+</i>
        <img src="@/assets/img/watching-a-movie.png" alt="To Watch"/>
      </div>
      <span class="button-span">Do obejrzenia</span>
    </button>
    <button class="card-action-buttons" :class="noInfoButton ? 'card-flex' : ''" @click="moveToWatched" v-if="!(isOnToWatch || isOnWatched)">
      <div class="card-action-icon">
        <i class="plus-sign">+</i>
        <img src="@/assets/img/video.png" alt="To Watched"/>
      </div>
      <span class="button-span">Do obejrzanych</span>
    </button>
    <button class="card-action-buttons" :class="noInfoButton ? 'card-flex' : ''" @click="showDetails" v-if="!noInfoButton">
      <div class="card-action-icon">
        <img src="@/assets/img/info-icon.png" alt="Info"/>
      </div>
      <span class="button-span">Więcej informacji</span>
    </button>
  </div>
  <div class="list-info" v-if="(isOnToWatch || isOnWatched)">
    <span class="on-list" v-if="isOnWatched">Na liście: obejrzane</span>
    <span class="on-list" v-else-if="isOnToWatch">Na liście: do obejrzenia</span>
  </div>
</template>
<style scoped>
@import url(@/assets/movie-buttons.css);

.buttons {
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: min-content;
  align-content: center;
  text-align: center;
}

.card-action-buttons {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  background-color: transparent;
  border: none;
  min-width: 112px;
}
.card-flex{
  flex-direction: row;
}

.card-action-icon{
  display: flex;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
}

.card-action-buttons .button-span {
  display: none;
  font-size: .5em;
  text-align: center;
  align-self: center;
  line-height: 1.2;
  width: min-content;
  margin-right: 20px;
}

.card-action-buttons:hover .button-span {
  display: block;
}

.plus-sign{
  display: block;
  position: absolute;
  transform: translateX(-200%) translateY(30%);
  font-size: .8em;
}

.list-info{
  display: flex;
  position: absolute;
  flex-direction: column;
  align-self: flex-end;
}

.on-list {
  font-size: 0.7em;
  font-weight: 600;
  color: var(--main-color);
}

@media screen and (max-width: 800px) {
  .buttons {
    height: auto;
    width: auto;
  }
  .card-action-buttons {
    min-height: unset;
    flex-direction: row-reverse;
    justify-content: flex-start;
    align-self: flex-start;
    min-width: 112px;
    height: auto;

    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    background-color: transparent;
    border: none;
  }

  .card-action-icon {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
  .card-flex{
    flex-direction: row;
  }
}
@media screen and (max-width: 600px){
  .flex-row {
    min-height: unset;
  }
}

@media screen and (max-width: 500px) {

  .card-action-buttons {
    padding: 0;
  }

  .card-action-icon {
    height: 35px;
    width: 35px;
  }
  .list-info{
    white-space: break-spaces;
  }
}

</style>