import { API, sessionAPI } from "./api.service";
import { IGuildConfig } from "../modules/guild-config.module";
import { IDiscordGuild } from "../modules/discord.module";
import { AxiosError } from "axios";


export default {
    getGuild(discordID: string) {
        return API.get<IDiscordGuild | null>(`/guilds/${discordID}`)
            .then(response => response.data)
            .catch(e => e.response.status == 404 ? null : Promise.reject(e));
    },
    getMyGuild(discordID: string) {
        return sessionAPI.get<(IDiscordGuild & {
            can_read_config: boolean;
            can_edit_config: boolean;
        }) | null>(`/users/me/guilds/${discordID}`)
            .then(response => response.data)
            .catch(e => e.response.status == 404 ? null : Promise.reject(e));
    },
    getMyGuilds() {
        return sessionAPI.get<(IDiscordGuild & {
            can_read_config: boolean;
            can_edit_config: boolean;
        })[] | null>('/users/me/guilds')
            .then(response => response.data);
    },
    getGuildConfig(guildID: string) {
        return sessionAPI.get<{
            id: number;
            json: IGuildConfig;
            created_at: Date;
        }>(`/guilds/${guildID}/config`)
            .then(response => response.data)
            .catch(e => {
                if (e.response.status == 403) e = new AxiosError(`Action is forbidden: ${e.response.message}`);
                return Promise.reject(e);
            });
    },
    overwriteGuildConfig(discordID: string, guildConfig: IGuildConfig) {
        return sessionAPI.post<void>(`/guilds/${discordID}/config`, guildConfig)
            .catch(e => {
                if (e.response.status == 403) e = new AxiosError(`Action is forbidden: ${e.response.message}`);
                return Promise.reject(e);
            });
    },
    getGuildConfigPreset(preset: 'default') {
        return API.get<IGuildConfig>(`/guilds/configs/presets/${preset}`)
            .then(response => response.data);
    }
}