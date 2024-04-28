<script setup>

import {ref} from "vue";

const props = defineProps({
  watched: Boolean,
})

const minutes = ref(12345)

function minutesToText(minutes) {
  let days = Math.floor(minutes / (60 * 24));
  let hours = Math.floor((minutes % (60 * 24)) / 60);
  let restMinutes = minutes % 60;

  let text = [];

  if (days > 0) {
    text.push(days === 1 ? `${days} dzień` : `${days} dni`);
  }
  if (hours > 0 || days > 0) { // Dodajemy "0h" jeśli są dni, ale nie ma godzin
    text.push(`${hours} h`);
  }
  if (restMinutes > 0 || (!days && !hours)) { // Dodajemy minuty jeśli są lub gdy dni i godziny wynoszą zero
    text.push(`${restMinutes} min`);
  }

  return text.join(' ');
}
</script>

<template>
  <section class="post">
    <div v-if="props.watched" class="info-tile">
      <h1>Filmy obejrzane</h1>
      <p>Do tej pory spedziłeś:
        <strong v-text="minutesToText(minutes)"></strong>
        na obejrzeniu wszyskich filmów!
      </p>
    </div>
    <div v-else class="info-tile">
      <h1>Filmy do zobaczenia</h1>
      <p>Aby obejrzeć wszystko z tej listy, będziesz potrzebował:
          <strong v-text="minutesToText(minutes)"></strong>
      </p>
    </div>
  </section>
</template>

<style>
.info-tile p {
  font-weight: 400;
  font-size: 1.1em;
}
</style>
  