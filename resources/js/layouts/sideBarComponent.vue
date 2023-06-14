<template>
    <div class="flex flex-col justify-center ml-5 self-center gap-y-12">
        <ul class="text-white text-xl flex flex-col gap-y-2">
            <li class="text-gray-500 font-medium">Music</li>
            <li><router-link to="/favourites"><span class="text-gray-400 icon-favourite mr-2"></span> Liked</router-link></li>
            <li><router-link to="/search"><span class="text-gray-400 icon-search mr-2"></span> Search</router-link></li>
            <li><router-link to="/home"><span class="text-gray-400 icon-community mr-2"></span> Community</router-link></li>
        </ul>

        <ul class="text-white text-xl flex flex-col gap-y-2">
            <li class="text-gray-500 font-medium">Settings</li>
            <li><button><span class="text-gray-400 icon-language mr-2"></span> Language</button></li>
            <li><button><span class="text-gray-400 icon-faqs mr-2"></span> About</button></li>
            <li><button><span class="text-gray-400 icon-theme mr-2"></span> Theme</button></li>
        </ul>
    </div>
</template>
