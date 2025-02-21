<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Conversation;
use App\Events\MessageSent;
use App\Events\MessageUpdated;
use App\Events\MessageDeleted;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;

class MessageController extends Controller
{
    public function index(Conversation $conversation)
    {
        $this->authorize('view', $conversation);
        
        return $conversation->messages()
            ->with(['user', 'conversation'])
            ->latest()
            ->paginate(50);
    }

    public function store(StoreMessageRequest $request, Conversation $conversation)
    {

        $attachments = [];
        if($request->hasFile('attachments'))
            foreach($request->file('attachments') as $file){
                $filePath = '/storage/' . $file->storePublicly('images');
                $attachments[] = url($filePath);
            }

        $message = $conversation->messages()->create([
            'user_id' => $request->user()->id,
            'content' => $request->content,
            'attachments' => $attachments,
        ]);

        broadcast(new MessageSent($message))->toOthers();
        
        return response()->json($message->load('user'), 201);
    }

    public function update(UpdateMessageRequest $request, Message $message)
    {
        $this->authorize('update', $message);

        $message->update([
            'content' => $request->content,
            'edited_at' => now()
        ]);

        broadcast(new MessageUpdated($message));

        return response()->json($message);
    }

    public function destroy(Message $message)
    {
        $this->authorize('delete', $message);

        $message->delete();
        broadcast(new MessageDeleted($message));

        return response()->noContent();
    }

    public function markAsRead(Conversation $conversation)
    {
        $participant = $conversation->participants()
            ->where('user_id', auth()->id())
            ->first();

        $participant->update(['last_read_at' => now()]);

        broadcast(new ConversationRead($conversation->id, auth()->id()));

        return response()->noContent();
    }
}