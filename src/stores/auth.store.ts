import { defineStore } from "pinia";
import { computed, ref} from "vue";
import { useLocalStorage } from "@vueuse/core";
import oauth2Service from "../services/oauth2.service";
import authService from "../services/auth.service";


export interface Session {
    access_token: string
    access_expiration: number
    refresh_token: string
    refresh_expiration: number
}

export const useAuthStore = defineStore('auth', () => {
    const session = ref(useLocalStorage('sentinel-user-session', {} as Session));

    const isRefreshable = computed<boolean>(() => {
        let now = Date.now();
        return !!session.value.access_token && !!session.value.refresh_token
            && now < session.value.refresh_expiration;
    });
    const isFresh = computed<boolean>(() => {
        let now = Date.now();
        return !!session.value.access_token && !!session.value.refresh_token
            && now < session.value.access_expiration;
    });

    async function login(code: string, state: string) {
        let response = await oauth2Service.finalizeLogin(code, state);
        let now = Date.now();
        session.value = {
            access_token: response.access_token,
            access_expiration: now + response.access_duration,
            refresh_token: response.refresh_token,
            refresh_expiration: now + response.refresh_duration,
        } as Session;
    }

    async function refresh() {
        let response = await authService.refreshToken(session.value.refresh_token);
        let now = Date.now();
        session.value = {
            access_token: response.access_token,
            access_expiration: now + response.access_duration,
            refresh_token: response.refresh_token,
            refresh_expiration: now + response.refresh_duration,
        } as Session;
    }

    function logout() {
        localStorage.clear();
        session.value = {} as Session;
    }

    return {
        session,
        isRefreshable,
        isFresh,
        login,
        refresh,
        logout
    }
});