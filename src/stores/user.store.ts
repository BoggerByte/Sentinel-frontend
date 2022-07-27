import userService from "../services/user.service";
import guildService from "../services/guild.service";
import { IDiscordGuild, IDiscordUser } from "../modules/discord.module";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth.store";


export const useUserStore = defineStore('user', () => {
    const data = ref<IDiscordUser | null>(null);
    const guilds = ref<(IDiscordGuild & {
        can_read_config: boolean,
        can_edit_config: boolean
    })[]>([]);

    const auth = useAuthStore();
    if (auth.isRefreshable) loadData().catch(console.error);

    async function loadData() {
        data.value = await userService.getMe();
    }

    async function loadGuilds() {
        guilds.value = await guildService.getMyGuilds() || [];
    }

    return {
        data,
        guilds,
        loadData,
        loadGuilds
    }
});
