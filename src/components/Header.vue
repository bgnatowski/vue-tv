<template>
  <header class="header">
    <h1 class="logo">VueTV</h1>
    <nav class="nav">
      <form class="search-form">
        <label for="search-input" class="visually-hidden">Szukaj</label>
        <input id="search-input" type="text" class="search-input" placeholder="Szukaj" />
      </form>
      <button class="nav-button" aria-label="Notifications">
        <img src="@/resources/contrast-icon.png" alt="" class="nav-icon" />
      </button>
      <button class="nav-button" aria-label="User profile">
        <img src="@/resources/person-icon.png" alt="" class="nav-icon" />
      </button>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 4px 13px rgba(0, 0, 0, 0.25);
  display: flex;
  gap: 20px;
  padding: 25px 35px;
}

@media (max-width: 991px) {
  .header {
    flex-wrap: wrap;
    padding: 0 20px;
  }
}

.logo {
  color: #3dccc7;
  flex-grow: 1;
  font: 400 48px Bruno Ace, sans-serif;
  margin: auto 0;
}

@media (max-width: 991px) {
  .logo {
    font-size: 40px;
  }
}

.nav {
  align-items: center;
  color: #848484;
  display: flex;
  font-size: 28px;
  font-weight: 600;
  gap: 20px;
  justify-content: space-between;
}

@media (max-width: 991px) {
  .nav {
    flex-wrap: wrap;
    max-width: 100%;
  }
}

.search-form {
  align-self: stretch;
  box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 991px) {
  .search-form {
    max-width: 100%;
  }
}

.search-input {
  align-items: start;
  background-color: #fff;
  border-radius: 36px;
  font-family: Red Hat Display, sans-serif;
  justify-content: center;
  padding: 22px 60px 22px 154px;
}

@media (max-width: 991px) {
  .search-input {
    max-width: 100%;
    padding: 0 20px 0 30px;
  }
}

.nav-button {
  align-self: stretch;
  background: none;
  border: none;
  cursor: pointer;
  margin: auto 0;
  padding: 0;
}

.nav-icon {
  aspect-ratio: 1;
  object-fit: contain;
  width: 44px;
}

.visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>