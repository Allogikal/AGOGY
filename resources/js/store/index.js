import { createStore } from "vuex"
import songs from "@/store/modules/songs"
import genres from "@/store/modules/genres"
import artists from "@/store/modules/artists"
import auth from "@/store/modules/auth"
import player from "@/store/modules/player";

const store = createStore({
    state: {
        upHere: false,
        showEditForm: false,
        showAddSongModal: false,
    },
    modules: { songs, artists, genres, auth, player }
})

export default store
