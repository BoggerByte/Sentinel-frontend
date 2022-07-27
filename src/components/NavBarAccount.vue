<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "../stores/auth.store";
import { useUserStore } from "../stores/user.store";
import { useRouter } from "vue-router";

import { DiscordUser } from "../modules/discord.module";


const auth = useAuthStore();
const user = useUserStore();
const router = useRouter();


const dUser = computed<DiscordUser | null>(() => user.data ? new DiscordUser(user.data) : null);

async function logout() {
  await auth.logout();
  await router.push({ name: 'Home' });
}
</script>

<template>
  <b-skeleton-wrapper :loading="dUser == null">
    <template #loading>
      <b-button-group>
        <b-button variant="primary" @click="logout()">
          <i class="bi bi-box-arrow-left"/>
        </b-button>
        <b-button disabled variant="primary">
          <b-skeleton height="1rem" width="6rem"/>
        </b-button>
      </b-button-group>
    </template>

    <b-button-group>
      <b-button variant="primary" @click="logout()">
        <i class="bi bi-box-arrow-left"/>
      </b-button>
      <b-button variant="primary" :to="{ name: 'User' }">
        {{ dUser.fullName }}
      </b-button>
    </b-button-group>
  </b-skeleton-wrapper>
</template>

<style scoped>

</style>