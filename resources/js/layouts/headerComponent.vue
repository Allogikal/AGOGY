<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
    computed: {
        ...mapGetters(['getAuthToken'])
    },
    methods: {
        ...mapActions(['logOutUser', 'createApplicationArtist'])
    }
})
</script>

<template>
<div class="flex justify-between w-full self-end">
    <div>
        <img class="box-border" src="../../images/Logo.svg" alt="logo">
    </div>
    <div class="flex items-end gap-x-6">
        <form @submit.prevent="createApplicationArtist" v-show="$route.fullPath === '/profile_user'" v-if="getAuthToken" class="flex gap-x-4 mb-1">
            <p v-show="this.$store.state.upHere" class="text-white text-md font-light">Become An Artist</p>
            <button type="submit" @mouseover="this.$store.state.upHere = true"
                    @mouseleave="this.$store.state.upHere = false">
                <img class="w-6" src="../../images/Add.svg" alt="add">
            </button>
        </form>
        <button v-if="getAuthToken" @click.prevent="logOutUser">
            <img class="w-[24px] mb-1.5" src="../../images/Logout.svg" alt="logout">
        </button>
        <router-link v-show="this.$store.state.auth.me.role_id === 1" v-if="getAuthToken" to="/profile_user" class="icon-login text-2xl text-white"></router-link>
        <router-link v-show="this.$store.state.auth.me.role_id === 2" v-if="getAuthToken" to="/profile_artist" class="icon-login text-2xl text-white"></router-link>
        <button v-show="this.$store.state.auth.me.role_id !== 1" v-else @click="this.$store.state.showAuthModal = true" class="icon-login text-2xl text-white"></button>
    </div>
</div>
</template>
