import { API } from './api.service'
import { AxiosError } from "axios";


export default {
    newDiscordOauth2URL() {
        return API.get<{ url: string, state: string }>('/oauth2/new_url')
            .then(response => response.data);
    },
    newInviteBotURL() {
        return API.get<{ url: string, state: string }>('/oauth2/new_invite_bot_url')
            .then(response => response.data);
    },
    finalizeLogin(code: string, state: string) {
        return API.get<{
            access_token: string;
            access_duration: number;
            refresh_token: string;
            refresh_duration: number;
        }>('/oauth2/discord_callback', {
            params: {
                'code': code,
                'state': state
            }
        })
            .then(response => response.data)
            .catch(e => {
                if (e.response.status == 405) e = new AxiosError('Seems that keys are invalid or authorization took to much time so they are expired. Try again');
                return Promise.reject(e);
            });
    }
}