<script setup>
import Rating from "primevue/rating";
import {ref} from "vue";

const props = defineProps({
  readOnly: Boolean,
  vertical: Boolean,
})

const value = ref(4.5)
const isPointer = ref(props.readOnly ? 'default' : 'pointer');
</script>


<template>
  <div class="rating-container" :class="vertical ? 'column' : ''">
    <Rating v-model="value" :readonly="readOnly" :cancel="!readOnly" :class="vertical ? 'column' : ''">
      <template #cancelicon>
        <img class="cancel-icon star-icon" src="@/assets/rating/cancel.png" alt="cancel"/>
      </template>
      <template #onicon>
        <img class="star-icon" src="@/assets/rating/custom-onicon.png" alt="star-fill"/>
      </template>
      <template #officon>
        <img class="star-icon" src="@/assets/rating/custom-officon.png" alt="star-unfilled"/>
      </template>
    </Rating>
    <p v-if="readOnly" class="real-value" v-text="value"></p>
  </div>

</template>

<style scoped>

.rating-container {
  display: flex;
  flex-direction: v-bind(direction);
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.25);
  background-color: transparent;
  border-radius: 2em;
  justify-content: left;
  align-content: center;
  padding-left: 8px;
  padding-right: 8px;
  width: fit-content;
}

.column {
  flex-direction: column;
}

.rating-container .real-value {
  text-align: center;
  align-self: center;
  font-weight: 600;
  font-size: 1em;
}

.p-rating {
  display: flex;
  cursor: v-bind(isPointer);
}

.pointer {
  cursor: pointer;
}

.cancel-icon {
  margin-top: 1px;
}

.star-icon {
  height: 24px;
  width: 24px;
}

@media screen and (max-width: 737px) {
  .star-icon {
    height: 20px;
    width: 20px;
  }

  .rating-container .real-value {
    font-size: .8em;
  }
}

@media screen and (max-width: 350px) {
  .star-icon {
    height: 16px;
    width: 16px;
  }
}

</style>