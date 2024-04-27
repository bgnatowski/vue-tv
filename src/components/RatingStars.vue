<script setup>
import Rating from "primevue/rating";
import {ref} from "vue";

const value = ref(5)

</script>

<template>
  <div class="rating-container">
    <Rating v-model="value" :stars="5">
      <template #cancelicon>
        <img class="cancel-icon" src="@/resources/rating/cancel.png" height="24" width="24"/>
      </template>
      <template #onicon>
        <img src="@/resources/rating/custom-onicon.png" height="24" width="24"/>
      </template>
      <template #officon>
        <img src="@/resources/rating/custom-officon.png" height="24" width="24"/>
      </template>
    </Rating>
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
  width: 35%
}

.p-rating {
  display: flex;
  gap: 2px;
  cursor: pointer;
}


</style>