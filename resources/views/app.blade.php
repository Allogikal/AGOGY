<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ env('APP_NAME') }}</title>
        {{--    ICON     --}}
        <link rel="icon" href="{{ asset('/favicon.ico') }}">
        <link rel="stylesheet" href="{{ asset('../../node_modules/vue-ssr-carousel/index.css')  }}">
{{--        @vite('resources/css/app.css')--}}
{{--        @vite('resources/css/fonts.css')--}}
{{--        @vite('resources/css/icon-fonts.css')--}}
{{--        @vite('resources/css/notifications.css')--}}
{{--        @vite('resources/css/scrollbar.css')--}}
        <link rel="stylesheet" type="text/css" href="/public/build/assets/app-cc3ed55d.css">
        <link rel="stylesheet" type="text/css" href="/public/build/assets/app-ec1b0e48.css">
        <link rel="stylesheet" type="text/css" href="/public/css/fonts.css">
        <link rel="stylesheet" type="text/css" href="/public/css/icon-fonts.css">
        <link rel="stylesheet" type="text/css" href="/public/css/notifications.css">
        <link rel="stylesheet" type="text/css" href="/public/css/scrollbar.css">
    </head>

    <body>
        <div id="app"></div>
{{--        @vite('resources/js/app.js')--}}
{{--        @vite('resources/js/scripts/notifications.js')--}}
{{--        @vite('resources/js/scripts/language_module.js')--}}
        <script type="text/javascript" src="/public/build/assets/app-a62e3799.js"></script>
    </body>

</html>
