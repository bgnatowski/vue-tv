<script setup>

</script>

<template>
  <div class="form-container">
    <h1>Przykladowy popup</h1>
    <p>lorem ipsum dolomir</p>
    <button type="submit" class="login-button">Button</button>
  </div>
</template>

<style scoped>
.form-container {
  z-index: 10; /* Upewnij się, że formularz znajduje się nad obrazami tła */
  max-width: 600px; /* Maksymalna szerokość formularza */
  margin: auto; /* Centrowanie formularza */
  padding: 20px;
  background-color: #fff; /* Tło dla formularza */
  border-radius: 10px; /* Delikatne zaokrąglenie narożników */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtelny cień dla formularza */
  /* Reszta Twojego CSS dla formularza */
}
</style>