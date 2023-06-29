<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
    methods: {
        ...mapActions(['storeUser'])
    },
    computed: {
        getImageUrl() {
            const imageBlob = new Blob([this.$store.state.auth.registerUserData.image]);
            return URL.createObjectURL(imageBlob);
        }
    }
})
</script>

<template>
    <transition name="modal">
        <div class="modal-mask w-screen h-screen">
            <div class="flex justify-center items-center">
                <div class="modal-container flex flex-col items-center bg-background-modal dark:bg-background-modal-white bg-cover bg-center bg-no-repeat w-[30%] phone:w-[90%] h-[95%]">
                    <button class="modal-default-button w-full flex justify-end cursor-auto">
                        <img @click="$emit('close')" class="cursor-pointer box-border mr-[10%] mt-[10%] dark:hidden block" src="../../../../images/Close.svg" alt="close">
                        <img @click="$emit('close')" class="cursor-pointer box-border mr-[10%] mt-[10%] dark:block hidden" src="../../../../images/Close_white.svg" alt="close">
                    </button>
                    <div class="flex flex-col items-center justify-center gap-y-10">
                        <div @click.prevent="this.$store.state.auth.nextPageOnRegisterModal = true" class="flex justify-center">
                            <img class="box-border dark:hidden block" src="../../../../images/Logo.svg" alt="logo">
                            <img class="box-border dark:block hidden" src="../../../../images/Logo_white.svg" alt="logo">
                        </div>
                        <form @submit.prevent="storeUser" class="flex flex-col w-full gap-y-8 phone:gap-y-5 items-center">
                            <div v-show="this.$store.state.auth.nextPageOnRegisterModal" class="flex flex-col w-full">
                                <label for="name" class="text-sm uppercase text-gray-500 ml-3 mb-3 dark:text-[#292929]">name</label>
                                <input id="name"
                                       autocomplete="off"
                                       v-model="this.$store.state.auth.registerUserData.name"
                                       class="h-6 outline-none border-l-2 border-b-2 tracking-widest font-light font-['Gilroy'] border-white text-md text-white bg-inherit pl-3 pb-2 dark:text-[#292929] dark:border-[#292929]"
                                       type="text"/>
                            </div>
                            <div v-show="this.$store.state.auth.nextPageOnRegisterModal" class="flex flex-col w-full">
                                <label for="email" class="text-sm uppercase text-gray-500 ml-3 mb-3 dark:text-[#292929]">email</label>
                                <input id="email"
                                       autocomplete="off"
                                       v-model="this.$store.state.auth.registerUserData.email"
                                       class="h-6 outline-none border-l-2 border-b-2 tracking-widest font-light font-['Gilroy'] border-white text-md text-white bg-inherit pl-3 pb-2 dark:text-[#292929] dark:border-[#292929]"
                                       type="email"/>
                            </div>
                            <div v-show="this.$store.state.auth.nextPageOnRegisterModal" class="flex flex-col w-full">
                                <label for="password" class="text-sm uppercase text-gray-500 ml-3 mb-3 dark:text-[#292929]">password</label>
                                <input id="password"
                                       autocomplete="off"
                                       v-model="this.$store.state.auth.registerUserData.password"
                                       class="h-6 outline-none border-l-2 border-b-2 tracking-widest font-light font-['Gilroy'] border-white text-md text-white bg-inherit pl-3 pb-2 dark:text-[#292929] dark:border-[#292929]"
                                       type="password"/>
                            </div>
                            <div v-show="this.$store.state.auth.nextPageOnRegisterModal" class="flex flex-col w-full">
                                <label for="password_confirmation" class="text-sm uppercase text-gray-500 ml-3 mb-3 dark:text-[#292929]">password confirm</label>
                                <input id="password_confirmation"
                                       autocomplete="off"
                                       v-model="this.$store.state.auth.registerUserData.password_confirmation"
                                       class="h-6 outline-none border-l-2 border-b-2 tracking-widest font-light font-['Gilroy'] border-white text-md text-white bg-inherit pl-3 pb-2 dark:text-[#292929] dark:border-[#292929]"
                                       type="password"/>
                            </div>

                            <!-- SECTION OF REGISTRATION COMPONENTS -->
                            <div v-show="!this.$store.state.auth.nextPageOnRegisterModal" class="flex flex-col w-[70%]">
                                <label for="description" class="text-sm uppercase text-gray-500 ml-3 mb-3 dark:text-[#292929]">write about self</label>
                                <textarea id="description"
                                          autocomplete="off"
                                       v-model="this.$store.state.auth.registerUserData.description"
                                       class="h-8 outline-none border-l-2 border-b-2 tracking-widest font-light font-['Gilroy'] border-white text-md text-white bg-inherit pl-3 resize-none dark:text-[#292929] dark:border-[#292929]"
                                       type="password"/>
                            </div>
                            <div v-show="!this.$store.state.auth.nextPageOnRegisterModal" class="flex flex-col items-center justify-center border-2 w-[50%] h-[20vh] dark:border-[#292929] gap-y-2 cursor-pointer">
                                <input class="cursor-pointer w-[15%] h-[20%] absolute z-20 opacity-0" type="file" ref="avatar_user" @change="this.$store.state.auth.registerUserData.image = this.$refs.avatar_user.files[0]">
                                <div v-show="!this.$store.state.auth.registerUserData.image" class="relative">
                                    <img class="dark:hidden block" src="../../../../images/icon_upload.svg" alt="upload">
                                    <img class="dark:block hidden" src="../../../../images/icon_upload_white.svg" alt="upload">
                                </div>
                                <p v-show="!this.$store.state.auth.registerUserData.image" class="text-white break-words w-1/2 text-center font-['Gilroy'] dark:text-[#292929]">DROP YOUR IMAGE</p>
                                <img v-show="this.$store.state.auth.registerUserData.image" :src="this.getImageUrl" class="object-cover w-[100%] h-[100%]" alt="check">
                            </div>
                            <div v-show="!this.$store.state.auth.nextPageOnRegisterModal" class="flex items-center justify-center w-[100%] gap-x-3 text-sm">
                                <input id="policy" class="hidden" v-model="this.$store.state.auth.registerUserData.policy" type="checkbox">
                                <label for="policy" class="checkbox-label">
                                    <span class="checkbox-custom border-white border-[1px] dark:border-[#292929]"></span>
                                    <span class="checkbox-text text-white dark:text-[#292929] phone:text-xs">Вы согласны с
                                    <router-link class="text-[#cc0000] border-white dark:text-[#594747] dark:border-[#594747]" to="/policy" @click.prevent="this.$emit('close')">политикой конфиденциальности</router-link></span>
                                </label>
                            </div>

                            <!-- SECTION OF REGISTRATION COMPONENTS -->

                            <button v-show="this.$store.state.auth.nextPageOnRegisterModal" @click.prevent="this.$store.state.auth.nextPageOnRegisterModal = false" class="button flex w-24 h-24 gap-x-2 justify-center items-center mt-5">
                                <svg class="button__svg">
                                    <rect class="button__rect" height="40" width="120"></rect>
                                </svg>
                                <span class="text-white font-light font-['Gilroy'] text-md dark:text-[#292929]">Next</span>
                            </button>
                            <div v-show="!this.$store.state.auth.nextPageOnRegisterModal" class="flex gap-x-5">
                                <button @click.prevent="this.$store.state.auth.nextPageOnRegisterModal = true" class="button flex w-24 h-24 gap-x-2 justify-center items-center mt-5">
                                    <svg class="button__svg">
                                        <rect class="button__rect" height="50" width="120"></rect>
                                    </svg>
                                    <span class="text-white font-light font-['Gilroy'] text-md dark:text-[#292929]">Back</span>
                                </button>
                                <button type="submit" class="button flex w-24 h-24 gap-x-2 justify-center items-center mt-5">
                                    <svg class="button__svg">
                                        <rect class="button__rect" height="50" width="120"></rect>
                                    </svg>
                                    <span class="text-white font-light font-['Gilroy'] text-md dark:text-[#292929]">Send</span>
                                </button>
                            </div>
                            <p class="text-white font-['Gilroy'] mt-5 dark:text-[#292929] phone:mt-0">Have an account, please <a @click="this.$store.state.showAuthModal=true; this.$store.state.showRegisterModal=false;" class="cursor-pointer text-red-700 border-b-[1px] pb-1 dark:text-[#594747] dark:border-[#594747]">sign in</a></p>
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

.checkbox-label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
}

.checkbox-custom {
    width: 14px;
    height: 14px;
    margin-right: 8px;
    display: inline-block;
    position: relative;
}

.checkbox-custom::after {
    content: "";
    position: absolute;
    display: none;
}

input[type="checkbox"]:checked + .checkbox-label .checkbox-custom::after {
    display: block;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    left: 4px;
    top: 1px;
}

.checkbox-text {
    font-family: Gilroy, serif;
}

.checkbox-text a {
    border-bottom: 1px solid;
    padding-bottom: 2px;
}

</style>
