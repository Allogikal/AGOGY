<script>
import { defineComponent } from "vue";
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
    name: "favouritesPage",
    data() {
        return {
            searchQuery: ''
        }
    },
    computed: {
        ...mapGetters(['getSongs']),
        searchedSongs() {
            const searchQuery = this.searchQuery.toLowerCase();
            return this.getSongs.filter(song => song.title.toLowerCase().includes(searchQuery));
        }
    },
    mounted() {
        this.$store.dispatch('getSongs')
    },
    methods: {
        ...mapActions(['playTrack']),
        playSelectedTrack(track) { this.playTrack(track); },
    }
})
</script>

<template>
    <div class="flex flex-col gap-y-10 w-full justify-center items-center pt-10">
        <input class="border-l-2 border-b-2 border-white text-white bg-inherit w-[30%] pl-3 pb-3 outline-0" type="text" v-model="this.searchQuery">
        <div class="grid grid-cols-3 w-[60%] h-[90%] gap-10 overflow-y-auto pr-6">
            <span v-if="!searchQuery" v-for="song in 6" class="w-40 h-40 border-solid border-b-2 border-l-2"></span>
            <div v-else v-for="song in searchedSongs" class="flex flex-col h-[200px] gap-y-2 justify-center items-center border-solid border-b-2 border-l-2">
                <div class="rounded-2xl w-[90%] cursor-pointer img-responsive group">
                    <div class="rounded-2xl relative top-[50%] left-2 z-10 flex justify-center items-center">
                        <button @click="playSelectedTrack(song)" class="rounded-2xl opacity-0 group-hover:opacity-100 flex justify-center items-center">
                            <img src="../../images/Play.svg" alt="image">
                        </button>
                    </div>
                    <img class="w-full h-[120px] rounded-2xl pl-4" :src="song.image" alt="image">
                </div>
                <div>
                    <p class="text-center text-white capitalize text-md mb-4 break-words">{{ song.title }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
