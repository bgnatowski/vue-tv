<script setup>
import {onBeforeMount, ref, watch} from "vue";
import {usePostStore} from "@/stores/PostStore.js";

// --------------- PROPS AND EMITS ------------------//
const props = defineProps({
  postData: {
    id: '',
    title: '',
    duration: 0,
    posterPath: 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-3-696x1024.jpg',
    genres: [],
    userRating: 0
  },
});
const emits = defineEmits(['close', 'edited']);
// -------------------------
const postStore = usePostStore();
const isSaved = ref(false);

const content = ref('');
const readOnly = ref(false);

const handleContent = () => {
  console.log('update:', content.value);
}

const existingPost = ref(null);
onBeforeMount(() =>{
  existingPost.value = postStore.getUserPostByMovieId(props.postData.id)
  if(existingPost){
    content.value = existingPost.value.content
    readOnly.value = true
  }
})

function closePopup() {
  emits('close');
}

const deletePost = () => {
  postStore.deleteUserPost(existingPost.value.id)
  isSaved.value = false;
  content.value = '';
  readOnly.value = false;
  closePopup();
}

const sendPost = () => {
  let postDetails = {
    movie: props.movie,
    content: content.value
  }
  console.log('Proba utworzenia posta: ', postDetails)
  postStore.createUserPost(postDetails);
  isSaved.value = true;
  readOnly.value = true;
  //fetch jesli nie sfetchowano
}


</script>
<template>
  <div class="overlay">
    <div class="post popup">
      <div class="popup-card">
        <div class="upper-bar flex-column">
          <h1 class="popup-title">Utwórz publiczną recenzje</h1>
          <h1 class="popup-subtitle">Film: {{postData.title}}</h1>
          <textarea @input="handleContent"
                    v-model="content"
                    :readonly="readOnly"
                    :class="readOnly ? 'disable-grey' : ''"
                    class="note-area"
                    placeholder="Napisz coś o filmie :)"
                    maxlength="500"
          >
          </textarea>
        </div>
        <div class="lower-bar">
          <div class="popup-action-buttons">
            <div class="icon-button flex-column" @click="deletePost">
              <img src="@/assets/img/delete-icon.png" alt="Delete icon"/>
              <span class="button-span">Usuń</span>
            </div>
            <div class="icon-button flex-column" @click="sendPost">
              <img src="@/assets/img/send-icon.png" alt="Send icon"/>
              <span class="button-span">Publikuj</span>
            </div>
          </div>
          <span class="span-info" v-if="isSaved && readOnly">Opublikowano</span>
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