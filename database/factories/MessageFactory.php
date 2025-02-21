<?php

// app/database/factories/MessageFactory.php

namespace Database\Factories;

use App\Models\Conversation;
use App\Models\User;
use App\Providers\FakerServiceProvider;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

class MessageFactory extends Factory
{
    public function definition(): array
    {
        $this->faker->addProvider(FakerServiceProvider::class);
        return [
            'user_id' => User::factory(),
            'conversation_id' => Conversation::factory(),
            'content' => fake()->paragraph,
            'attachments' => fake()->optional(.8)->randomElements([
                $this->faker->imageUrl( 300, 200, null, true, false, null, 'jpg'),
                $this->faker->imageUrl( 300, 100, null, true, false, null, 'jpg'),
                $this->faker->imageUrl( 400, 200, null, true, false, null, 'jpg'),
            ], rand(1, 3)),
            'edited_at' => null,
        ];
    }

    public function edited(): static
    {
        return $this->state([
            'edited_at' => fake()->dateTimeBetween('-1 week', 'now'),
        ]);
    }

    public function withAttachments(): static
    {
        return $this->state([
            'attachments' => ['file1.jpg', 'file2.pdf'],
        ]);
    }

    public function deleted(): static
    {
        return $this->state([
            'deleted_at' => now(),
        ]);
    }
}