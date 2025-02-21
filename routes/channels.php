<?php

use App\Models\Conversation;
use App\Models\Participant;
use Illuminate\Support\Facades\Broadcast;

Broadcast::routes(['middleware' => ['auth:sanctum']]);

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('chat.conversation.{conversation_id}', function ($user) {
    return true;
    // $participant = Participant::where('conversation_id', $conversation_id)
    //     ->where('user_id', $user->id)
    //     ->first();
    // return !!$participant;
});
