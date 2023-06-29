import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'
import store from '@/store'
import homePage from "@/pages/homePage.vue";
import favouritesPage from "@/pages/favouritesPage.vue";
import profileUserPage from "@/pages/profiles/profileUserPage.vue";
import profileAdminPage from "@/pages/profiles/profileAdminPage.vue";
import profileArtistPage from "@/pages/profiles/profileArtistPage.vue";
import searchPage from "@/pages/searchPage.vue";
import songsArtistPage from "@/pages/songsArtistPage.vue";
import notFoundPage from "@/pages/notFoundPage.vue";
import policyPage from "@/pages/policyPage.vue";

const routes = [
    { path: '/home', component: homePage, alias: '/' },
    { path: '/artists/:id', component: songsArtistPage },
    { path: '/search', component: searchPage },
    { path: '/policy', component: policyPage },
    /**         GUARDED        **/
    { path: '/favourites', component: favouritesPage, meta: { requiresAuth: true } },
    /**         PROFILES        **/
    { path: '/profile_user', component: profileUserPage, meta: { requiresAuth: true } },
    { path: '/profile_admin', component: profileAdminPage, meta: { requiresAuth: true } },
    { path: '/profile_artist', component: profileArtistPage, meta: { requiresAuth: true } },
    /**         404PAGE        **/
    { path: '/:pathMatch(.*)*', component: notFoundPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// GUARDING ROUTES
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        store.dispatch('checkAuth', to).then((isAuthenticated) => {
            if (isAuthenticated) {
                next();
            } else {}
        });
    } else {
        next();
    }
});

export default router
