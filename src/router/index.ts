import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import DiscordCallback from "../views/DiscordCallback.vue";
import User from "../views/User.vue";
import GuildConfig from "../views/GuildConfig.vue";


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/oauth2/discord_callback',
        name: 'DiscordCallback',
        component: DiscordCallback,
    },
    {
        path: '/users/me',
        name: 'User',
        component: User,
        meta: { requireAuth: true }
    },
    {
        path: '/guilds/:discordID/config',
        name: 'GuildConfig',
        component: GuildConfig,
        meta: { requireAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to) => {
    const requiresAuth = !!to.meta.requireAuth;
    const auth = useAuthStore();

    if (requiresAuth && !auth.isRefreshable) {
        console.error('not authorized');
        return { name: 'Home' };
    }
})

export default router;