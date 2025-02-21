<?php

namespace Database\Seeders;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\Participant;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(20)->create();

        $user = User::factory()->create([
            'name' => 'abol',
            'email' => 'abol@gmail.com',
        ]);

        // Create a private conversation
        $privateConv = Conversation::factory(20)->create();

        // Create a group conversation
        $groupConv = Conversation::factory(20)->group()->create();

        
        Participant::factory(100)
            ->create();
        
        Participant::factory(100)
            ->for($user)
            ->create();
        
        Message::factory(200)
            ->createQuietly();


        $user->conversations->each(function ($conversation) use ($user) {
            Message::factory(3)
                ->for($user)
                ->for($conversation)
                ->createQuietly();
        });


    }
}
