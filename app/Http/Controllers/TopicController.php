<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    public function index()
    {
        return response()->json(Topic::all());
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|unique:topics,name']);
        $topic = Topic::create(['name' => $request->name]);
        return response()->json($topic, 201);
    }
} 