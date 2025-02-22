<?php

namespace App\Http\Controllers;

use App\Events\ConversationRead;
use App\Models\Conversation;
use App\Http\Requests\StoreConversationRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function index()
    {
        return auth()->user()->conversations()
            ->with(['participants', 'messages'])
            ->latest()
            ->get();
    }

    public function show(Request $request, $conversation)
    {
        $conversation = Conversation::where('id', $conversation)
            ->with(['messages', 'messages.user'])
            ->first();

        $read_participant = $conversation
            ->participants()
            ->where('user_id', $request->user()->id)
            ->first();
            
        $read_participant->update(['last_read_at' => (new Carbon(now()))->toDateTimeString()]);
        info('readeed participant:', $read_participant->toArray());
        broadcast(new ConversationRead($read_participant));

        return response()->json($conversation);
    }

    public function store(StoreConversationRequest $request)
    {
        $conversation = Conversation::create([
            'type' => $request->type,
            'name' => $request->name,
        ]);

        $participants = array_merge([auth()->id()], $request->users);
        $conversation->participants()->createMany(
            collect($participants)->map(fn($id) => ['user_id' => $id])
        );

        return response()->json($conversation, 201);
    }
}