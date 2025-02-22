<?php

use App\Events\UserTyping;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Authentication routes
Route::controller(AuthenticationController::class)
    ->name('auth.')
    ->group(function(){
    Route::post('register', 'register')
        ->name('register');

    Route::post('login', 'login')
        ->name('login');

    Route::post('logout', 'logout')
        ->middleware('auth:sanctum')
        ->name('logout');
});

Route::middleware(['auth:sanctum'])->group(function () {
    // Users
    Route::apiResource('users', UserController::class);
    Route::get('/user', [UserController::class, 'authUser']);
    
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