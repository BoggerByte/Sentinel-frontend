<script setup lang="ts">
import oauth2Service from "../services/oauth2.service";
import { reactive } from "vue";
import { useToast } from "bootstrap-vue-3";
import { useAsyncState } from "@vueuse/core";
import { AxiosError } from "axios";


const toast = useToast();

async function invite() {
  let response = await oauth2Service.newInviteBotURL();
  window.open(response.url, '_blank');
}

const loginReq = reactive(useAsyncState(invite, null, {
  immediate: false,
  onError: e => toast?.show(
      { title: 'Login error', body: (e as AxiosError).message || e as string },
      { pos: 'bottom-right', variant: 'danger' }
  )
}));
</script>

<template>
  <b-overlay
      :show="loginReq.isLoading"
      rounded
      opacity="0.6"
      spinner-small
      spinner-variant="primary"
      class="d-inline-block"
  >
    <b-button variant="primary" @click="loginReq.execute()">
      Add on your server
    </b-button>
  </b-overlay>
</template>

<style scoped>

</style>