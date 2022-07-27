<script setup lang="ts">
import { IDiscordGuild } from "../modules/discord.module";
import { computed, reactive, ref } from "vue";
import { useUserStore } from "../stores/user.store";
import { useToast } from "bootstrap-vue-3";
import { useAsyncState } from "@vueuse/core";
import { AxiosError } from "axios";

import UserBar from "../components/UserBar.vue";
import GuildCard from "../components/GuildCard.vue";
import ItemsCollapse from "../components/ItemsCollapse.vue";


const user = useUserStore();
const toast = useToast();

const userDataReq = reactive(useAsyncState(user.loadData, null, {
  onError: e => toast?.show(
      { title: 'Get user data error', body: (e as AxiosError).message || e as string },
      { pos: 'bottom-right', variant: 'danger' }
  )
}));
const guildsDataReq = reactive(useAsyncState(user.loadGuilds, null, {
  onError: e => toast?.show(
      { title: 'Get guilds data error', body: (e as AxiosError).message || e as string },
      { pos: 'bottom-right', variant: 'danger' }
  )
}));

const searchInput = ref<string>('');
const canReadInput = ref<boolean>(true);
const canEditInput = ref<boolean>(false);

const selectedGuilds = computed<IDiscordGuild[]>(() => filterGuilds(user.guilds, searchInput.value));
const selectedOwningGuilds = computed<IDiscordGuild[]>(() => filterOwningGuilds(selectedGuilds.value, user.data?.discord_id));

function filterGuilds(guilds: IDiscordGuild[], query: string): IDiscordGuild[] {
  return guilds.filter(g => g.name.toLowerCase().includes(query.toLowerCase()));
}

function filterOwningGuilds(guilds: IDiscordGuild[], userDiscordID?: string) {
  return guilds.filter(g => g.owner_discord_id == userDiscordID);
}
</script>

<template>
  <user-bar :data="user.data" :loading="userDataReq.isLoading || !!userDataReq.error"/>
  <section class="mt-4">
    <b-input-group class="col col-12 col-sm-6 col-md-6 col-lg-4 my-2">
      <template #prepend>
        <i class="bi bi-search input-group-text bg-transparent text-secondary"/>
      </template>
      <b-form-input
          v-model="searchInput"
          :autofocus="true"
          :disabled="guildsDataReq.isLoading || !!guildsDataReq.error"
          placeholder="Search for guilds"
      />
    </b-input-group>
    <items-collapse
        :toggled="true"
        :items="selectedOwningGuilds"
        :loading="guildsDataReq.isLoading || !!guildsDataReq.error"
        :item-key="'discord_id'"
        :item-class="'col col-12 col-sm-6 col-md-4 col-lg-3 my-2'"
    >
      <template #header>
        <h3>Owning</h3>
      </template>
      <template #item="item">
        <guild-card
            :data="item"
            authority="owner"
            :can-read="item.can_read_config"
            :can-edit="item.can_edit_config"
        />
      </template>
    </items-collapse>
    <hr class="my-2">
    <items-collapse
        :toggled="false"
        :items="selectedGuilds"
        :loading="guildsDataReq.isLoading || !!guildsDataReq.error"
        :item-key="'discord_id'"
        :item-class="'col col-12 col-sm-6 col-md-4 col-lg-3 my-2'"
    >
      <template #header>
        <h3>All</h3>
      </template>
      <template #item="item">
        <guild-card
            :data="item"
            authority="default"
            :can-read="item.can_read_config"
            :can-edit="item.can_edit_config"
        />
      </template>
    </items-collapse>
  </section>
</template>

<style scoped>

</style>