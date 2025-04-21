<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $req)
    {
        $user = User::create($req->only('name', 'email', 'password'));
        $token = auth()->login($user);
        return response()->json(compact('user', 'token'));
    }

    public function login(Request $req)
    {
        $credentials = $req->only('email', 'password');
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return response()->json(compact('token'));
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Logged out']);
    }
}
