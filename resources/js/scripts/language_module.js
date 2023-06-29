import { createInstance } from 'i18next'

const i18nextInstance = createInstance();
i18nextInstance.init({
    lng: 'en',
    resources: {
        en: {
            translation: {
                side_bar: {
                    title_main_one: "Music",
                    title_one: {
                        item_one: "Liked",
                        item_two: "Search",
                        item_three: "Community"
                    },
                    title_main_two: "Settings",
                    title_two: {
                        item_one: "Language",
                        item_two: "Policy",
                        item_three: "Theme"
                    }
                },
                home_page: {
                    title_one: "Top chart",
                    title_two: "Popular Genres",
                    title_three: "Know about them"
                }
            }
        },
        ru: {
            translation: {
                side_bar: {
                    title_main_one: "Музыка",
                    title_one: {
                        item_one: "Избранные",
                        item_two: "Поиск",
                        item_three: "Сообщество"
                    },
                    title_main_two: "Опции",
                    title_two: {
                        item_one: "Смена языка",
                        item_two: "Политика",
                        item_three: "Смена темы"
                    }
                },
                home_page: {
                    title_one: "Топ чарт",
                    title_two: "Популярные жанры",
                    title_three: "О них знают"
                }
            }
        }
    }
});

function localizePage() {
    if (document.getElementById('title_one')) {document.getElementById('title_one').textContent = i18nextInstance.t('home_page.title_one');}
    if (document.getElementById('title_two')) {document.getElementById('title_two').textContent = i18nextInstance.t('home_page.title_two');}
    if (document.getElementById('title_three')) {document.getElementById('title_three').textContent = i18nextInstance.t('home_page.title_three');}
    if (document.getElementById('title_sidebar_1')) {document.getElementById('title_sidebar_1').textContent = i18nextInstance.t('side_bar.title_main_one');}
    if (document.getElementById('title_sidebar_2')) {document.getElementById('title_sidebar_2').textContent = i18nextInstance.t('side_bar.title_one.item_one');}
    if (document.getElementById('title_sidebar_3')) {document.getElementById('title_sidebar_3').textContent = i18nextInstance.t('side_bar.title_one.item_two');}
    if (document.getElementById('title_sidebar_4')) {document.getElementById('title_sidebar_4').textContent = i18nextInstance.t('side_bar.title_one.item_three');}
    if (document.getElementById('title_sidebar_5')) {document.getElementById('title_sidebar_5').textContent = i18nextInstance.t('side_bar.title_main_two');}
    if (document.getElementById('title_sidebar_6')) {document.getElementById('title_sidebar_6').textContent = i18nextInstance.t('side_bar.title_two.item_one');}
    if (document.getElementById('title_sidebar_7')) {document.getElementById('title_sidebar_7').textContent = i18nextInstance.t('side_bar.title_two.item_two');}
    if (document.getElementById('title_sidebar_8')) {document.getElementById('title_sidebar_8').textContent = i18nextInstance.t('side_bar.title_two.item_three');}
}

i18nextInstance.on('initialized', localizePage);
i18nextInstance.init();

function changeLanguage(lng) {
    i18nextInstance.changeLanguage(lng, localizePage);
}

export { changeLanguage }
