<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ArtistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /*
         * USERS
         */

        // SEEDS FOR USER AUTH!!!
        User::factory()->create([
            'name' => 'Allogikal',
            'email' => 'user@mail.ru',
            'password' => Hash::make('useruser'),
            'image' => 'http://127.0.0.1:8000/storage/users/avatars/Allogikal.jpg',
            'description' => 'Начинающий исполнитель нового поколения',
            'is_candidate' => 0,
            'role_id' => 1
        ]);

        // SEEDS FOR ADMIN AUTH!!!
        User::factory()->create([
            'name' => 'ROOT',
            'email' => 'admin@mail.ru',
            'password' => Hash::make('adminadmin'),
            'image' => 'http://127.0.0.1:8000/storage/users/avatars/ROOT.jpg',
            'description' => 'Администратор данного сервиса',
            'is_candidate' => 0,
            'role_id' => 3,
        ]);

        // SEEDS FOR ARTIST AUTH!!! ID:3
        User::factory()->create([
            'name' => 'МИЧЕЛЗ',
            'email' => 'michelz@mail.ru',
            'password' => Hash::make('artistartist'),
            'image' => 'http://127.0.0.1:8000/storage/users/avatars/МИЧЕЛЗ.jpg',
            'description' => 'Начинающий исполнитель нового поколения',
            'is_candidate' => 0,
            'role_id' => 2,
        ]);

        // SEEDS FOR ARTIST AUTH!!! ID:4
        User::factory()->create([
            'name' => 'Zivert',
            'email' => 'zivertOf@mail.ru',
            'password' => Hash::make('artistartist'),
            'image' => 'http://127.0.0.1:8000/storage/users/avatars/Zivert.jpg',
            'description' => 'Лучший исполнитель всех поколений',
            'is_candidate' => 0,
            'role_id' => 2,
        ]);

        // SEEDS FOR ARTIST AUTH!!! ID:5
        User::factory()->create([
            'name' => 'DJ SMASH',
            'email' => 'dj_smash@mail.ru',
            'password' => Hash::make('artistartist'),
            'image' => 'http://127.0.0.1:8000/storage/users/avatars/DJ_SMASH.jpg',
            'description' => 'Опытный DJ нашего нового поколения',
            'is_candidate' => 0,
            'role_id' => 2,
        ]);

        // SEEDS FOR ARTIST AUTH!!! ID:6
        User::factory()->create([
            'name' => 'WYR GEMI',
            'email' => 'wyrr_gemi@mail.ru',
            'password' => Hash::make('artistartist'),
            'image' => 'http://127.0.0.1:8000/storage/users/avatars/WYR_GEMI.jpg',
            'description' => 'Агрессивная музыка от DJ WYRGEMI в машину для нашего нового поколения',
            'is_candidate' => 0,
            'role_id' => 2,
        ]);

        // SEEDS FOR ARTIST AUTH!!! ID:7
        User::factory()->create([
            'name' => 'MAGA',
            'email' => 'maga@mail.ru',
            'password' => Hash::make('artistartist'),
            'image' => 'http://127.0.0.1:8000/storage/users/avatars/MAGA.jpg',
            'description' => 'Агрессивная музыка от DJ MAGA в машину и не только для нашего нового поколения',
            'is_candidate' => 0,
            'role_id' => 2,
        ]);

        // SEEDS FOR ARTIST AUTH!!! ID:8
        User::factory()->create([
            'name' => 'Junona Boys',
            'email' => 'junona_boys@mail.ru',
            'password' => Hash::make('artistartist'),
            'image' => 'http://127.0.0.1:8000/storage/users/avatars/JUNONA_BOYS.jpg',
            'description' => 'Танцевальная музыка от JUNONA BOYS для нового поколения',
            'is_candidate' => 0,
            'role_id' => 2,
        ]);

        // SEEDS FOR ARTIST AUTH!!! ID:9
        User::factory()->create([
            'name' => 'WEEKND',
            'email' => 'the_weeknd@mail.ru',
            'password' => Hash::make('artistartist'),
            'image' => 'http://127.0.0.1:8000/storage/users/avatars/WEEKND.jpg',
            'description' => 'Хип-поп музыка от WEEKND для разных возрастов',
            'is_candidate' => 0,
            'role_id' => 2,
        ]);

        // SEEDS FOR ARTIST AUTH!!! ID:10
        User::factory()->create([
            'name' => 'Король и Шут',
            'email' => 'king@mail.ru',
            'password' => Hash::make('artistartist'),
            'image' => 'http://127.0.0.1:8000/storage/users/avatars/КОРОЛЬИШУТ.jpg',
            'description' => 'Легендарная группа снова здесь!',
            'is_candidate' => 0,
            'role_id' => 2,
        ]);

        // SEEDS FOR ARTIST AUTH!!! ID:11
        User::factory()->create([
            'name' => 'Chris Isaak',
            'email' => 'chris@mail.ru',
            'password' => Hash::make('artistartist'),
            'image' => 'http://127.0.0.1:8000/storage/users/avatars/Chris_Isaak.jpg',
            'description' => 'Легендарный исполнитель снова здесь! Возрадуйтесь!',
            'is_candidate' => 0,
            'role_id' => 2,
        ]);

        // SEEDS FOR ARTIST AUTH!!! ID:12
        User::factory()->create([
            'name' => 'Robert D.S.',
            'email' => 'robert@mail.ru',
            'password' => Hash::make('artistartist'),
            'image' => 'http://127.0.0.1:8000/storage/users/avatars/Chris_Isaak.jpg',
            'description' => 'Легендарный исполнитель снова здесь! Возрадуйтесь!',
            'is_candidate' => 1,
            'role_id' => 2,
        ]);

        // SEEDS FOR ARTIST AUTH!!! ID:13
        User::factory()->create([
            'name' => 'New player',
            'email' => 'player@mail.ru',
            'password' => Hash::make('artistartist'),
            'image' => 'http://127.0.0.1:8000/storage/users/avatars/Chris_Isaak.jpg',
            'description' => 'Легендарный исполнитель снова здесь! Возрадуйтесь!',
            'is_candidate' => 1,
            'role_id' => 2,
        ]);

        // SEEDS FOR ARTIST AUTH!!! ID:14
        User::factory()->create([
            'name' => 'Cancel',
            'email' => 'cancel@mail.ru',
            'password' => Hash::make('artistartist'),
            'image' => 'http://127.0.0.1:8000/storage/users/avatars/Chris_Isaak.jpg',
            'description' => 'Легендарный исполнитель снова здесь! Возрадуйтесь!',
            'is_candidate' => 1,
            'role_id' => 2,
        ]);

    }
}
