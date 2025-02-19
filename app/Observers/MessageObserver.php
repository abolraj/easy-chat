<?php

namespace App\Observers;

use App\Models\Message;
use App\Notifications\NewMessageNotification;

class MessageObserver
{
    public function created(Message $message)
    {
        $message->conversation->participants
            ->filter(fn($p) => $p->user_id !== $message->user_id)
            ->each->user->notify(new NewMessageNotification($message));
    }
}
