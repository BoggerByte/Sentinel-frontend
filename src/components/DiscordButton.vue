<script setup lang="ts">
import oauth2Service from "../services/oauth2.service";
import { reactive } from "vue";
import { useAsyncState } from "@vueuse/core";
import { useToast } from "bootstrap-vue-3";
import { AxiosError } from "axios";

import BLoadingButton from "../components/BLoadingButton.vue";


const toast = useToast();

async function login() {
  await oauth2Service.newDiscordOauth2URL().then(response => {
    window.open(response.url, '_self');
  });
}

const loginReq = reactive(useAsyncState(login, null, {
  immediate: false,
  onError: e => toast?.show(
      { title: 'Login error', body: (e as AxiosError).message || e as string },
      { pos: 'bottom-right', variant: 'danger' }
  )
}));
</script>

<template>
  <b-loading-button :loading="loginReq.isLoading" variant="primary"
                    @click="loginReq.execute()">
    Login via Discord <i class="bi bi-discord"/>
  </b-loading-button>
</template>

<style scoped>

</style>