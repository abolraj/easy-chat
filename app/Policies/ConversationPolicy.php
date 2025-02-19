<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Conversation;

class ConversationPolicy
{
    public function view(User $user, Conversation $conversation)
    {
        return $conversation->participants()->where('user_id', $user->id)->exists();
    }
}
