<script setup>
import {useRouter} from "vue-router";
import SignInGoogleButton from "@/components/auth/AuthGoogleButton.vue";
import paths from "@/router/routerPaths.js";

const router = useRouter()

</script>

<template>
  <div class="panel-container">
    <div class="home-page">
      <div class="home-bar">
        <div class="bar-content">
          <h1 class="bar-logo">VueTV</h1>
          <p class="bar-description">
            To, co chcesz wiedzieć o swoich filmach - na wyciągnięcie ręki
          </p>
        </div>
        <div class="bar-buttons">
          <button @click="router.push(paths.REGISTER_ROUTE)" class="join-now-btn">Dołącz teraz</button>
          <button @click="router.push(paths.LOGIN_ROUTE)" class="login-btn">Zaloguj się</button>
          <SignInGoogleButton class="google-button"></SignInGoogleButton>
        </div>
      </div>
      <div class="home-image">
        <img src="@/assets/img/home-image.png" alt="VueTV main image"/>
      </div>
    </div>
    <div class="footer">
      <h3 class="footer-logo">VueTV</h3>
      <p>Piotr Grochala | Bartosz Gnatowski | Kamil Rachwał</p>
      <p>ZIISS2-1211 | Grupa D</p>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/auth-common.css);
@import url(@/assets/buttons.css);
.panel-container {
  background-color: #000;
  height: 100vh;
  overflow-x: hidden;
  border-radius: 0;
  margin: 0;
  border: none;
  box-shadow: none;
  width: 100%;
}

.home-page {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #000;
}

.bar-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bar-logo {
  color: var(--main-color);
  font-family: "Bruno Ace", sans-serif;
  font-size: calc((.4em + 2vmin) + (.4em + 2vmax));
  font-weight: 600;
  padding: 10px;
  margin-top: 2em;
}

.home-bar {
  display: flex;
  flex-direction: column;
  width: 40%;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background-color: #000;
  padding-bottom: 1em;
}

.bar-description {
  font-size: calc((.8em + .5vmin) + (.2em + .5vmax));
  width: 60%;
  color: #fff;
}

.bar-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: .2em;
}

.join-now-btn {
  border-radius: 3em;
  background-color: #3dccc7;
  padding: 1em 2em;
  border: none;
  color: #fff;
  font-size: calc((.2em + .5vmin) + (.2em + .5vmax));
  font-weight: 600;
  cursor: pointer;
}

.join-now-btn:hover {
  background-color: white;
  color: black;
}

.login-btn {
  border-radius: 3em;
  background-color: #000;
  padding: 1em 2em;
  color: #fff;
  font-size: calc((.2em + .5vmin) + (.2em + .5vmax));
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
  border: 2px solid #3dccc7;
}

.login-btn:hover {
  background-color: white;
  color: black;
}


.home-image {
  width: 60%;
  min-height: 100%;
}

.home-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.footer {
  display: flex;
  flex-direction: column;
  background-color: #000;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1em;
  font-weight: 300;
  padding: 1em;
  width: 100%;
}

.footer-logo {
  color: var(--main-color);
  margin: auto 0;
  font-weight: 400;
  font-size: calc((.5em + .7vmin) + (.5em + .7vmax));
  font-family: "Bruno Ace", sans-serif;
}

p {
  margin: .2em;
  padding: .5em;
  font-size: calc((.1em + .4vmin) + (.1em + .4vmax));
  font-weight: 400;
}

.gsi-material-button{
  padding: 1em 2em;
  width:100%;
  align-self: center;
  font-size: calc((.2em + .5vmin) + (.2em + .5vmax));
}

@media (max-width: 798px) {
  .panel-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .home-page {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .home-bar {
    width: 100%;
  }

  .home-image {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .home-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>