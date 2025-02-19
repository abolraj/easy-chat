<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_login(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => '12345678',
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'access_token' => true,
            'token_type' => 'Bearer',
        ]);
    }

    public function test_users_can_not_login_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(401);
        $response->assertJson([
            'message' => 'Credentials not matched !',
        ]);
    }

    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/logout');

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Logged out successfully',
        ]);
    }
}
