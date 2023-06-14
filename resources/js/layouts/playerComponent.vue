<script>
import {defineComponent} from "vue";
import {mapGetters, mapActions} from "vuex";

export default defineComponent({
    name: "PlayerComponent",
    computed: {
        ...mapGetters(['getSongs', 'getCurrentTrack', 'getIsPlaying']),
    },
    mounted() {
        this.$store.dispatch('getSongs')
    },
    methods: {
        confirmSong(payload) { this.$store.dispatch('confirmSong', payload) },
        rejectSong(payload) { this.$store.dispatch('rejectSong', payload) },
        addFavouriteSong(payload) { this.$store.dispatch('addFavouriteSong', payload) },
        ...mapActions(['togglePlayback', 'getUser'])
    },
})
</script>

<template>
    <div class="flex justify-between">

        <div :class="this.$route.fullPath === '/profile_admin' ? 'w-[100%]' : 'w-[70%]'" class="flex flex-col my-2 gap-y-3">
            <div :class="this.$route.fullPath === '/profile_admin' ? 'justify-center' : 'justify-end'" class="flex">
                <div class="flex justify-around w-[50%] mr-10 text-white text-2xl">
                    <button class="icon-previous"></button>
                    <button @click="togglePlayback" class="flex justify-center items-center">
                        <img v-if="!getIsPlaying" class="w-[80%] mb-[20%] ml-[30%]" src="../../images/Play.svg" alt="play_btn">
                        <span v-else class="icon-pause text-white"></span>
                    </button>
                    <button class="icon-next"></button>
                    <button @click.prevent="addFavouriteSong(getCurrentTrack.id)" v-if="this.$route.fullPath !== '/profile_admin'" class="icon-favourite text-red-800"></button>
                    <button @click.prevent="rejectSong(getCurrentTrack.id)" v-if="this.$route.fullPath === '/profile_admin'" ><img class="w-[80%]" src="../../images/Cancel.svg" alt="cancel"></button>
                    <button @click.prevent="confirmSong(getCurrentTrack.id)" v-if="this.$route.fullPath === '/profile_admin'" ><img class="w-[80%]" src="../../images/Confirm.svg" alt="confirm"></button>
                </div>
                <div class="flex flex-col">
                    <p class="text-center text-white capitalize text-xl break-words">{{ getCurrentTrack ? getCurrentTrack.title : 'song song' }}</p>
                    <router-link :to="getCurrentTrack ? `/artists/${getCurrentTrack.artists[0].id}` : '/'" class="flex justify-center">
                        <p class="text-center text-gray-500 uppercase text-md font-medium break-words">{{ getCurrentTrack ? getCurrentTrack.artists[0].name : 'artist artist' }}</p>
                    </router-link>
                </div>
            </div>
            <div :class="this.$route.fullPath === '/profile_admin' ? 'justify-center' : 'justify-end'" class="flex">
                <input class="styled-slider slider-progress" value="100" type="range">
            </div>
        </div>

        <div :class="this.$route.fullPath === '/profile_admin' ? 'w-[30%]' : 'w-[30%] ml-10'">
            <img v-if="getCurrentTrack" class="rounded-2xl h-[90px]" :class="this.$route.fullPath === '/profile_admin' ? 'w-[45%]' : 'w-[35%]'" :src="getCurrentTrack.image" alt="image">
            <img v-else class="rounded-2xl h-[90px]" src="../../images/imageSong.svg" alt="confirm">
        </div>

    </div>
</template>
