<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $req)
    {
        $requestData = $req->all();
        $requestData['is_verified'] = false;

        $req->validate([
            'username' => 'required|string|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ]);

        $user = User::create([
            'id' => (string) Str::uuid(),
            'username' => $req->username,
            'email' => $req->email,
            'password' => Hash::make($req->password),
            'profile' => [
                'fullname' => '',
                'profilePath' => '',
                'birth' => null,
                'domicile' => ''
            ],
            'is_verified' => false
        ]);

        $token = JWTAuth::fromUser($user); // <-- Correct way to generate token from user
        return response()->json(compact('user', 'token'));
    }

    public function login(Request $req)
    {
        $credentials = $req->only('email', 'password');

        try {
            $user = User::where('email', $req->email)->first();

            if (!$user || !Hash::check($req->password, $user->password)) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $token = JWTAuth::fromUser($user);

            return response()->json(compact('token', 'user'));
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        return response()->json(compact('token'));
    }

    public function me()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
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
