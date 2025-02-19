<?php

namespace App\Notifications;

use App\Models\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewMessageNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Message $message) {}

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'message_id' => $this->message->id,
            'content' => $this->message->content,
            'conversation_id' => $this->message->conversation_id,
            'sender' => $this->message->user->name,
            'sent_at' => $this->message->created_at
        ];
    }
}
