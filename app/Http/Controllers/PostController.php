<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use MongoDB\Laravel\Eloquent\Model;

class PostController extends Controller
{
    public function show($slug)
    {
        return view('view', [
            'post' => Post::where('slug', '=', $slug)->first()
        ]);
    }
}
