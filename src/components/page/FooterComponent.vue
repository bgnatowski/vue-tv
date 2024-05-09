<script setup>
</script>

<template>
  <footer class="footer">
    <h3>VueTV</h3>
    <div class="content">
      <p>Piotr Grochala | Bartosz Gnatowski | Kamil Rachwał</p>
      <p>ZIISS2-1211 | Grupa D</p>
    </div>
    <h3>2024</h3>
  </footer>
</template>

<style scoped>
.footer {
  z-index: 0;
  position: fixed;
  bottom: 0;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 1em;
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
  font-size: .5em;
  padding: .1rem;
}

@media(max-width: 1000px){
  .footer{
    display: none;
  }
}

</style>