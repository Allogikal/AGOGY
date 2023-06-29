/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./resources/js/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'phone': {'max': '430px'}
            },
            backgroundImage: {
                'background-modal': "url('/resources/images/Background-modal.svg')",
                'background-modal-white': "url('/resources/images/Background-modal_white.svg')",
                'add-song': "url('/resources/images/Add_song_modal.svg')",
            }
        },
    },
    plugins: [],
}
