<script setup>

</script>

<template>
  <div class="post">
      <div class="title-tile">
        <h1 class="bruno-ace-regular"><slot></slot></h1>
        <p>
          <slot name="p"></slot>
        </p>
        <strong>
          <slot name="strong"></slot>
        </strong>
      </div>
  </div>
</template>

<style scoped>
.title-tile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  /*white-space: nowrap;*/
  height: 100%;
}
.title-tile h1{
  text-align: center;
  font-size: 1.5em;
}

.title-tile p {
  font-weight: 400;
  font-size: 1em;
}
.title-tile strong {
  font-size: 1em;
}

@media (max-width: 1270px) {
  .title-tile h1 {
    font-size: 1.1em;
  }
}

@media (max-width: 700px) {
  .title-tile {
    font-size: .9em;
    white-space: break-spaces;
  }
  .title-tile p, .title-tile strong{
    font-size: .7em;
    white-space: break-spaces;
  }
}
</style>




  