<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import { useAsyncState } from "@vueuse/core";
import { useToast } from "bootstrap-vue-3";
import { AxiosError } from "axios";


const auth = useAuthStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();

const code = route.query.code as string;
const state = route.query.state as string;

async function finalizeLogin() {
  await auth.login(code, state);
  await router.push({ name: 'User' });
}

const finalizeLoginReq = reactive(useAsyncState(finalizeLogin, null, {
  onError: e => toast?.show(
      { title: 'Login error', body: (e as AxiosError).message || e as string },
      { pos: 'bottom-right', variant: 'danger' }
  )
}));
</script>

<template>
  <div class="d-flex justify-content-center">
    <b-alert v-if="finalizeLoginReq.error" show variant="danger">
      <h3>Failed to finalize login with discord</h3>
      <p>{{ finalizeLoginReq.error.message }}</p>
      <router-link :to="{ name: 'Home' }" class="m-auto">Go to home</router-link>
    </b-alert>
    <b-spinner v-else-if="finalizeLoginReq.isLoading"/>
  </div>
</template>

<style scoped>

</style>