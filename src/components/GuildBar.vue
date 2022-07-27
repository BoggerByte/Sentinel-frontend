<script setup lang="ts">
import { DiscordGuild, IDiscordGuild } from "../modules/discord.module";
import { computed } from "vue";


const props = defineProps<{
  data?: IDiscordGuild,
  loading: boolean,
}>();

const dGuild = computed<DiscordGuild | null>(() => props.data ? new DiscordGuild(props.data) : null);
</script>

<template>
  <b-skeleton-wrapper :loading="loading">
    <template #loading>
      <b-card no-body class="p-2">
        <div class="d-flex flex-row align-items-center">
          <b-skeleton type="avatar" size="2.5rem"/>
          <div class="mx-2">
            <b-skeleton width="10rem" class="h5"/>
            <b-skeleton width="8rem" height="0.875em"/>
          </div>
        </div>
      </b-card>
    </template>

    <b-card no-body class="p-2">
      <div class="d-flex flex-row align-items-center">
        <b-avatar :text="dGuild.name[0]" :src="dGuild.icon && dGuild.getIconURL('png', 128)" size="2.5rem"/>
        <div class="mx-2">
          <h5 class="mb-0">{{ dGuild.name }}</h5>
          <small class="text-secondary">{{ dGuild.discord_id }}</small>
        </div>
      </div>
    </b-card>
  </b-skeleton-wrapper>
</template>

<style scoped>

</style>