<script>
import { defineComponent } from "vue";
import PaginationComponent from "@/components/paginationComponent.vue";
import CardComponent from "@/components/cardComponent.vue";
import ArtistCardComponent from "@/components/artistCardComponent.vue";
// SLIDER
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import {mapActions, mapGetters} from "vuex";
import {AtomSpinner} from "epic-spinners";

export default defineComponent({
    name: "favouritesPage",
    components: {AtomSpinner, PaginationComponent, CardComponent, ArtistCardComponent, Splide, SplideSlide, SplideTrack },
    computed: {
        ...mapGetters(['getAuthUser', 'getArtists'])
    },
    mounted() {
        this.$store.dispatch('getUser')
        this.$store.dispatch('getArtists')
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
    <div v-else class="flex gap-x-20 overflow-y-auto mt-[7vh] w-full phone:flex-col">

        <!--   SLIDER_LIKED_SONGS     -->
        <Splide :has-track="false" class="flex justify-start flex-col w-[50%] phone:w-[90%]" :options="{
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
                mediaQuery: 'max',
                breakpoints: {
		            430: {
			            perPage: 2
		            }
                }
            }">
            <div class="flex items-center justify-center">
                <div class="w-[70%] flex justify-between phone:flex-col phone:items-center phone:gap-y-4">
                    <h2 class="text-white text-3xl dark:text-[#292929] phone:text-center font-bold">Liked Songs</h2>
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
                        <template v-slot:song_title><p class="text-center text-white capitalize text-md break-words dark:text-[#292929] dark:font-medium phone:truncate">{{ song.title }}</p></template>
                        <template v-slot:song_artist>
                            <router-link :to="`/artists/${song.artists[0].id}`">
                                <p class="text-center text-gray-500 uppercase text-sm font-medium break-words dark:text-[#292929] opacity-50">{{ song.artists[0].name }}</p>
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
                        <template v-slot:song_title><p class="text-center text-white capitalize text-md break-words dark:text-[#292929] dark:font-medium">{{ song.title }}</p></template>
                        <template v-slot:song_artist>
                            <router-link :to="`/artists/${song.artists[0].id}`">
                                <p class="text-center text-gray-500 uppercase text-sm font-medium break-words dark:text-[#292929] opacity-50">{{ song.artists[0].name }}</p>
                            </router-link>
                        </template>
                    </card-component>
                </SplideSlide>
            </SplideTrack>
        </Splide>

        <!--   SLIDER_POPULAR_ARTISTS     -->
        <Splide :has-track="false" class="flex justify-start gap-y-3 flex-col w-[30%] phone:w-[90%]" :options="{
                rewind: true,
                perPage: 2,
                perMove: 1,
                pauseOnHover: true,
                pagination: false,
                type: 'loop',
                speed: 2000,
                autoplay: true,
                interval: 3500,
                mediaQuery: 'max',
                breakpoints: {
		            430: {
			            perPage: 2
		            }
                }
            }">
            <div class="flex flex-col gap-y-3 justify-between items-center">
                <h2 class="text-white text-3xl font-bold dark:text-[#292929]">Popular artists</h2>
                <pagination-component class="mb-5" />
            </div>
            <SplideTrack>
                <SplideSlide v-for="artist in getArtists">
                    <router-link :to="`/artists/${artist.id}`" class="flex flex-col gap-y-2 justify-center items-center">
                        <img class="rounded-2xl w-[60%] cursor-pointer h-[85px]" :src="artist.image" alt="image">
                        <div>
                            <p class="text-center uppercase text-sm break-words text-gray-500 dark:text-[#292929] opacity-50 mb-2">{{ artist.name }}</p>
                        </div>
                    </router-link>
                    <router-link :to="`/artists/${artist.id}`" class="flex flex-col gap-y-2 justify-center items-center">
                        <img class="rounded-2xl w-[60%] cursor-pointer h-[85px]" :src="artist.image" alt="image">
                        <div>
                            <p class="text-center uppercase text-sm break-words text-gray-500 dark:text-[#292929] opacity-50 mb-2">{{ artist.name }}</p>
                        </div>
                    </router-link>
                    <router-link :to="`/artists/${artist.id}`" class="flex flex-col gap-y-2 justify-center items-center">
                        <img class="rounded-2xl w-[60%] cursor-pointer h-[85px]" :src="artist.image" alt="image">
                        <div>
                            <p class="text-center uppercase text-sm break-words text-gray-500 dark:text-[#292929] opacity-50 mb-2">{{ artist.name }}</p>
                        </div>
                    </router-link>
                </SplideSlide>
            </SplideTrack>
        </Splide>

    </div>
</template>
