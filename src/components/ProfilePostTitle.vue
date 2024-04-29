<script>
export default {
  name: "ProfilePostTitle"
}
</script>

<template>
  <div class="info-post">
    <div class="post">
      <div class="info-tile">
        <h1><slot></slot></h1>
      </div>
    </div>
  </div>
</template>



<style scoped>
.info-post {
  width: 100%;
}

.info-tile {
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
}

@media (max-width:300px){
  .info-tile {
    font-size: .7em;
    white-space: break-spaces;
  }
}
</style>