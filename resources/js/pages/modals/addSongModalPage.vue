<script>
import { defineComponent } from "vue";
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
    methods: {
        ...mapActions(['createSong'])
    },
    computed: {
        ...mapGetters(['getGenres']),
        getImageUrl() {
            const imageBlob = new Blob([this.$store.state.songs.songArtistData.image]);
            return URL.createObjectURL(imageBlob);
        }
    },
    mounted() {
        this.$store.dispatch('getGenres')
    }
})
</script>

<template>
    <transition name="modal">
        <div class="modal-mask w-screen h-screen">
            <div class="flex justify-center items-center">
                <form @submit.prevent="createSong" class="modal-container flex flex-col items-center bg-add-song bg-cover bg-center bg-no-repeat w-[60%] h-[70%]">
                    <button class="modal-default-button w-full flex justify-end cursor-auto">
                        <img @click="$emit('close')" class="cursor-pointer box-border mr-[5%] mt-[5%]" src="../../../images/Close.svg" alt="close">
                    </button>
                    <div class="w-full h-[55%] flex gap-x-10">
                        <div class="w-[50%] flex justify-end">
                            <div class="flex flex-col items-center justify-center border-2 w-[70%] mt-8 h-full gap-y-2 cursor-pointer">
                                <input class="cursor-pointer w-[15%] h-[20%] absolute z-20 opacity-0" type="file" ref="avatar_user" @change="this.$store.state.songs.songArtistData.image = this.$refs.avatar_user.files[0]">
                                <div v-show="!this.$store.state.songs.songArtistData.image" class="relative">
                                    <img src="../../../images/icon_upload.svg" alt="upload">
                                </div>
                                <p v-show="!this.$store.state.songs.songArtistData.image" class="text-white break-words w-1/2 text-center font-['Gilroy']">DROP SONG IMAGE</p>
                                <img v-show="this.$store.state.songs.songArtistData.image" :src="getImageUrl" class="object-cover w-[100%] h-[100%]" alt="check">
                            </div>
                        </div>
                        <div class="w-1/2 flex flex-col">
                            <div class="flex flex-col w-full">
                                <label for="title" class="text-sm uppercase text-gray-500 ml-3 mb-3">title song</label>
                                <input id="title"
                                       v-model="this.$store.state.songs.songArtistData.title"
                                       class="h-6 w-[65%] border-l-2 border-b-2 tracking-widest font-light font-['Gilroy'] border-white text-md text-white bg-inherit pl-3 pb-2 mb-4 outline-0"
                                       type="text"/>
                            </div>
                            <div class="flex flex-col w-full">
                                <label for="genres" class="text-sm uppercase text-gray-500 ml-3 mb-3">select genres song</label>
                                <select v-model="this.$store.state.songs.songArtistData.genre_id" class="bg-transparent outline-0 border-white border-2 py-2 text-white text-xl font-light w-[65%] h-[55%] text-center" multiple name="genres" id="genres">
                                    <option class="text-white" v-for="genre in getGenres" :value="genre.id">{{ genre.title }}</option>
                                </select>
                            </div>
                            <div class="flex flex-col w-full">
                                <label for="song_file" class="text-lg text-white ml-3 mb-3 font-['Gilroy']">Size uploaded file no more <span class="font-['Gilroy'] text-red-700">12 MB</span></label>
                                <div class="flex items-center justify-center border-2 w-[65%] py-6">
                                    <p class="text-white break-words w-[35%] text-center font-['Gilroy']">DROP FILE</p>
                                    <input class="cursor-pointer w-[15%] h-[12%] absolute z-20 opacity-0" id="song_file" type="file" ref="song_file" @change="this.$store.state.songs.songArtistData.song = this.$refs.song_file.files[0]">
                                    <div class="relative">
                                        <img class="w-[60%]" src="../../../images/icon_upload.svg" alt="upload">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="button flex w-24 h-24 gap-x-2 justify-center items-center mt-5">
                        <svg class="button__svg">
                            <rect class="button__rect" height="50" width="120"></rect>
                        </svg>
                        <span class="text-white font-light font-['Gilroy'] text-md">Send</span>
                    </button>
                </form>
            </div>
        </div>
    </transition>
</template>

<style scoped>

.button{
    --width: 120px;
    --height: 40px;
    position:relative;
    display:inline-block;
    width: var(--width);
    height: var(--height);
    transition:2s;
    background-color:transparent;
    border-color:transparent;
}

.button {
    top: 10%;
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

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: grid;
    transition: opacity 0.3s ease;
}

.modal-container {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}
</style>
<script setup>
</script>
