<script setup>
</script>

<template>
  <header class="header">
    <h1 class="logo">VueTV</h1>
    <p class="credits">
      Piotr Grochala | Bartosz Gnatowski | Kamil Rachwał | ZIISS2-1211 | Grupa D
    </p>
    <p class="year">2024</p>
  </header>
</template>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.25);
  display: flex;
  gap: 20px;
  font-size: 11px;
  color: #000;
  font-weight: 300;
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
}

.logo {
  color: #3dccc7;
  font: 400 12px "Bruno Ace", sans-serif;
}

.credits {
  font-family: "Red Hat Display", sans-serif;
  font-size: 10px;
  flex-grow: 1;
  flex-basis: auto;
}

.year {
  font-family: "Red Hat Display", sans-serif;
  font-size: 10px;
  margin: auto 0;
}
</style>