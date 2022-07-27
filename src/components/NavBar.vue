<script setup lang="ts">
import { useAuthStore } from "../stores/auth.store";

import NavBarAccount from "./NavBarAccount.vue";
import DiscordButton from "./DiscordButton.vue";


const auth = useAuthStore();
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid justify-content-start">
      <button class="navbar-toggler px-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content"
              aria-controls="navbar-content" aria-expanded="false" aria-label="Toggle navigation">
        <i class="bi bi-list"/>
      </button>
      <router-link :to="{ name: 'Home' }" class="navbar-brand mx-2">Sentinel</router-link>
      <div class="collapse navbar-collapse" id="navbar-content">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{ name: 'Home' }" class="nav-link" aria-current="page">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'About' }" class="nav-link" aria-current="page">About</router-link>
          </li>
        </ul>
      </div>
      <div class="ms-auto">
        <nav-bar-account v-if="auth.isRefreshable"/>
        <discord-button v-else/>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>