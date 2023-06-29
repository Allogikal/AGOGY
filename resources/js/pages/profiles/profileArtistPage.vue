<script>
import { defineComponent } from "vue";
import PaginationComponent from "@/components/paginationComponent.vue";
import CardComponent from "@/components/cardComponent.vue";
import addSongModalPage from "@/pages/modals/addSongModalPage.vue";
// SLIDER
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import {mapActions, mapGetters} from "vuex";
import {AtomSpinner} from "epic-spinners";

export default defineComponent({
    name: "profileArtistPage",
    components: {AtomSpinner, PaginationComponent, CardComponent, addSongModalPage, Splide, SplideSlide, SplideTrack },
    computed: {
        ...mapGetters(['getAuthUser', 'getRejectSongs', 'getArtist'])
    },
    mounted() {
        this.$store.dispatch('getUser')
        this.$store.dispatch('showArtist', 3)
        this.$store.dispatch('getRejectSongs')
        this.$store.state.activeLoading = true
        setTimeout(() => { this.$store.state.activeLoading = false }, 1000)
    },
    methods: {
        ...mapActions(['playTrack']),
        playSelectedTrack(track) { this.playTrack(track); },
    }
})
</script>

<template>
    <atom-spinner
        class="absolute left-[40%] top-[35%] phone:left-[10%]"
        v-if="this.$store.state.activeLoading"
        :animation-duration="1000"
        :size="120"
        :color="'#FF0000'"
    />
    <div v-else class="flex justify-center overflow-hidden gap-x-10 w-full mt-8">

        <div class="flex flex-col w-[20%] justify-center gap-y-5 mt-[3%]">
            <div class="flex">
                <img class="rounded-2xl w-[80%] h-[160px]" :src="getAuthUser.image" alt="image">
            </div>
            <h1 class="text-white capitalize text-3xl truncate">Welcome, <br> {{ getAuthUser.name }}</h1>
            <div>
                <div>
                    <p class="text-gray-500 uppercase text-md break-words">mail: {{ getAuthUser.email }}</p>
                    <p class="text-gray-500 uppercase text-md break-words">name: {{ getAuthUser.name }}</p>
                </div>
            </div>
            <button @click="this.$store.state.showAddSongModal = true" type="submit" class="button flex gap-x-2 justify-center items-center mt-5">
                <svg class="button__svg">
                    <rect class="button__rect" height="80" width="220"></rect>
                </svg>
                <span class="text-white font-light font-['Gilroy'] text-2xl flex justify-center gap-x-2 items-center"><img src="../../../images/Add.svg" alt="">Add</span>
            </button>
        </div>

        <div class="flex flex-col overflow-y-auto w-[70%] gap-y-10 mt-[3%] pr-[2%]">
            <Splide :has-track="false" class="flex justify-start flex-col gap-y-5" :options="{
                rewind: true,
                pauseOnHover: true,
                pagination: false,
                perPage: 4,
                perMove: 1,
                type: 'loop',
                speed: 2000,
                gap: 10,
                autoplay: true,
                interval: 3500
            }">
                <div class="flex items-center justify-center">
                    <div class="w-[80%] flex gap-y-2 flex-col justify-between">
                        <h2 class="text-white text-center text-3xl font-bold">Don't agree</h2>
                        <pagination-component />
                    </div>
                </div>
                <SplideTrack>
                    <SplideSlide v-for="song in getRejectSongs">
                        <card-component>
                            <template v-slot:song_image><img class="rounded-2xl w-[90%] group-hover:brightness-[.2] h-[140px]" :src="song.image" alt="image"></template>
                            <template v-slot:song_title><p class="text-center text-white capitalize text-md break-words">{{ song.title }}</p></template>
                            <template v-slot:song_artist><p class="text-center text-gray-500 uppercase text-sm font-medium break-words">{{ song.artists[0].name }}</p></template>
                        </card-component>
                    </SplideSlide>
                </SplideTrack>
            </Splide>

            <Splide :has-track="false" class="flex justify-start flex-col" :options="{
                rewind: true,
                pauseOnHover: true,
                pagination: false,
                perPage: 4,
                perMove: 1,
                type: 'loop',
                speed: 2000,
                gap: 10,
                autoplay: true,
                interval: 3500
            }">
                <div class="flex items-center justify-center">
                    <div class="w-[80%] flex gap-y-2 flex-col justify-between">
                        <h2 class="text-white text-center text-3xl font-bold">Your songs</h2>
                        <pagination-component />
                    </div>
                </div>
                <SplideTrack>
                    <SplideSlide v-for="song in getArtist.songs">
                        <card-component>
                            <template v-slot:song_button>
                                <button @click="this.playSelectedTrack(song)" class="rounded-2xl opacity-0 group-hover:opacity-100 flex justify-center items-center">
                                    <img src="../../../images/Play.svg" alt="image">
                                </button>
                            </template>
                            <template v-slot:song_image><img class="rounded-2xl w-[90%] group-hover:brightness-[.2] h-[140px]" :src="song.image" alt="image"></template>
                            <template v-slot:song_title><p class="text-center text-white capitalize text-md break-words">{{ song.title }}</p></template>
                            <template v-slot:song_artist><p class="text-center text-gray-500 uppercase text-sm font-medium break-words">{{ getArtist.name }}</p></template>
                        </card-component>
                    </SplideSlide>
                </SplideTrack>
            </Splide>
        </div>

    </div>
</template>

<style scoped>

.button{
    --width: 180px;
    --height: 80px;
    position:relative;
    display:inline-block;
    width: var(--width);
    height: var(--height);
    transition:2s;
    background-color:transparent;
    border-color:transparent;
}

.button {
    outline:none;
    color:white
}

.button__svg,
.button__rect{
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    fill:none;
}

.button__rect{
    stroke:white;
    stroke-width:3;
    stroke-dasharray:var(--height) var(--width);
    stroke-dashoffset:calc(
        1.95 * var(--width) + 2.5 * var(--height)
    );
    transition:2s;
}

.button:hover .button__rect,
.button:focus .button__rect{
    stroke:white;
    stroke-dashoffset:calc(1.5 * var(--height));
}
</style>
