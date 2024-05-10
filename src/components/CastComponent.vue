<script setup>

// ---------------- PROPS AND EMITS ------------//
const props = defineProps({
  cast: [],
})

</script>
<template>
  <div class="post">
    <h1>Aktorzy</h1>
    <div class="actors-scroll-wrapper">
      <div class="actors-container" v-dragscroll.x>
        <div class="actor" v-for="actor in cast" :key="actor.id">
          <div class="actor-poster">
            <img :src="actor.profilePath" alt="Movie poster"/>
          </div>
          <h1 class="actor-name">{{actor.name}}</h1>
          <h2 class="actor-character">Rola: {{actor.character}}</h2>
        </div>
      </div>
      <div class="fade-effect"></div>
    </div>
  </div>
</template>

<style scoped>
.post {
  margin: 5px;
  flex-direction: column;
  width: 100%;
  align-self: center;
  max-width: 700px;
}

.actor-name {
  padding: 5px;
  font-size: .8em;
}

.actor-character {
  padding: 5px;
  font-size: .6em;
}

.actors-scroll-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.actors-container {
  display: flex;
  align-items: flex-start;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  position: relative;
  width: 100%;
}

.fade-effect {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  pointer-events: none;
}

.actor-poster {
  width: 130px;
  height: 200px;
  flex-shrink: 0;
  padding: 0.2em;
  cursor: pointer;
}

.actor-poster img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 1.5em;
}


@media screen and (max-width: 1000px) {
  .post {
    max-width: 300px;
  }
}

@media screen and (max-width: 850px) {
  .post {
    max-width: 250px;
  }
}

@media screen and (max-width: 800px) {
  .post {
    max-width: 400px;
  }
}

@media screen and (max-width: 600px) {
  .post {
    max-width: inherit;
  }
}
</style>

  