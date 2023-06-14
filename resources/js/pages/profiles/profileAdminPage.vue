<script>
import { defineComponent } from "vue";
import PaginationComponent from "@/components/paginationComponent.vue";
import CardComponent from "@/components/cardComponent.vue";
import artistCardComponent from "@/components/artistCardComponent.vue";
// SLIDER
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
    name: "profileAdminPage",
    components: { PaginationComponent, CardComponent, artistCardComponent, Splide, SplideSlide, SplideTrack },
    computed: {
        ...mapGetters(['getAuthUser', 'getApplicationsArtists', 'getApplicationsSongs']),
        getImageUrl() {
            const imageBlob = new Blob([this.$store.state.auth.me.image]);
            return URL.createObjectURL(imageBlob);
        }
    },
    mounted() {
        this.$store.dispatch('getUser')
        this.$store.dispatch('getApplicationsArtists')
        this.$store.dispatch('getApplicationsSongs')
    },
    methods: {
        ...mapActions(['setEditAuthUser', 'playTrack']),
        setConfirmArtist(payload) { this.$store.dispatch('setConfirmArtist', payload) },
        setRejectArtist(payload) { this.$store.dispatch('setRejectArtist', payload) },
        playSelectedTrack(track) { this.playTrack(track); },
    }
})
</script>

<template>
    <div class="flex justify-center overflow-hidden gap-x-20 w-[90%] pr-32">

        <form @submit.prevent="setEditAuthUser" class="flex flex-col justify-center items-center gap-y-5 mt-[5%]">
            <div v-if="!this.$store.state.showEditForm" class="flex justify-center">
                <img class="rounded-2xl" :class="!this.$store.state.showEditForm ? 'w-[40%]' : 'w-[80%]'" :src="getAuthUser.image" alt="image">
            </div>
            <div v-else class="flex flex-col items-center justify-center border-2 w-[80%] h-[25vh] gap-y-2 cursor-pointer">
                <input class="cursor-pointer w-[15%] absolute z-20 opacity-0" type="file" ref="avatar_user" @change="this.$store.state.auth.me.image = this.$refs.avatar_user.files[0]">
                <div v-show="!this.$refs.avatar_user" class="relative">
                    <img src="../../../images/icon_upload.svg" alt="upload">
                </div>
                <p v-show="!this.$refs.avatar_user" class="text-white break-words w-1/2 text-center font-['Gilroy']">DROP YOUR IMAGE</p>
                <img v-show="this.$refs.avatar_user" :src="this.getImageUrl" class="object-cover w-[100%] h-[100%]" alt="check">
            </div>
            <h1 class="text-white capitalize text-4xl flex">Hello, {{ !this.$store.state.showEditForm ? getAuthUser.name : 'USER' }}</h1>
            <div>
                <div>
                    <p @click.prevent="this.$store.state.showEditForm = true" v-if="!this.$store.state.showEditForm" class="text-gray-500 uppercase text-lg break-words">mail: {{ getAuthUser.email }}</p>
                    <p v-else class="text-gray-500 uppercase text-lg break-words">mail:
                        <input v-model="this.$store.state.auth.me.email" class="bg-transparent outline-0 border-[0.5px] w-[60%] mb-2" type="text">
                    </p>
                    <p @click.prevent="this.$store.state.showEditForm = true" v-if="!this.$store.state.showEditForm" class="text-gray-500 uppercase text-lg break-words">name: {{ getAuthUser.name }}</p>
                    <p v-else class="text-gray-500 uppercase text-lg break-words">name:
                        <input v-model="this.$store.state.auth.me.name" class="bg-transparent outline-0 border-[0.5px] w-[60%]" type="text">
                    </p>
                </div>
            </div>
            <button type="submit" class="button flex gap-x-2 justify-center items-center mt-5">
                <svg class="button__svg">
                    <rect class="button__rect" height="80" width="220"></rect>
                </svg>
                <span class="text-white font-light font-['Gilroy'] text-2xl flex justify-center gap-x-2 items-center"><img src="../../../images/Icon.svg" alt="">Edit</span>
            </button>
        </form>

        <div class="flex flex-col overflow-y-auto gap-y-5 mt-[3%] pr-[2%]">
            <Splide :has-track="false" class="flex justify-start flex-col" :options="{
                rewind: true,
                pauseOnHover: true,
                pagination: false,
                perPage: 4,
                perMove: 1,
                type: 'loop',
                gap: 10,
                speed: 2000,
                autoplay: true,
                interval: 3500
            }">
                <div class="flex items-center justify-center">
                    <div class="w-[80%] flex gap-y-2 flex-col justify-between">
                        <h2 class="text-white text-center text-3xl font-bold">Candidates an artist</h2>
                        <pagination-component />
                    </div>
                </div>
                <SplideTrack>
                    <SplideSlide :key="artist" v-for="artist in getApplicationsArtists">
                        <div class="group flex flex-col gap-y-2 justify-center items-center">
                            <div class="rounded-2xl w-[90%] cursor-pointer img-responsive">
                                <div class="rounded-2xl relative top-20 gap-x-4 z-10 flex justify-center items-center">
                                    <form @submit.prevent="setRejectArtist(artist.id)">
                                        <button type="submit" class="rounded-2xl opacity-0 group-hover:opacity-100 flex justify-center items-center">
                                            <img class="w-[70%] mb-2" src="../../../images/Cancel.svg" alt="cancel">
                                        </button>
                                    </form>
                                    <form @submit.prevent="setConfirmArtist(artist.id)">
                                        <button type="submit" class="rounded-2xl opacity-0 group-hover:opacity-100 flex justify-center items-center">
                                            <img class="w-[70%] mb-2" src="../../../images/Confirm.svg" alt="confirm">
                                        </button>
                                    </form>
                                </div>
                                <img class="rounded-2xl w-[90%] group-hover:brightness-[.2] h-[140px]" :src="artist.image" alt="image">
                            </div>
                            <div>
                                <p class="text-center text-white capitalize text-md break-words">{{ artist.name }}</p>
                                <p class="text-center text-gray-500 uppercase text-xs font-medium break-words">{{ artist.email }}</p>
                            </div>
                        </div>
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
                        <h2 class="text-white text-center text-3xl font-bold">Applications songs</h2>
                        <pagination-component />
                    </div>
                </div>
                <SplideTrack>
                    <SplideSlide v-for="song in getApplicationsSongs">
                        <div class="group flex flex-col gap-y-2 justify-center items-center">
                            <div class="rounded-2xl w-[90%] cursor-pointer img-responsive">
                                <div class="rounded-2xl relative top-20 z-10 flex justify-center items-center">
                                    <button @click="playSelectedTrack(song)" class="rounded-2xl opacity-0 group-hover:opacity-100 flex justify-center items-center">
                                        <img src="../../../images/Play.svg" alt="image">
                                    </button>
                                </div>
                                <img class="rounded-2xl w-[90%] group-hover:brightness-[.2] h-[140px]" :src="song.image" alt="image">
                            </div>
                            <div>
                                <p class="text-center text-white capitalize text-md break-words">{{ song.title }}</p>
                                <p class="text-center text-gray-500 uppercase text-sm font-medium break-words">{{ song.artists[0].name }}</p>
                            </div>
                        </div>
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
