<template>
  <header class="header">
    <nav class="nav">
      <h1 class="logo">VueTV</h1>
      <form class="search-form">
        <input type="text" id="search" class="search-input" placeholder="Szukaj" />
      </form>
      <button class="icon-button" aria-label="Settings">
        <img src="@/resources/night-mode.png" alt="Settings icon" class="icon" />
      </button>
      <router-link to="/profile"> 
        <button class="icon-button" aria-label="User profile">
          <img src="@/resources/user.png" alt="User profile icon" class="icon" />
        </button>
      </router-link>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 4px 13px rgba(0, 0, 0, 0.25);
  gap: 20px;
  padding: 15px 25px;
}

.logo {
  color: #3dccc7;
  flex-grow: 1;
  font: 400 40px Bruno Ace, sans-serif;
  margin: auto 0;
  text-align: left;
  margin-right: auto;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #848484;
  font-size: 28px;
  font-weight: 600;
  gap: 20px;
  height: 5vh;
}


.search-form {
  flex-grow: 1;
  margin: 0 20px;
  padding: 8px 15px;
  border-radius: 36px;
  text-align: left;
  border: none;
  
}

.search-input {
  width: 35vw;
  box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.15);
  border-radius: 36px;
  border-color: #fff;
  font-family: Red Hat Display, sans-serif;
  padding: 22px 60px 22px 60px;
  border: transparent;
  height: 1vh;
}


.icon-button {
  align-self: stretch;
  background: none;
  border: none;
  cursor: pointer;
  margin: auto 0;
  padding: 0;
}


.icon {
  aspect-ratio: 1;
  object-fit: contain;
  width: 34px;
}


@media (max-width: 767px) {
  .search-input {
    max-width: 50%;
    padding: 10px 30px 10px 30px;
    margin-top: 1px;
    /* max-height: 10%; */
  }
  .search-form {
    max-width: 20%;
    max-height: 10%;
  }
  .nav {
    flex-wrap: wrap;
    max-width: 100%;
  }
  .logo {
    font-size: 20px;
  }
  .header {
    flex-wrap: wrap;
    padding: 0 20px;
  }
  .icon {
  width: 20px;
}
}
</style>