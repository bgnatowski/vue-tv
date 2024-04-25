<script setup>
</script>

<template>
  <div class="footer">
    <h3>VueTV</h3>
    <div class="content">
      <p>Piotr Grochala | Bartosz Gnatowski | Kamil Rachwał</p>
      <p>ZIISS2-1211 | Grupa D</p>
    </div>
    <h3>2024</h3>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: calc((.2em + .2vmin) + (.2em + .2vmax));
  color: #000;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  text-align: center;
}

h3 {
  color: var(--main-color);
  font-family: "Bruno Ace", sans-serif;
  font-weight: 400;
  padding: .2rem;
  margin-left: 2rem;
  margin-right: 2rem;
}

.content{
  flex-grow: 1;
  padding: .1rem;
}

p {
  font-family: "Bruno Ace", sans-serif;
  font-size: calc((.2em + .2vmin) + (.2em + .2vmax));
  padding: .1rem;
}

</style>