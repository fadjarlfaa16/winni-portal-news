<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $req)
    {
        \Log::info('Register request received', $req->all());
        
        $validator = Validator::make($req->all(), [
            'username' => 'required|string|min:3|max:50',
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            \Log::error('Validation failed', $validator->errors()->toArray());
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if user already exists
        try {
            $existingUser = User::where('email', $req->email)->orWhere('username', $req->username)->first();
            if ($existingUser) {
                \Log::warning('User already exists', ['email' => $req->email, 'username' => $req->username]);
                return response()->json([
                    'success' => false,
                    'message' => 'User with this email or username already exists'
                ], 422);
            }
        } catch (\Exception $e) {
            \Log::error('Error checking existing user', ['error' => $e->getMessage()]);
        }

        try {
            $user = new User();
            $user->id = (string) Str::uuid();
            $user->username = $req->username;
            $user->email = $req->email;
            $user->password = Hash::make($req->password);
            $user->profile = [
                'fullname' => '',
                'profilePath' => '',
                'birth' => null,
                'domicile' => ''
            ];
            $user->is_verified = false;
            $user->save();

            \Log::info('User created successfully', ['user_id' => $user->id]);

            $token = JWTAuth::fromUser($user);
            
            return response()->json([
                'success' => true,
                'user' => $user,
                'token' => $token
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Registration failed', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json([
                'success' => false,
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $req)
    {
        \Log::info('Login request received', ['email' => $req->email]);
        
        $validator = Validator::make($req->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            \Log::error('Login validation failed', $validator->errors()->toArray());
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $user = User::where('email', $req->email)->first();

            if (!$user) {
                \Log::warning('User not found', ['email' => $req->email]);
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials'
                ], 401);
            }

            if (!Hash::check($req->password, $user->password)) {
                \Log::warning('Invalid password', ['email' => $req->email]);
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials'
                ], 401);
            }

            $token = JWTAuth::fromUser($user);
            \Log::info('Login successful', ['user_id' => $user->id]);

            return response()->json([
                'success' => true,
                'user' => $user,
                'token' => $token
            ]);
        } catch (JWTException $e) {
            \Log::error('JWT error during login', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Could not create token',
                'error' => $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            \Log::error('Login error', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Login failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function me()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return response()->json([
                'success' => true,
                'user' => $user
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token invalid'
            ], 401);
        }
    }

    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully'
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to logout'
            ], 500);
        }
    }
}
