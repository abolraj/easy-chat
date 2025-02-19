<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SendMessageRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user()->participants()
            ->where('conversation_id', $this->route('conversation'))
            ->exists();
    }

    public function rules()
    {
        return [
            'content' => ['required', 'string', 'max:2000']
        ];
    }
}
