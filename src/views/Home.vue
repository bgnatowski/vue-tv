<script setup>
import {useRouter} from "vue-router";
import SignInGoogleButton from "@/views/SignInGoogleButton.vue";
import Logo from "@/views/Logo.vue";

const router = useRouter()

</script>

<template>
  <div class="home-page">
    <div class="home-bar">
      <div class="home-bar-content">
        <Logo></Logo>
        <p class="home-bar-description">
          To, co chcesz wiedzieć o swoich filmach - na wyciągnięcie ręki
        </p>
        <div class="home-bar-buttons">
          <button @click="router.push('/register')" class="join-now-btn">Dołącz teraz</button>
          <button @click="router.push('/sign-in')" class="login-btn">Zaloguj się</button>
          <SignInGoogleButton></SignInGoogleButton>
        </div>
      </div>
    </div>
    <div class="home-image">
      <img
          src="@/resources/home-image.png"
          alt="VueTV main image" class="main-image"
      />
    </div>
  </div>
  <div class="footer">
    <div class="footer-logo">VueTV</div>
    <div class="footer-authors">
      <p>Piotr Grochala | Bartosz Gnatowski | Kamil Rachwał</p>
      <p>ZIISS2-1211 | Grupa D</p>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.home-bar {
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: auto;
}

.home-bar-content {
  background-color: #000;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #fff;
  width: 100%;
}

.home-bar-description {
  padding: 10px;
  margin: 10px 10px 32vh 10px;
  font-size: calc((.2em + .5vmin) + (.2em + .5vmax));
  width: 70%;
}

.home-bar-buttons {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: auto auto 10px auto;
  gap: .5vh;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.join-now-btn {
  border-radius: 36px;
  background-color: #3dccc7;
  padding: 1em 2em;
  border: none;
  color: #fff;
  font-size: calc((.2em + .5vmin) + (.2em + .5vmax));
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  width: fit-content;
  box-sizing: border-box;
  overflow: hidden;
  margin: 2px auto 2px auto;
  width: auto;
}

.join-now-btn:hover {
  background-color: white;
  color: black;
}

.login-btn {
  border-radius: 36px;
  background-color: transparent;
  padding: 1em 2em;
  border: none;
  color: #fff;
  font-size: calc((.2em + .5vmin) + (.2em + .5vmax));
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  width: fit-content;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid #3dccc7;
  margin: 2px auto 2px auto;
  width: auto;
}

.login-btn:hover {
  background-color: white;
  color: black;
  border: 1px solid #3dccc7;
}

.home-image {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #000;
  width: 70%;
}

.home-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.footer {
  background-color: #010101;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  width: 100%;
}

.footer-logo {
  color: #3dccc7;
  font-family: "Bruno Ace", sans-serif;
  font-weight: 400;
  font-size: calc((.5em + .7vmin) + (.5em + .7vmax));
  margin-top: .5em;
}

.footer-authors {
  text-align: center;
  margin: .5em;
}

p {
  margin: .5em;
  font-size: calc((.1em + .4vmin) + (.1em + .4vmax));;
}
</style>