import store from "@/store";

const state = {
    currentTrack: null,
    isPlaying: false,
    audioPlayer: null,
    audioDuration: 0,
    favouriteStatus: false,
    currentPosition: 0
};

const getters = {
    getCurrentTrack: state => {
        return state.currentTrack
    },
    getIsPlaying: state => {
        return state.isPlaying
    },
    getAudioDuration: state => {
        return state.audioDuration;
    },
    getFavouriteStatus: state => {
        return state.favouriteStatus
    },
    getCurrentPosition: state => {
        return state.currentPosition
    }
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
    setAudioDuration(state, duration) {
        state.audioDuration = duration;
    },
    setFavouriteStatus(state, payload) {
        state.favouriteStatus = payload
    },
    setCurrentPosition(state, payload) {
        state.currentPosition = payload
    },
};

const actions = {
    playTrack({ commit, state }, track) {
        if (state.audioPlayer) {
            state.audioPlayer.pause();
            state.audioPlayer.currentTime = 0;
        }
        commit('setPlaybackState', false);
        commit('setCurrentTrack', track);
        commit('setPlaybackState', true);
        const audioPlayer = new Audio(track.song_url);
        commit('setAudioPlayer', audioPlayer);
        audioPlayer.addEventListener('ended', () => {
            store.dispatch('playNext')
        });
        audioPlayer.addEventListener('loadedmetadata', () => {
            commit('setAudioDuration', audioPlayer.duration);
        });
        audioPlayer.addEventListener('timeupdate', () => {
            commit('setCurrentPosition', audioPlayer.currentTime);
        });
        if (store.state.auth.me.favourites) {
            store.dispatch('checkOnFavourite')
        }
        audioPlayer.play();
    },

    playPrevious({ commit, state }) {
        const songs = store.state.songs.songs
        const currentIndex = songs.findIndex(track => track.id === state.currentTrack.id);
        const previousIndex = currentIndex - 1;
        if (previousIndex >= 0) {
            const previousTrack = songs[previousIndex];
            commit('setCurrentTrack', previousTrack);
            commit('setPlaybackState', true);
            store.dispatch('playTrack', previousTrack)
        }
    },

    playNext({ commit, state }) {
        const songs = store.state.songs.songs
        const currentIndex = songs.findIndex(track => track.id === state.currentTrack.id);
        const nextIndex = currentIndex + 1;
        if (nextIndex < songs.length) {
            const nextTrack = songs[nextIndex];
            commit('setCurrentTrack', nextTrack);
            commit('setPlaybackState', true);
            store.dispatch('playTrack', nextTrack)
        }
    },

    checkOnFavourite({ commit, state }) {
        const currentIndex = state.currentTrack.id;
        const favouriteSongsOfUser = store.state.auth.me.favourites
        let result = false
        favouriteSongsOfUser.forEach((song) => {
            if (song.id === currentIndex) {
                result = true
            }
        })
        commit('setFavouriteStatus', result);
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
