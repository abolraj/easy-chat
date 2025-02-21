<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;
    protected $casts = ['type' => 'string'];

    public function participants()
    {
        return $this->hasMany(Participant::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class)->latest();
    }
}
