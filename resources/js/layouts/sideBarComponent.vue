<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { changeLanguage } from "@/scripts/language_module";

export default defineComponent({
    methods: {
        changeLanguage() {
            if(localStorage.getItem('language') === 'en') {
                localStorage.setItem('language', 'ru')
                changeLanguage('ru')
            }
            else {
                localStorage.setItem('language', 'en')
                changeLanguage('en')
            }
        },
        checkOnMobile() {
            this.$store.state.showBurgerMenu = window.outerWidth >= 430;
            window.addEventListener('resize', () => {
                this.$store.state.showBurgerMenu = window.outerWidth >= 430;
            })
        },
        ...mapActions(['changeMode'])
    },
    mounted() {
        localStorage.setItem('language', 'en')
        this.checkOnMobile()
    }
})
</script>

<template>
    <div v-if="this.$store.state.showBurgerMenu" class="flex flex-col justify-center ml-5 self-center gap-y-12">
        <ul class="text-white text-xl flex flex-col gap-y-2 phone:mr-10">
            <li @click.prevent="checkOnMobile" id="title_sidebar_1" class="text-gray-500 font-medium dark:text-[#292929] dark:opacity-40 phone:text-center">Music</li>
            <li @click.prevent="checkOnMobile" class="phone:text-center"><router-link class="dark:text-[#292929] dark:font-medium" to="/favourites"><span class="text-gray-400 icon-favourite mr-2 dark:text-[#292929]"></span><span id="title_sidebar_2">Liked</span></router-link></li>
            <li @click.prevent="checkOnMobile" class="phone:text-center"><router-link class="dark:text-[#292929] dark:font-medium" to="/search"><span class="text-gray-400 icon-search mr-2 dark:text-[#292929]"></span><span id="title_sidebar_3">Search</span></router-link></li>
            <li @click.prevent="checkOnMobile" class="phone:text-center"><router-link class="dark:text-[#292929] dark:font-medium" to="/home"><span class="text-gray-400 icon-community mr-2 dark:text-[#292929]"></span><span id="title_sidebar_4">Community</span></router-link></li>
        </ul>

        <ul class="text-white text-xl flex flex-col gap-y-2 phone:mr-10">
            <li @click.prevent="checkOnMobile" id="title_sidebar_5" class="text-gray-500 font-medium dark:text-[#292929] dark:opacity-40 phone:text-center">Settings</li>
            <li @click.prevent="checkOnMobile" class="phone:text-center"><button @click="changeLanguage()" class="dark:text-[#292929] dark:font-medium"><span class="text-gray-400 icon-language mr-2 dark:text-[#292929]"></span><span id="title_sidebar_6">Language</span></button></li>
            <li @click.prevent="checkOnMobile" class="phone:text-center"><router-link class="dark:text-[#292929] dark:font-medium" to="/policy"><span class="text-gray-400 icon-faqs mr-2 dark:text-[#292929]"></span><span id="title_sidebar_7">Policy</span></router-link></li>
            <li @click.prevent="checkOnMobile" class="phone:text-center"><button @click.prevent="changeMode" class="dark:text-[#292929] dark:font-medium"><span class="text-gray-400 icon-theme mr-2 dark:text-[#292929]"></span><span id="title_sidebar_8">Theme</span></button></li>
        </ul>
    </div>
</template>
