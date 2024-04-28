<script setup>
import Rating from "primevue/rating";
import {ref} from "vue";

const props = defineProps({
  readOnly: Boolean
})

const value = ref(4.5)
const isPointer = ref(props.readOnly ? 'default' : 'pointer');

</script>

<template>
  <div class="rating-container">
    <Rating v-model="value" :readonly="readOnly" :cancel="!readOnly">
      <template #cancelicon>
        <img class="cancel-icon" src="@/assets/rating/cancel.png" height="24" width="24"/>
      </template>
      <template #onicon>
        <img src="@/assets/rating/custom-onicon.png" height="24" width="24"/>
      </template>
      <template #officon>
        <img src="@/assets/rating/custom-officon.png" height="24" width="24"/>
      </template>
    </Rating>
    <p v-if="readOnly" class="real-value" v-text="value"></p>
  </div>

</template>

<style scoped>
.cancel-icon {
  margin-top: 1px;
}

.rating-container {
  display: flex;
  box-shadow: 0 0px 5px 2px rgba(0, 0, 0, 0.25);
  background-color: transparent;
  border-radius: 2em;
  justify-content: center;
  align-content: center;
  width: 9rem;
  padding-top: 3px;
}

.rating-container .real-value {
  margin-top: 2px;
  padding-left: 5px;
  text-align: center;
  font-weight: 600;
}

.p-rating {
  display: flex;
  gap: 2px;
  cursor: v-bind(isPointer);
}

.pointer {
  cursor: pointer;
}

</style>