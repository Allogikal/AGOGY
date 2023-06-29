<script>
import {defineComponent} from "vue";
import {mapGetters, mapActions} from "vuex";

export default defineComponent({
    name: "PlayerComponent",
    computed: {
        ...mapGetters(['getSongs', 'getCurrentTrack', 'getAudioDuration', 'getIsPlaying', 'getFavouriteStatus', 'getCurrentPosition']),
    },
    mounted() {
        this.$store.dispatch('getSongs')
    },
    methods: {
        confirmSong(payload) { this.$store.dispatch('confirmSong', payload) },
        rejectSong(payload) { this.$store.dispatch('rejectSong', payload) },
        addFavouriteSong(payload) {
            this.$store.dispatch('addFavouriteSong', payload)
        },
        ...mapActions(['togglePlayback', 'getUser', 'playPrevious', 'playNext', 'setCurrentPosition']),
    },
})
</script>

<template>
    <div class="flex justify-between phone:mt-16">

        <div :class="this.$route.fullPath === '/profile_admin' ? 'w-[100%]' : 'w-[70%] phone:w-full'" class="flex flex-col my-2 gap-y-3">
            <div :class="this.$route.fullPath === '/profile_admin' ? 'justify-center' : 'justify-end'" class="flex">
                <div class="flex justify-around w-1/2 phone:w-[70%] mr-2 text-white text-2xl">
                    <button @click="playPrevious" class="icon-previous dark:text-[#292929]"></button>
                    <button @click="togglePlayback" class="flex justify-center items-center">
                        <img v-if="!getIsPlaying" class="w-[80%] mb-[20%] ml-[30%] dark:hidden block" src="../../images/Play.svg" alt="play_btn">
                        <img v-if="!getIsPlaying" class="w-[80%] mb-[20%] ml-[30%] dark:block hidden" src="../../images/Play_white.svg" alt="play_btn">
                        <span v-else class="icon-pause text-white dark:text-[#292929]"></span>
                    </button>
                    <button @click="playNext" class="icon-next dark:text-[#292929]"></button>
                    <button v-show="getCurrentTrack && this.$store.state.auth.authToken && this.$route.fullPath !== '/profile_admin'"
                            @click.prevent="addFavouriteSong(getCurrentTrack.id)"
                            v-if="getFavouriteStatus"
                            class="icon-favourite text-red-800 dark:text-[#BBABAB]"></button>
                    <button v-show="getCurrentTrack && this.$store.state.auth.authToken && this.$route.fullPath !== '/profile_admin'"
                            @click.prevent="addFavouriteSong(getCurrentTrack.id)"
                            v-else
                            class="icon-favourite text-white dark:text-[#292929]"></button>
                    <button @click.prevent="rejectSong(getCurrentTrack.id)" v-if="this.$route.fullPath === '/profile_admin'" ><img class="w-[80%]" src="../../images/Cancel.svg" alt="cancel"></button>
                    <button @click.prevent="confirmSong(getCurrentTrack.id)" v-if="this.$route.fullPath === '/profile_admin'" ><img class="w-[80%]" src="../../images/Confirm.svg" alt="confirm"></button>
                </div>
                <div class="flex flex-col w-[30%] phone:w-[20%]">
                    <p class="text-center text-white dark:text-[#292929] dark:font-medium capitalize truncate w-[100%] text-xl break-words phone:text-sm">{{ getCurrentTrack ? getCurrentTrack.title : 'song song' }}</p>
                    <router-link :to="getCurrentTrack ? `/artists/${getCurrentTrack.artists[0].id}` : '/'" class="flex justify-center">
                        <p class="text-center text-gray-500 dark:text-[#292929] dark:text-sm uppercase text-md font-medium break-words phone:text-xs">{{ getCurrentTrack ? getCurrentTrack.artists[0].name : 'artist artist' }}</p>
                    </router-link>
                </div>
            </div>
            <div :class="this.$route.fullPath === '/profile_admin' ? 'justify-center' : 'justify-end'" class="flex">
                <input v-model="this.getCurrentPosition" :min="0" :max="getAudioDuration" step="0.001" type="range" class="w-[80%] phone:w-[90%] styled-slider slider-progress">
            </div>
        </div>

        <div :class="this.$route.fullPath === '/profile_admin' ? 'w-[30%]' : 'w-[30%] ml-10 phone:ml-5'">
            <img v-if="getCurrentTrack" class="rounded-2xl h-[90px]" :class="this.$route.fullPath === '/profile_admin' ? 'w-[45%]' : 'w-[35%] phone:w-full phone:h-[80px]'" :src="getCurrentTrack.image" alt="image">
            <img v-else class="rounded-2xl h-[90px]" src="../../images/imageSong.svg" alt="confirm">
        </div>

    </div>
</template>
