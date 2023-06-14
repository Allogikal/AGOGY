<script>
import { defineComponent } from "vue";
import SideBarComponent from "@/layouts/sideBarComponent.vue";
import HeaderComponent from "@/layouts/headerComponent.vue";
import PlayerComponent from "@/layouts/playerComponent.vue";
import authModalPage from "@/pages/modals/auth/authModalPage.vue";
import registerModalPage from "@/pages/modals/auth/registerModalPage.vue";
import NotificationsBlockComponent from "@/components/notificationsBlockComponent.vue";
import AddSongModalPage from "@/pages/modals/addSongModalPage.vue";
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
    name: "App",
    components: { AddSongModalPage, PlayerComponent, HeaderComponent, SideBarComponent, authModalPage, registerModalPage, NotificationsBlockComponent },
    computed: {
        ...mapGetters(['getCurrentTrack']),
    }
})
</script>

<template>
    <div class="grid grid-cols-[1fr_2fr_7.5fr_1.5fr] grid-rows-[10vh_75vh_15vh] z-20 relative
     w-screen h-screen bg-[#2B2626] light:bg-[#BBABAB] overflow-hidden">

        <!--  staticBackground  -->
        <img class="absolute z-20 w-screen" src="../images/Background.svg" alt="img">

        <!--  dynamicChangeableBackground  -->
        <img v-if="getCurrentTrack" class="track-image absolute z-10 w-[60vw] left-[50%] opacity-40" :src="getCurrentTrack.image" alt="img">

        <!--  headerComponent  -->
        <header-component class="col-[2_/_4] row-[1_/_2] z-30" />

        <!--  sideBarComponent  -->
        <side-bar-component v-show="this.$route.fullPath !== '/profile_admin'" class="col-[2_/_3] row-[2_/_3] z-30" />

        <!--  mainContent  -->
        <router-view class="row-[2_/_3] z-30" :class="this.$route.fullPath === '/profile_admin' ? 'col-[2_/_5] h-[70vh]':'col-[3_/_4] h-[65vh]'" />

        <!--  playerComponent  -->
        <player-component class="col-[3_/_4] row-[3_/_4] z-30" />

        <!--  notificationsBlockComponent  -->
<!--        <notifications-block-component class="col-[2_/_3] row-[3_/_4] z-30" />-->

        <!--  authModalPage  -->
        <auth-modal-page v-if="this.$store.state.showAuthModal" @close="this.$store.state.showAuthModal = false" />

        <!--  registerModalPage  -->
        <register-modal-page v-if="this.$store.state.showRegisterModal" @close="this.$store.state.showRegisterModal = false" />

        <!--  addSongModalPage  -->
        <add-song-modal-page v-if="this.$store.state.showAddSongModal" @close="this.$store.state.showAddSongModal = false" />

        <!--  notifications  -->
        <svg display="none">
            <symbol id="clock" viewBox="0 0 32 32" >
                <circle r="15" cx="16" cy="16" fill="none" stroke="currentColor" stroke-width="2" />
                <polyline points="16,7 16,16 23,16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </symbol>
            <symbol id="error" viewBox="0 0 32 32" >
                <circle r="15" cx="16" cy="16" fill="none" stroke="hsl(13,90%,55%)" stroke-width="2" />
                <line x1="10" y1="10" x2="22" y2="22" stroke="hsl(13,90%,55%)" stroke-width="2" stroke-linecap="round" />
                <line x1="22" y1="10" x2="10" y2="22" stroke="hsl(13,90%,55%)" stroke-width="2" stroke-linecap="round" />
            </symbol>
            <symbol id="success" viewBox="0 0 32 32" >
                <circle r="15" cx="16" cy="16" fill="none" stroke="hsl(93,90%,40%)" stroke-width="2" />
                <polyline points="9,18 13,22 23,12" fill="none" stroke="hsl(93,90%,40%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </symbol>
        </svg>
    </div>
</template>

<style scoped>
@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.track-image {
    animation-name: fade-in;
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
}
</style>
