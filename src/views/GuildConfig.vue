<script setup lang="ts">
import { IGuildConfig } from "../modules/guild-config.module";
import guildService from "../services/guild.service";
import { computed, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useAsyncState } from "@vueuse/core";

import GuildBar from "../components/GuildBar.vue";
import GuildConfigEditor from "../components/GuildConfigEditor.vue";


const route = useRoute();

const discordID = route.params.discordID as string;

const guildReq = reactive(useAsyncState(() => guildService.getMyGuild(discordID), null));
const guildConfigReq = reactive(useAsyncState(() => guildService.getGuildConfig(discordID), null));

const canReadConfig = computed<boolean | null>(() => guildReq.isReady && guildReq.state ? guildReq.state.can_read_config : null);
const canEditConfig = computed<boolean | null>(() => guildReq.isReady && guildReq.state ? guildReq.state.can_edit_config : null);

const oldGuildConfig = ref<IGuildConfig | null>(null);
const guildConfig = ref<IGuildConfig | null>(null);
const isAlertVisible = ref<boolean>(false);

function handleGuildConfigChange() {
  isAlertVisible.value = true;
  guildConfig.value!.preset = 'custom';
}

async function reset() {
  await guildConfigReq.execute()
      .then(() => isAlertVisible.value = false);
}

async function saveChanges() {
  await guildService.overwriteGuildConfig(discordID, guildConfig.value!)
      .then(() => isAlertVisible.value = false);
}

watch(guildConfigReq, value => {
  if (value.isReady && value.state) {
    oldGuildConfig.value = structuredClone(value.state.json);
    guildConfig.value = structuredClone(value.state.json);
  }
});
</script>

<template>
  <guild-bar :data="guildReq.state" :loading="guildReq.isLoading || !!guildReq.error"/>
  <b-collapse :visible="canReadConfig != null && !canReadConfig">
    <b-alert show variant="danger" class="my-2">
      Not enough permissions to read config
    </b-alert>
  </b-collapse>
  <b-collapse :visible="canEditConfig != null && !canEditConfig">
    <b-alert show variant="warning" class="my-2">
      Not enough permissions to edit config
    </b-alert>
  </b-collapse>
  <b-collapse :visible="canEditConfig && isAlertVisible">
    <b-alert show variant="warning" class="my-2">
      <div class="d-sm-flex flex-row align-items-center">
        <div class="me-auto">Be careful — You have unsaved changes!</div>
        <div class="ms-auto mt-2 mt-sm-0">
          <b-button variant="outline-secondary" @click="reset()">Reset</b-button>
          <b-button variant="success" class="ms-2" @click="saveChanges()">Save changes</b-button>
        </div>
      </div>
    </b-alert>
  </b-collapse>
  <div v-if="!!guildConfig && canReadConfig" class="mt-2">
    <guild-config-editor :disabled="!canEditConfig" v-model="guildConfig"
                         @change="handleGuildConfigChange()"/>
  </div>
</template>

<style scoped>

</style>