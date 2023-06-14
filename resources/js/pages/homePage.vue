<script>
import {defineComponent} from 'vue'
import {mapActions, mapGetters} from "vuex";
import PaginationComponent from "@/components/paginationComponent.vue";
import CardComponent from "@/components/cardComponent.vue";
import GenreCardComponent from "@/components/genreCardComponent.vue";
import ArtistCardComponent from "@/components/artistCardComponent.vue";
// SLIDER
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

export default defineComponent({
    name: "homePage",
    components: { CardComponent, PaginationComponent, GenreCardComponent, ArtistCardComponent, Splide, SplideSlide, SplideTrack },
    computed: {
        ...mapGetters(['getGenres', 'getSongs', 'getArtists'])
    },
    mounted() {
        this.$store.dispatch('getGenres')
        this.$store.dispatch('getSongs')
        this.$store.dispatch('getArtists')
    },
    methods: {
        ...mapActions(['playTrack']),
        playSelectedTrack(track) { this.playTrack(track); },
    }
})
</script>

<template>
    <div class="flex flex-col justify-around gap-y-10 overflow-y-auto mt-[5vh] pt-[30%]">

        <!--   SLIDER_TOP_CHART     -->
        <Splide :has-track="false" class="flex justify-start flex-col mr-[4%]" :options="{
                rewind: true,
                pauseOnHover: true,
                pagination: false,
                perPage: 5,
                perMove: 1,
                type: 'loop',
                speed: 2000,
                gap: 40,
                autoplay: true,
                interval: 2500
            }">
            <div class="flex justify-between items-center ml-[5%] mr-[15%]">
                <h2 class="text-white text-3xl font-bold">Top chart</h2>
                <pagination-component />
            </div>
            <SplideTrack>
                <SplideSlide v-for="song in getSongs">
                    <card-component>
                        <template v-slot:song_button>
                            <button @click="this.playSelectedTrack(song)" class="rounded-2xl opacity-0 group-hover:opacity-100 flex justify-center items-center">
                                <img src="../../images/Play.svg" alt="image">
                            </button>
                        </template>
                        <template v-slot:song_image><img class="rounded-2xl group-hover:brightness-[.2] h-[140px]" :src="song.image" alt="image"></template>
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

        <!--   SLIDER_POPULAR_GENRES   -->
        <Splide :has-track="false" class="flex justify-start flex-col mr-[4%]" :options="{
                rewind: true,
                pauseOnHover: true,
                pagination: false,
                perPage: 5,
                perMove: 1,
                type: 'loop',
                speed: 2000,
                gap: 40,
                autoplay: true,
                interval: 2500
            }">
            <div class="flex justify-between items-center ml-[5%] mr-[15%]">
                <h2 class="text-white text-3xl font-bold">Popular Genres</h2>
                <pagination-component />
            </div>
            <SplideTrack>
                <SplideSlide v-for="genre in getGenres">
                    <genre-card-component @click="this.playSelectedTrack(genre.songs[0])">
                        <template v-slot:genre_image><img class="rounded-2xl group-hover:brightness-[.2]" :src="genre.image" alt="image"></template>
                        <template v-slot:genre_title><p class="text-center text-white capitalize text-md break-words">{{ genre.title }}</p></template>
                    </genre-card-component>
                </SplideSlide>
            </SplideTrack>
        </Splide>

        <!--   SLIDER_POPULAR_ARTISTS     -->
        <Splide :has-track="false" class="flex justify-start gap-y-5 flex-col mr-[4%]" :options="{
                rewind: true,
                perPage: 6,
                perMove: 1,
                pauseOnHover: true,
                pagination: false,
                type: 'loop',
                speed: 2000,
                gap: 40,
                autoplay: true,
                interval: 3500
            }">
            <div class="flex justify-between items-center ml-[5%] mr-[15%]">
                <h2 class="text-white text-3xl font-bold">Know about them</h2>
                <pagination-component />
            </div>
            <SplideTrack>
                <SplideSlide v-for="artist in getArtists">
                    <router-link :to="`/artists/${artist.id}`" class="flex flex-col gap-y-2 justify-center items-center">
                        <img class="rounded-2xl w-full h-[120px] cursor-pointer object-cover" :src="artist.image" alt="image">
                        <div>
                            <p class="text-center uppercase text-sm break-words text-gray-500">{{ artist.name }}</p>
                        </div>
                    </router-link>
                </SplideSlide>
            </SplideTrack>
        </Splide>

    </div>
</template>
