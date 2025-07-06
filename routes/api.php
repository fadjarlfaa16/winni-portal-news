<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\TopicController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/me', [AuthController::class, 'me'])->middleware('auth:api');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');

// Test route to check database connection
Route::get('/test-db', function () {
    try {
        $user = new \App\Models\User();
        $user->id = 'test-' . uniqid();
        $user->username = 'testuser';
        $user->email = 'test@test.com';
        $user->password = bcrypt('password');
        $user->profile = ['fullname' => 'Test User'];
        $user->is_verified = false;
        
        $user->save();
        
        // Delete the test user
        $user->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Database connection working'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Database connection failed',
            'error' => $e->getMessage()
        ], 500);
    }
});

// News CRUD
Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{id}', [NewsController::class, 'show']);
Route::middleware('auth:api')->group(function () {
    Route::post('/news', [NewsController::class, 'store']);
    Route::put('/news/{id}', [NewsController::class, 'update']);
    Route::delete('/news/{id}', [NewsController::class, 'destroy']);
});

// Topic CRUD
Route::get('/topics', [TopicController::class, 'index']);
Route::post('/topics', [TopicController::class, 'store']);
