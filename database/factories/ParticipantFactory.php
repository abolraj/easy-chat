<?php

// app/database/factories/ParticipantFactory.php

namespace Database\Factories;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ParticipantFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'conversation_id' => Conversation::factory(),
            'last_read_at' => fake()->optional(0.7)->dateTimeBetween('-1 month', 'now'),
        ];
    }
}