<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ProfileController extends Controller
{
    // Get current user profile
    public function show(Request $request)
    {
        $user = $request->user();
        // Inisialisasi profile jika belum ada
        if (!$user->profile) {
            $user->profile = [
                'fullname' => '',
                'profilePath' => '',
                'domicile' => '',
                'birth' => '',
            ];
            $user->save();
        }
        return response()->json($user->profile);
    }

    // Update profile
    public function update(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'fullname' => 'nullable|string',
            'profilePath' => 'nullable|string',
            'domicile' => 'nullable|string',
            'birth' => 'nullable|string',
        ]);
        // Inisialisasi profile jika belum ada
        if (!$user->profile) {
            $user->profile = [
                'fullname' => '',
                'profilePath' => '',
                'domicile' => '',
                'birth' => '',
            ];
        }
        $user->profile = array_merge($user->profile, $data);
        $user->save();
        return response()->json($user->profile);
    }
}
