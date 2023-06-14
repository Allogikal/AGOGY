const state = {
    currentTrack: null,
    isPlaying: false,
    audioPlayer: null,
};

const getters = {
    getCurrentTrack: state => {
        return state.currentTrack
    },
    getIsPlaying: state => {
        return state.isPlaying
    },
}

const mutations = {
    setCurrentTrack(state, track) {
        state.currentTrack = track;
    },

    setPlaybackState(state, isPlaying) {
        state.isPlaying = isPlaying;
    },

    setAudioPlayer(state, audioPlayer) {
        state.audioPlayer = audioPlayer;
    },
};

const actions = {
    playTrack({ commit }, track) {
        commit('setPlaybackState', false);
        commit('setCurrentTrack', track);
        commit('setPlaybackState', true);
        const audioPlayer = new Audio(track.song_url);
        commit('setAudioPlayer', audioPlayer)
        audioPlayer.addEventListener('ended', () => {
            commit('setPlaybackState', false);
        });
        audioPlayer.play();
    },

    togglePlayback({ commit, state }) {
        const audioPlayer = state.audioPlayer;

        if (state.isPlaying) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }

        commit('setPlaybackState', !state.isPlaying);
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};
