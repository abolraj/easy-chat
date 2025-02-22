<?php

namespace App\Events;

use App\Models\Conversation;
use App\Models\Participant;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ConversationRead implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Participant $participant)
    {
    }

    public function broadcastOn()
    {
        return new PresenceChannel("chat.conversation.{$this->participant->conversation_id}");
    }

    public function broadcastWith()
    {
        return $this->participant->toArray();
    }
}
