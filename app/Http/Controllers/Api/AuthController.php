<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    const AUTH_TOKEN = 'simple_spa';

    public function login(Request $request)
    {
        $credentials = array(
            'email' => $request->get('email'),
            'password' => $request->get('password'),
        );

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
//            $user->avatar = $user->thumbnail;
            $user->token = $user->createToken(self::AUTH_TOKEN)->plainTextToken;
            return $this->respondSuccess($user, 'Login successful');

        }
        return response()->json(['error' => 'Unauthorised'], 401);
    }

    public function logout(): string
    {
        auth()->user()->tokens()->delete();
        return 'user logged out';
    }

    public function isAuthenticated(Request $request): ?string
    {
        return $request->bearerToken();
    }
}
