<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import PaginationComponent from "@/components/paginationComponent.vue";
import artistCardComponent from "@/components/artistCardComponent.vue";
import cardComponent from "@/components/cardComponent.vue";
// SLIDER
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

export default defineComponent({
    name: "profileUserPage",
    components: { PaginationComponent, artistCardComponent, cardComponent, Splide, SplideSlide, SplideTrack },
    computed: {
      ...mapGetters(['getAuthUser', 'getRecommendedSongs']),
        getImageUrl() {
            const imageBlob = new Blob([this.$store.state.auth.me.image]);
            return URL.createObjectURL(imageBlob);
        }
    },
    mounted() {
        this.$store.dispatch('getUser')
        this.$store.dispatch('getRecommendedSongs')
    },
    methods: {
        ...mapActions(['playTrack', 'setEditAuthUser']),
        playSelectedTrack(track) { this.playTrack(track); },
    }
})
</script>

<template>
    <div class="flex justify-start justify-self-center overflow-y-auto gap-x-20 w-full h-[70vh]">

        <form @submit.prevent="setEditAuthUser" class="flex flex-col justify-center gap-y-5 mt-[5%]">
            <div v-if="!this.$store.state.showEditForm" class="flex">
                <img class="rounded-2xl h-[200px]" :class="!this.$store.state.showEditForm ? 'w-[80%]' : 'w-[80%]'" :src="getAuthUser.image" alt="image">
            </div>
            <div v-else class="flex flex-col items-center justify-center border-2 w-[80%] h-[25vh] gap-y-2 cursor-pointer">
                <input class="cursor-pointer w-[15%] absolute z-20 opacity-0" type="file" ref="avatar_user" @change="this.$store.state.auth.me.image = this.$refs.avatar_user.files[0]">
                <div v-if="!this.$refs.avatar_user" class="relative">
                    <img src="../../../images/icon_upload.svg" alt="upload">
                </div>
                <p v-if="!this.$refs.avatar_user" class="text-white break-words w-1/2 text-center font-['Gilroy']">DROP YOUR IMAGE</p>
                <img v-if="this.$refs.avatar_user" :src="this.getImageUrl" class="object-cover w-full h-full" alt="">
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

        <Splide :has-track="false" class="flex justify-center flex-col w-[60%]" :options="{
                rewind: true,
                pauseOnHover: true,
                pagination: false,
                perPage: 3,
                perMove: 1,
                type: 'loop',
                speed: 2000,
                gap: 30,
                autoplay: true,
                interval: 3500
            }">
            <div class="flex items-center justify-center">
                <div class="w-[80%] flex gap-y-4 flex-col justify-between">
                    <h2 class="text-white text-center text-3xl font-bold">Recommended for you</h2>
                    <pagination-component />
                </div>
            </div>
            <SplideTrack>
                <SplideSlide v-for="song in getRecommendedSongs">
                    <card-component class="w-[90%]">
                        <template v-slot:song_button>
                            <button @click="playSelectedTrack(song)" class="rounded-2xl opacity-0 group-hover:opacity-100 flex justify-center items-center">
                                <img src="../../../images/Play.svg" alt="image">
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
