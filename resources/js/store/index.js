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
        darkMode: false,
        showBurgerMenu: false,
        activeLoading: true
    },
    mutations: {
      changeMode: (state, payload) => {
          state.darkMode = payload
      }
    },
    actions: {
        changeMode: async (context) => {
            if (!context.state.darkMode) {
                context.commit('changeMode', true)
                document.querySelector("html").classList.add('dark')
                return true
            }
            document.querySelector("html").classList.remove('dark')
            context.commit('changeMode', false)
        },
    },
    modules: { songs, artists, genres, auth, player }
})

export default store
