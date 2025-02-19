<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Http\Requests\StoreConversationRequest;

class ConversationController extends Controller
{
    public function index()
    {
        return auth()->user()->conversations()
            ->with(['participants', 'lastMessage'])
            ->paginate();
    }

    public function store(StoreConversationRequest $request)
    {
        $conversation = Conversation::create([
            'type' => $request->type,
            'name' => $request->name
        ]);

        $participants = array_merge([auth()->id()], $request->participants);
        $conversation->participants()->createMany(
            collect($participants)->map(fn($id) => ['user_id' => $id])
        );

        return response()->json($conversation, 201);
    }
}