<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
    computed: {
        ...mapGetters(['getAuthToken'])
    },
    methods: {
        ...mapActions(['logOutUser', 'createApplicationArtist']),
        burgerMenu() {
            this.$store.state.showBurgerMenu = !this.$store.state.showBurgerMenu;
        }
    }
})
</script>

<template>
<div class="flex justify-between w-full self-end">
    <div>
        <img class="box-border dark:hidden block" src="../../images/Logo.svg" alt="logo">
        <img class="box-border dark:block hidden" src="../../images/Logo_white.svg" alt="logo">
    </div>
    <div class="flex items-end gap-x-6">
        <form @submit.prevent="createApplicationArtist" v-show="$route.fullPath === '/profile_user'" v-if="getAuthToken" class="flex gap-x-4 mb-1">
            <p v-show="this.$store.state.upHere" class="text-white text-md font-light phone:hidden">Become An Artist</p>
            <button class="phone:hidden" type="submit" @mouseover="this.$store.state.upHere = true"
                    @mouseleave="this.$store.state.upHere = false">
                <img class="w-6 dark:hidden block" src="../../images/Add.svg" alt="add">
                <img class="w-6 dark:block hidden" src="../../images/Add_white.svg" alt="add">
            </button>
        </form>
        <div>
            <img @click.prevent="this.burgerMenu" class="w-[24px] mb-2.5 dark:hidden phone:block dark:phone:hidden hidden" src="../../images/Burger.svg" alt="burger">
            <img @click.prevent="this.burgerMenu" class="w-[24px] mb-2.5 dark:phone:block hidden dark:hidden" src="../../images/Burger_white.svg" alt="burger">
        </div>
        <button v-if="getAuthToken" @click.prevent="logOutUser">
            <img class="w-[24px] mb-1.5 dark:hidden block" src="../../images/Logout.svg" alt="logout">
            <img class="w-[24px] mb-1.5 dark:block hidden dark:w-[20px]" src="../../images/Logout_white.svg" alt="logout">
        </button>
        <router-link v-show="this.$store.state.auth.me.role_id === 1" v-if="getAuthToken" to="/profile_user" class="icon-login text-2xl text-white dark:text-[#292929]"></router-link>
        <router-link v-show="this.$store.state.auth.me.role_id === 2" v-if="getAuthToken" to="/profile_artist" class="icon-login text-2xl text-white dark:text-[#292929]"></router-link>
        <button v-show="this.$store.state.auth.me.role_id !== 1" v-else @click="this.$store.state.showAuthModal = true" class="icon-login text-2xl text-white dark:text-[#292929]"></button>
    </div>
</div>
</template>
