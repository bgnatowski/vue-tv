<script setup>
</script>

<template>
  <div class="footer">
    <h1 class="footer-logo">VueTV</h1>
    <div class="footer-content">
      <p class="footer-credits">
        Piotr Grochala | Bartosz Gnatowski | Kamil Rachwał
      </p>
      <p class="footer-groups">ZIISS2-1211 | Grupa D</p>
    </div>
    <p class="footer-year">2024</p>
  </div>
</template>

<style scoped>
.footer {
  background-color: #fff;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.25);
  display: flex;
  gap: 2em;
  font-size: calc((.2em + .2vmin) + (.25em + .25vmax));
  color: #000;
  font-weight: 300;
  text-align: center;
  width: 100%;
}

.footer-content {
  text-align: inherit;
  padding: inherit;
  display: flex;
  flex-direction: row;
  column-gap: 2em;
  margin: auto;
}

.footer-logo {
  color: #3dccc7;
  font-family: "Bruno Ace", sans-serif;
  font-weight: 600;
  font-size: 1em;
  margin: auto 0;
  padding-left: 2em;
}

.footer-credits {
  font-size: 1em;
  flex-grow: 1;
  flex-basis: auto;
}

.footer-year {
  font-size: 1em;
  margin: auto 0;
  padding-right: 2em;
}

</style>