<script setup>
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import paths from "@/router/routerPaths.js";
import NavbarComponent from "@/components/page/NavbarComponent.vue";
import SidebarComponent from "@/components/page/SidebarComponent.vue";
import FooterComponent from "@/components/page/FooterComponent.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useAuthStore} from "@/stores/AuthStore.js";
const route = useRoute();
const showFooter = ref(false);
const isLoggedIn = ref(false);
const showSidebar = ref(false);

function toggleSidebar() {
  showSidebar.value = !showSidebar.value;
}

const authStore = useAuthStore();
onMounted(async () => {
      authStore.init();
      onAuthStateChanged(getAuth(), (user) => {
        if (route.path == paths.REGISTER_ROUTE) {
          isLoggedIn.value = false;
          showSidebar.value = false;
        } else {
          isLoggedIn.value = !!user;
          showSidebar.value = true;
        }
      })
    }
);

watch(
    () => route.path,
    (newPath) => {
      showFooter.value = newPath !== paths.HOME_ROUTE;
    },
    {immediate: true}
);

</script>

<template>
  <NavbarComponent v-if="isLoggedIn" :isSidebarVisible="showSidebar"
                   @toggle-sidebar="toggleSidebar"></NavbarComponent>
  <main class="container">
    <transition name="sidebar">
      <SidebarComponent v-if="showSidebar && isLoggedIn"></SidebarComponent>
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