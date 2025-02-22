<?php

// app/database/factories/ConversationFactory.php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ConversationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'type' => 'private',
            'name' => fake()->words(3, true),
        ];
    }

    public function group(): static
    {
        return $this->state([
            'type' => 'group',
            'name' => fake()->words(3, true),
        ]);
    }
}