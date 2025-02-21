<?php

namespace App\Models;

use App\Observers\MessageObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[ObservedBy([MessageObserver::class])]
class Message extends Model
{
    use SoftDeletes, HasFactory;
    protected $fillable = ['content', 'user_id', 'conversation_id', 'attachments'];
    protected $casts = [
        'attachments' => 'array',
    ];

    protected $dates = ['edited_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function attachments()
    {
        return $this->attachments ? json_decode($this->attachments) : [];
    }
}
