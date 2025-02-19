<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMessageRequest extends FormRequest
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
            'content' => ['nullable', 'string', 'max:2000']
        ];
    }
}
