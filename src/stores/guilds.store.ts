import { defineStore } from "pinia";
import { ref } from "vue";
import { IDiscordGuild } from "../modules/discord.module";
import userService from "../services/user.service";


export const useGuildsStore = defineStore('guilds', async () => {
    // TODO: implement separate guilds store (separate in user data & guilds)
});