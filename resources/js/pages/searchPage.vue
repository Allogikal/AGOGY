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
    <div class="flex flex-col gap-y-10 w-full justify-center items-center pt-10 phone:w-[350px]">
        <input class="border-l-2 border-b-2 border-white dark:border-[#292929] text-white dark:text-[#292929] dark:font-medium bg-inherit w-[30%] phone:w-[50%] pl-3 pb-3 outline-0" type="text" v-model="this.searchQuery">
        <div class="grid grid-cols-3 w-[60%] phone:w-[90%] h-[90%] gap-10 overflow-y-auto pr-6">
            <span v-if="!searchQuery" v-for="song in 6" class="w-40 h-40 phone:w-20 phone:h-20 border-solid border-b-2 border-l-2 dark:border-[#292929]"></span>
            <div v-else v-for="song in searchedSongs" class="flex flex-col h-[200px] phone:h-20 gap-y-2 justify-center items-center border-solid border-b-2 dark:border-[#292929] border-l-2">
                <div class="rounded-2xl w-[90%] phone:w-20 phone:h-20 cursor-pointer img-responsive group">
                    <div class="rounded-2xl relative top-[50%] left-2 z-10 flex justify-center items-center">
                        <button @click="playSelectedTrack(song)" class="rounded-2xl opacity-0 group-hover:opacity-100 flex justify-center items-center">
                            <img src="../../images/Play.svg" alt="image">
                        </button>
                    </div>
                    <img class="w-full h-[120px] phone:w-20 phone:h-20 rounded-2xl pl-4" :src="song.image" alt="image">
                </div>
                <div>
                    <p class="text-center text-white capitalize text-md mb-4 break-words dark:text-[#292929] phone:text-sm phone:mt-7 phone:truncate">{{ song.title }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
