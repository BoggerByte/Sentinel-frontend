<script setup lang="ts">
import { IGuildConfig } from "../modules/guild-config.module";
import guildService from "../services/guild.service";
import { ref, watch } from "vue";

import DiscordPermsInput from "./DiscordPermsInput.vue";


const props = defineProps<{
  disabled?: boolean,
  modelValue: IGuildConfig
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: IGuildConfig): void
}>();

const selectedConfigPreset = ref<string | null>();
const configPresets = ref<{ value: string, text: string, disabled?: boolean }[]>([
  { value: 'default', text: 'Default' },
  { value: 'custom', text: 'Custom', disabled: true },
]);

watch(props, ({ modelValue }) => {
  selectedConfigPreset.value = modelValue.preset;
}, { immediate: true });

watch(selectedConfigPreset, async value => {
  // @ts-ignore
  if (value != 'custom') await guildService.getGuildConfigPreset(value)
      .then(response => emit('update:modelValue', response));
});
</script>

<template>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="Config">
        <b-alert show>
          <p class="mb-0">This tab is responsible for the behavior of the bot itself</p>
          <p class="mb-0">Begin your guarding experience with flipping the
            <mark>Use config</mark>
            switch
          </p>
        </b-alert>
        <b-card-body>
          <b-form-checkbox v-model="modelValue.data.use_config" :disabled="disabled" switch>
            Use config
          </b-form-checkbox>
        </b-card-body>
      </b-tab>

      <b-tab title="Permissions">
        <b-alert show>
          <p class="mb-0">This tab is responsible for permissions for website users</p>
          <p class="mb-0">Select options of your choice</p>
        </b-alert>
        <b-card-body>
          <label for="guild-config-read">
            Read <span class="text-secondary">(Who can open this page?)</span>
          </label>
          <discord-perms-input id="guild-config-read" v-model="modelValue.permissions.read"
                               :disabled="disabled"
                               class="col col-12 col-md-8 col-lg-6"/>
          <label for="guild-config-edit">
            Edit <span class="text-secondary">(Who can edit the config?)</span>
          </label>
          <discord-perms-input id="guild-config-read" v-model="modelValue.permissions.edit"
                               :disabled="disabled"
                               class="col col-12 col-md-8 col-lg-6"/>
        </b-card-body>
      </b-tab>
      <template #tabs-end>
        <div class="ms-auto">
          <b-form-select v-model="selectedConfigPreset" :options="configPresets"/>
        </div>
      </template>
    </b-tabs>
  </b-card>
</template>

<style scoped>

</style>