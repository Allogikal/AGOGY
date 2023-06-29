<?php

namespace Database\Seeders;

use App\Models\Genre;
use Illuminate\Database\Seeder;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /*
         * GENRES
         */

        // GENRE!!! ID:1
        Genre::factory()->create([
            'title' => 'Поп-музыка',
            'popularity' => rand(0, 100),
            'image' => 'http://agogy.site/public/storage/genres/POP.png'
        ]);

        // GENRE!!! ID:2
        Genre::factory()->create([
            'title' => 'Электроника',
            'popularity' => rand(0, 100),
            'image' => 'http://agogy.site/public/storage/genres/ELECTRO.png'
        ]);

        // GENRE!!! ID:3
        Genre::factory()->create([
            'title' => 'Танцевальная',
            'popularity' => rand(0, 100),
            'image' => 'http://agogy.site/public/storage/genres/DANCE.png'
        ]);

        // GENRE!!! ID:4
        Genre::factory()->create([
            'title' => 'Хип-хоп',
            'popularity' => rand(0, 100),
            'image' => 'http://agogy.site/public/storage/genres/HIP-HOP.png'
        ]);

        // GENRE!!! ID:5
        Genre::factory()->create([
            'title' => 'Русский рок',
            'popularity' => rand(0, 100),
            'image' => 'http://agogy.site/public/storage/genres/ROCK.png'
        ]);

        // GENRE!!! ID:6
        Genre::factory()->create([
            'title' => 'Легкая музыка',
            'popularity' => rand(0, 100),
            'image' => 'http://agogy.site/public/storage/genres/LIGHT.png'
        ]);

    }
}
