<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class SignUpRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:30',
            'description' => 'required|string|max:300',
            'image' => 'required|file|mimes:jpg,bmp,png,svg',
            'email' => 'required|string|max:40|email|unique:users',
            'password' => 'required|string|min:8|max:30|confirmed',
            'role_id' => 'integer',
            'policy' => 'required'
        ];
    }
}
