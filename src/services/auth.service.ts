import { API } from "./api.service";


export default {
    refreshToken(refreshToken: string) {
        return API.post<{
            access_token: string,
            access_duration: number,
            refresh_token: string,
            refresh_duration: number,
            session_id: string
        }>('/auth/paseto/refresh', {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        })
            .then(response => response.data);
    }
}