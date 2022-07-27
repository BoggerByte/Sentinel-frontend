import { sessionAPI } from "./api.service";
import { IDiscordUser } from "../modules/discord.module";


export default {
    getMe() {
        return sessionAPI.get<IDiscordUser & { created_at: Date } | null>('/users/me')
            .then(response => response.data)
            .catch(e => e.response.status == 404 ? null : Promise.reject(e));
    },
}