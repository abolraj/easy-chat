<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMessageRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user()->can('view', $this->conversation);
    }

    public function rules()
    {
        return [
            'content' => ['required_without:attachments', 'string', 'max:2000'],
            'attachments' => ['array', 'max:5'],
            'attachments.*' => ['file', 'max:10240']
        ];
    }
}