<script setup lang="ts">
import { DiscordGuild, IDiscordGuild } from "../modules/discord.module";
import { computed } from "vue";
import { useRouter } from "vue-router";


const { data, canRead = false, canEdit = false } = defineProps<{
  data?: IDiscordGuild,
  canRead: boolean,
  canEdit: boolean
}>();

const router = useRouter();

const dGuild = computed<DiscordGuild | null>(() => data ? new DiscordGuild(data) : null);

async function viewGuildConfig() {
  data?.discord_id && await router.push({
    name: 'GuildConfig',
    params: {
      discordID: data.discord_id
    }
  });
}
</script>

<template>
  <b-card :class="{
    'border-primary bg-primary bg-opacity-10': canEdit && canRead,
  }">
    <template #header>
      <div class="d-flex flex-row align-items-center">
        <b-avatar :text="dGuild.name[0]" :src="dGuild.icon && dGuild.getIconURL('png', 128)" size="2.5rem"/>
        <div class="mx-2">
          <div class="h5 mb-0">{{ dGuild.name }}</div>
        </div>
      </div>
    </template>
    <b-button v-if="canEdit && canRead" variant="primary" @click="viewGuildConfig()">
      Change config <i class="bi bi-chevron-right"/>
    </b-button>
    <b-button v-else-if="canRead" variant="secondary" @click="viewGuildConfig()">
      View config <i class="bi bi-chevron-right"/>
    </b-button>
    <b-button v-else variant="danger" @click="viewGuildConfig()">
      Can't view <i class="bi bi-lock"/>
    </b-button>
  </b-card>
</template>

<style scoped>

</style>