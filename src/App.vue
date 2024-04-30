<script setup>
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import paths from "@/router/routerPaths.js";
import NavbarComponent from "@/components/NavbarComponent.vue";
import SidebarComponent from "@/components/SidebarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import {useUserStore} from "@/stores/userStore.js";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const showFooter = ref(false);
const isSidebarVisible = ref(true);

function toggleSidebar() {
  isSidebarVisible.value = !isSidebarVisible.value;
}

const userStore = useUserStore();
const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (route.path == paths.REGISTER_ROUTE) {
      isLoggedIn.value = false;
    } else {
      isLoggedIn.value = !!user;
      isSidebarVisible.value = !isSidebarVisible.value;
    }
  })
});
const route = useRoute();
watch(
    () => route.path,
    (newPath) => {
      showFooter.value = newPath !== paths.HOME_ROUTE;
    },
    {immediate: true}
);

</script>

<template>
  <NavbarComponent v-if="isLoggedIn" :isSidebarVisible="isSidebarVisible"
                   @toggle-sidebar="toggleSidebar"></NavbarComponent>
  <main class="container">
    <transition name="sidebar">
      <SidebarComponent v-if="isSidebarVisible && isLoggedIn"></SidebarComponent>
    </transition>
    <router-view></router-view>
  </main>
  <FooterComponent v-if="showFooter"></FooterComponent>
</template>

<style>
/* transition sidebar */
.sidebar-leave-active {
  transition: .5s ease all; /* Smooth transition for both enter and leave */
}

.sidebar-leave {
  transform: translateX(0); /* Start position for leave animation (fully on-screen) */
}

.sidebar-leave-to {
  transform: translateX(-100%); /* End position for leave animation (off-screen) */
}

@media (max-width: 1000px) {
  .sidebar-leave {
    transform: translateY(0); /* Start position for leave animation (fully on-screen) */
  }

  .sidebar-leave-to {
    transform: translateY(100%); /* End position for leave animation (off-screen) */
  }

  .feed-container {
    padding-bottom: 60px;
  }
}

</style>