<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $token = $request->bearerToken();
        $username = null;
        if ($token) {
            try {
                $user = JWTAuth::parseToken()->authenticate();
                $username = $user->username;
            } catch (\Exception $e) {
                $username = null;
            }
        }
        \Log::info('NewsController@index called', [
            'token' => $token,
            'username' => $username,
        ]);
        if ($username) {
            $news = News::whereRaw([
                'author' => ['$regex' => '^' . preg_quote($username) . '$', '$options' => 'i']
            ])->get();
            \Log::info('News found:', $news->toArray());
        } else {
            $news = [];
            \Log::info('No username found, returning empty news.');
        }
        return response()->json($news);
    }

    public function show($id)
    {
        $news = News::findOrFail($id);
        return response()->json($news);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'urlImage' => 'required|string',
            'content' => 'required|string',
            'likeCount' => 'nullable|integer',
            'topic' => 'required|array',
            'status' => 'required|string',
        ]);
        $user = $request->user();
        $data['author'] = $user && isset($user->username) ? $user->username : 'Unknown';
        $news = News::create($data);
        return response()->json($news, 201);
    }

    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);
        $data = $request->validate([
            'title' => 'required|string',
            'urlImage' => 'required|string',
            'content' => 'required|string',
            'likeCount' => 'nullable|integer',
            'topic' => 'required|array',
            'status' => 'required|string',
        ]);
        $user = $request->user();
        $data['author'] = $user && isset($user->username) ? $user->username : 'Unknown';
        $news->update($data);
        return response()->json($news);
    }

    public function destroy($id)
    {
        $news = News::findOrFail($id);
        $news->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
