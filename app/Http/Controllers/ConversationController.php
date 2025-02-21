<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Http\Requests\StoreConversationRequest;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function index()
    {
        return auth()->user()->conversations()
            ->with(['participants', 'messages'])
            ->get();
    }

    public function show(Request $request, $conversation)
    {
        $conversation = Conversation::where('id', $conversation)
            ->with(['messages', 'messages.user'])
            ->first();
        return response()->json($conversation);
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