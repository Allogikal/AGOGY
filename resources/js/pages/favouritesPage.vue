<script>
import { defineComponent } from "vue";
import PaginationComponent from "@/components/paginationComponent.vue";
import CardComponent from "@/components/cardComponent.vue";
import ArtistCardComponent from "@/components/artistCardComponent.vue";
// SLIDER
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import {mapActions, mapGetters} from "vuex";


export default defineComponent({
    name: "favouritesPage",
    components: { PaginationComponent, CardComponent, ArtistCardComponent, Splide, SplideSlide, SplideTrack },
    computed: {
        ...mapGetters(['getAuthUser', 'getArtists'])
    },
    mounted() {
        this.$store.dispatch('getUser')
        this.$store.dispatch('getArtists')
    },
    methods: {
        ...mapActions(['playTrack']),
        playSelectedTrack(track) { this.playTrack(track); },
    }
})
</script>

<template>
    <div class="flex gap-x-20 overflow-y-auto mt-[7vh] w-full">

        <!--   SLIDER_LIKED_SONGS     -->
        <Splide :has-track="false" class="flex justify-start flex-col w-[50%]" :options="{
                rewind: true,
                pauseOnHover: true,
                pagination: false,
                perPage: 3,
                perMove: 1,
                type: 'loop',
                speed: 2000,
                gap: 30,
                autoplay: true,
                interval: 3500,
            }">
            <div class="flex items-center justify-center">
                <div class="w-[70%] flex justify-between">
                    <h2 class="text-white text-3xl font-bold">Liked Songs</h2>
                    <pagination-component />
                </div>
            </div>
            <SplideTrack>
                <SplideSlide v-for="song in getAuthUser.favourites">
                    <card-component>
                        <template v-slot:song_button>
                            <button @click="playSelectedTrack(song)" class="rounded-2xl opacity-0 group-hover:opacity-100 flex justify-center items-center">
                                <img src="../../images/Play.svg" alt="image">
                            </button>
                        </template>
                        <template v-slot:song_image><img class="rounded-2xl group-hover:brightness-[.2] h-[120px]" :src="song.image" alt="image"></template>
                        <template v-slot:song_title><p class="text-center text-white capitalize text-md break-words">{{ song.title }}</p></template>
                        <template v-slot:song_artist>
                            <router-link :to="`/artists/${song.artists[0].id}`">
                                <p class="text-center text-gray-500 uppercase text-sm font-medium break-words">{{ song.artists[0].name }}</p>
                            </router-link>
                        </template>
                    </card-component>
                    <card-component>
                        <template v-slot:song_button>
                            <button @click="playSelectedTrack(song)" class="rounded-2xl opacity-0 group-hover:opacity-100 flex justify-center items-center">
                                <img src="../../images/Play.svg" alt="image">
                            </button>
                        </template>
                        <template v-slot:song_image><img class="rounded-2xl group-hover:brightness-[.2] h-[120px]" :src="song.image" alt="image"></template>
                        <template v-slot:song_title><p class="text-center text-white capitalize text-md break-words">{{ song.title }}</p></template>
                        <template v-slot:song_artist>
                            <router-link :to="`/artists/${song.artists[0].id}`">
                                <p class="text-center text-gray-500 uppercase text-sm font-medium break-words">{{ song.artists[0].name }}</p>
                            </router-link>
                        </template>
                    </card-component>
                </SplideSlide>
            </SplideTrack>
        </Splide>


        <!--   SLIDER_POPULAR_ARTISTS     -->
        <Splide :has-track="false" class="flex justify-start gap-y-3 flex-col w-[30%]" :options="{
                rewind: true,
                perPage: 2,
                perMove: 1,
                pauseOnHover: true,
                pagination: false,
                type: 'loop',
                speed: 2000,
                autoplay: true,
                interval: 3500
            }">
            <div class="flex flex-col gap-y-3 justify-between items-center">
                <h2 class="text-white text-3xl font-bold">Popular artists</h2>
                <pagination-component />
            </div>
            <SplideTrack>
                <SplideSlide v-for="artist in getArtists">
                    <router-link :to="`/artists/${artist.id}`" class="flex flex-col gap-y-2 justify-center items-center">
                        <img class="rounded-2xl w-[60%] cursor-pointer h-[85px]" :src="artist.image" alt="image">
                        <div>
                            <p class="text-center uppercase text-sm break-words text-gray-500">{{ artist.name }}</p>
                        </div>
                    </router-link>
                    <router-link :to="`/artists/${artist.id}`" class="flex flex-col gap-y-2 justify-center items-center mt-4">
                        <img class="rounded-2xl w-[60%] cursor-pointer h-[85px]" :src="artist.image" alt="image">
                        <div>
                            <p class="text-center uppercase text-sm break-words text-gray-500">{{ artist.name }}</p>
                        </div>
                    </router-link>
                    <router-link :to="`/artists/${artist.id}`" class="flex flex-col gap-y-2 justify-center items-center mt-4">
                        <img class="rounded-2xl w-[60%] cursor-pointer h-[85px]" :src="artist.image" alt="image">
                        <div>
                            <p class="text-center uppercase text-sm break-words text-gray-500">{{ artist.name }}</p>
                        </div>
                    </router-link>
                </SplideSlide>
            </SplideTrack>
        </Splide>

    </div>
</template>
