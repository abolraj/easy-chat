<?php

use App\Events\UserTyping;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    // Conversations
    Route::apiResource('conversations', ConversationController::class);
    
    // Messages
    Route::prefix('conversations/{conversation}')->group(function () {
        Route::get('messages', [MessageController::class, 'index'])->name('conversations.messages.index');
        Route::post('messages', [MessageController::class, 'store'])->name('conversations.messages.store');
        Route::post('mark-read', [MessageController::class, 'markAsRead'])->name('conversations.messages.mark-as-read');
    });

    // Message Actions
    Route::apiResource('messages', MessageController::class)->only(['update', 'destroy']);

    // Typing Indicator
    Route::post('conversations/{conversation}/typing', function (Request $request) {
        broadcast(new UserTyping(
            $request->conversation->id,
            $request->user()->id,
            $request->is_typing
        ));
        return response()->noContent();
    })->name('conversations.typing');
});