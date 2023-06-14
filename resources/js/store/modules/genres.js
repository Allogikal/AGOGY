import axios from 'axios'

const state = {
    genres: []
};

const getters = {
    getGenres: state => {
        return state.genres
    },
};

const mutations = {
    setGenres: (state, payload) => {
        state.genres = payload
    },
};

const actions = {
    getGenres: async (context, payload) => {
        let genres = await axios.get('http://127.0.0.1:8000/agogy/genres')
        context.commit('setGenres', genres.data.genres)
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
