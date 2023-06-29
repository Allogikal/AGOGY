<script>
import { defineComponent } from "vue";
import PaginationComponent from "@/components/paginationComponent.vue";
import CardComponent from "@/components/cardComponent.vue";
// SLIDER
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import {mapActions, mapGetters} from "vuex";
import {AtomSpinner} from "epic-spinners";

export default defineComponent({
    name: "songsArtistPage",
    components: {AtomSpinner, PaginationComponent, CardComponent, Splide, SplideSlide, SplideTrack },
    computed: {
        ...mapGetters(['getArtist'])
    },
    mounted() {
        this.$store.dispatch('showArtist', this.$route.params.id)
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
    <div v-else class="flex flex-col mt-[4vh] gap-y-6 overflow-y-auto">

        <div class="flex w-[85%] gap-x-10 justify-center ml-10 phone:flex-col">
            <div class="flex w-[25%] h-[170px] phone:w-[90%] phone:h-[200px] phone:ml-5">
                <img class="rounded-2xl w-[200px] object-cover" :src="getArtist.image" alt="image">
            </div>
            <div class="flex w-[80%] gap-y-2 flex-col phone:gap-y-5 phone:mt-5">
                <h1 class="text-white uppercase text-5xl dark:text-[#292929] phone:text-center">{{ getArtist.name }}</h1>
                <p class="w-[80%] text-gray-500 uppercase text-xl font-medium break-words dark:text-[#292929] dark:opacity-50 phone:text-center phone:w-full">{{ getArtist.description }}</p>
            </div>
        </div>

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
                interval: 3500,
                mediaQuery: 'max',
                breakpoints: {
		            430: {
			            perPage: 2,
		            },
                }
            }">
            <div class="flex flex-col justify-center items-center gap-y-3">
                <h2 class="text-white text-3xl font-bold dark:text-[#292929]">{{ getArtist.name }} Songs</h2>
                <pagination-component />
            </div>
            <SplideTrack>
                <SplideSlide v-for="song in getArtist.songs">
                    <card-component >
                        <template v-slot:song_button>
                            <button @click="this.playSelectedTrack(song)" class="rounded-2xl opacity-0 group-hover:opacity-100 flex justify-center items-center">
                                <img src="../../images/Play.svg" alt="image">
                            </button>
                        </template>
                        <template v-slot:song_image><img class="rounded-2xl group-hover:brightness-[.2] h-[135px]" :src="song.image" alt="image"></template>
                        <template v-slot:song_title><p class="text-center text-white capitalize text-md break-words dark:text-[#292929] dark:font-medium">{{ song.title }}</p></template>
                        <template v-slot:song_artist>
                            <p class="text-center text-gray-500 uppercase text-sm font-medium break-words dark:text-[#292929] dark:font-light">{{ getArtist.name }}</p>
                        </template>
                    </card-component>
                </SplideSlide>
            </SplideTrack>
        </Splide>

    </div>
</template>
