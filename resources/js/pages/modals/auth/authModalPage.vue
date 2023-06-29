<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
    methods: {
        ...mapActions(['authUser'])
    }
})
</script>

<template>
    <transition name="modal">
        <div class="modal-mask w-screen h-screen">
            <div class="flex justify-center items-center">
                <div class="modal-container flex flex-col items-center bg-background-modal dark:bg-background-modal-white bg-cover bg-center bg-no-repeat w-[30%] phone:w-[90%] h-[90%]">
                    <button class="modal-default-button w-full flex justify-end cursor-auto">
                        <img @click="$emit('close')" class="cursor-pointer box-border mr-[10%] mt-[10%] dark:hidden block" src="../../../../images/Close.svg" alt="close">
                        <img @click="$emit('close')" class="cursor-pointer box-border mr-[10%] mt-[10%] dark:block hidden" src="../../../../images/Close_white.svg" alt="close">
                    </button>
                    <div class="flex flex-col items-center justify-center gap-y-10 pt-[5%]">
                        <div class="flex justify-center">
                            <img class="box-border dark:hidden block" src="../../../../images/Logo.svg" alt="logo">
                            <img class="box-border dark:block hidden" src="../../../../images/Logo_white.svg" alt="logo">
                        </div>
                        <form @submit.prevent="authUser" class="flex flex-col w-full gap-y-8 items-center">
                            <div class="flex flex-col w-[90%] mt-[20%]">
                                <label id="modal_auth_one" for="email" class="text-sm uppercase text-gray-500 ml-3 mb-3 dark:text-[#292929]">email</label>
                                <input id="email"
                                       required
                                       autocomplete="off"
                                       v-model="this.$store.state.auth.authUserData.email"
                                       class="h-6 border-l-2 border-b-2 outline-none tracking-widest font-light font-['Gilroy'] border-white text-md text-white bg-inherit pl-3 pb-2 outline-0 dark:text-[#292929] dark:border-[#292929]"
                                       type="email"/>
                            </div>
                            <div class="flex flex-col w-[90%]">
                                <label id="modal_auth_two" for="password" class="text-sm uppercase text-gray-500 ml-3 mb-3 dark:text-[#292929]">password</label>
                                <input id="password"
                                       required
                                       autocomplete="off"
                                       v-model="this.$store.state.auth.authUserData.password"
                                       class="h-6 border-l-2 border-b-2 outline-none tracking-widest font-light font-['Gilroy'] border-white text-md text-white bg-inherit pl-3 pb-2 outline-0 dark:text-[#292929] dark:border-[#292929]"
                                       type="password"/>
                            </div>
                            <button type="submit" class="button flex w-24 h-24 gap-x-2 justify-center items-center mt-5">
                                <svg class="button__svg">
                                    <rect class="button__rect" height="50" width="120"></rect>
                                </svg>
                                <span id="modal_auth_button" class="text-white font-light font-['Gilroy'] text-md dark:text-[#292929]">Sign in</span>
                            </button>
                            <p class="text-white font-['Gilroy'] mt-10 dark:text-[#292929] phone:mt-2">Don't have an account, please <a @click="this.$store.state.showAuthModal=false; this.$store.state.showRegisterModal=true;" class="cursor-pointer text-red-700 border-b-[1px] pb-1 dark:text-[#594747] dark:border-[#594747]">sign up</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>

.button{
    --width: 120px;
    --height: 40px;
    position:relative;
    display:inline-block;
    width: var(--width);
    height: var(--height);
    transition:2s;
    background-color:transparent;
    border-color:transparent;
}

.button {
    outline:none;
    color:white
}

.button__svg,
.button__rect{
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    fill:none;
}

.button__rect{
    stroke:white;
    stroke-width:3;
    stroke-dasharray:var(--height) var(--width);
    stroke-dashoffset:calc(
        1.95 * var(--width) + 2.5 * var(--height)
    );
    transition:2s;
}

.button:hover .button__rect,
.button:focus .button__rect{
    stroke:white;
    stroke-dashoffset:calc(1.5 * var(--height));
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: grid;
    transition: opacity 0.3s ease;
}

.modal-container {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

</style>
