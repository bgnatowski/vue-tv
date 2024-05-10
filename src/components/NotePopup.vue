<script setup>
import {useMovieStore} from "@/stores/MovieStore.js";
import {onBeforeMount, ref} from "vue";

const movieStore = useMovieStore();

const props = defineProps({
  movieData: {
    id: '',
    title: '',
    note: ''
  },
});

const emits = defineEmits(['close', 'edited']);
const content = ref(props.movieData.note);
const isSaved = ref(false);
const readOnly = ref(props.movieData.note ? true : false);

function closePopup() {
  emits('close');
  emits('edited');
}

const deleteNote = () => {
  movieStore.modifyCurrentUserMovie(props.movieData.id, {note: ''});
  isSaved.value = false;
  content.value = '';
  readOnly.value = false;
  closePopup();
}

const saveNote = () => {
  movieStore.modifyCurrentUserMovie(props.movieData.id, {note: content.value});
  isSaved.value = true;
  readOnly.value = true;
  emits('edited');
}

const editNote = () => {
  readOnly.value = false;
  isSaved.value = false;
}

</script>
<template>
  <div class="overlay">
    <div class="post popup">
      <div class="popup-card">
        <div class="upper-bar flex-column">
          <h1 class="popup-title">Notatka dla filmu:</h1>
          <h1 class="popup-subtitle">{{movieData.title}}</h1>
          <textarea
                    v-model="content"
                    :readonly="readOnly"
                    :class="readOnly ? 'disable-grey' : ''"
                    class="note-area"
                    placeholder="Napisz notatkę..."
                    maxlength="500"
          >
          </textarea>
        </div>
        <div class="lower-bar">
          <div class="popup-action-buttons">
            <div class="icon-button flex-column" v-if="readOnly" @click="deleteNote">
              <img src="@/assets/img/delete-icon.png" alt="Delete icon"/>
              <span class="button-span">Usuń</span>
            </div>
            <div class="icon-button flex-column" v-if="readOnly" @click="editNote">
              <img src="@/assets/img/edit-icon.png" alt="Delete icon"/>
              <span class="button-span">Edytuj</span>
            </div>
            <div class="icon-button flex-column" @click="saveNote">
              <img src="@/assets/img/save-icon.png" alt="Save icon"/>
              <span class="button-span">Zapisz</span>
            </div>
          </div>
          <span class="span-info" v-if="isSaved && readOnly">Zapisano</span>
          <span class="span-left" v-if="!readOnly">Pozostało: {{ 500 - content.length }}/500</span>
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
@import url(@/assets/popup.css);

.upper-bar {
  height: 90%;
}
.lower-bar {
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  height: 20%;
}

.popup-action-buttons{
  display:flex;
  align-content: flex-end;
  justify-content: flex-end;
}

.icon-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  padding: 10px;
  transition: .3s ease all;
  cursor: pointer;
}

.button-span {
  font-size: .5em;
  text-align: center;
  padding: 2px;
}

.span-info {
  font-size: .7em;
  width: fit-content;
  align-self: center;
  justify-self: center;
  padding: 5px;
  color: red;
}

.span-left {
  font-size: .7em;
  align-self: flex-start;
  padding: 5px;
}


.note-area {
  padding: 5px;
  height: 100%;
  width: 100%;
  resize: none;
  border-radius: 5px;
  border: 1px solid var(--main-color);
  font-size: 1em;
  font-weight: normal;
  outline-color: var(--main-color);
}
.disable-grey{
  color: #cccccc;
  background-color: #eeeeee;
  border: 1px solid #cccccc;
  cursor: default;
  outline-color: unset;
}

</style>