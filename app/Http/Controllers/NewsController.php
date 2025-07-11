<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        // Hanya tampilkan berita dengan status 'Published' (huruf besar P) untuk publik
        $news = \App\Models\News::where('status', 'Published')->orderBy('created_at', 'desc')->get();
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
