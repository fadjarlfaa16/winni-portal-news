<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function register(Request $req)
    {
        $user = User::create([
            'name' => $req->name,
            'email' => $req->email,
            'password' => Hash::make($req->password),
        ]);

        $token = JWTAuth::fromUser($user); // <-- Correct way to generate token from user
        return response()->json(compact('user', 'token'));
    }

    public function login(Request $req)
    {
        $credentials = $req->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) { // <-- Correct way
                return response()->json(['error' => 'Unauthorized'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        return response()->json(compact('token'));
    }

    public function me()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate(); // <-- Correct way to get user from token
            return response()->json($user);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token invalid'], 401);
        }
    }

    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken()); // <-- Correct way to invalidate token
            return response()->json(['message' => 'Logged out']);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Failed to logout'], 500);
        }
    }
}
