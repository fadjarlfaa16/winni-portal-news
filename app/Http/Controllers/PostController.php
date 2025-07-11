<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class PostController extends Controller
{
    // List all posts with comments
    public function index()
    {
        $posts = Post::orderBy('created_at', 'desc')->get();
        return response()->json($posts);
    }

    // Create sample posts for testing
    public function createSamplePosts()
    {
        try {
            // Check if posts already exist
            $existingPosts = Post::count();
            if ($existingPosts > 0) {
                return response()->json(['message' => 'Posts already exist', 'count' => $existingPosts]);
            }

            // Create sample posts
            $samplePosts = [
                [
                    'author' => 'admin',
                    'content' => 'Selamat datang di forum komunitas! Ini adalah postingan pertama.',
                    'likes' => [],
                    'comments' => []
                ],
                [
                    'author' => 'user1',
                    'content' => 'Halo semua! Senang bisa bergabung dengan komunitas ini.',
                    'likes' => ['user1'],
                    'comments' => []
                ],
                [
                    'author' => 'user2',
                    'content' => 'Bagaimana kabar kalian hari ini? Ada yang ingin berbagi cerita?',
                    'likes' => [],
                    'comments' => []
                ]
            ];

            foreach ($samplePosts as $postData) {
                Post::create($postData);
            }

            return response()->json(['message' => 'Sample posts created successfully', 'count' => count($samplePosts)]);
        } catch (\Exception $e) {
            \Log::error('Error creating sample posts', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to create sample posts', 'message' => $e->getMessage()], 500);
        }
    }

    // Create a new post
    public function store(Request $request)
    {
        $data = $request->validate([
            'content' => 'required|string',
        ]);
        
        // Get username from session or request header
        $username = $request->header('X-Username') ?: 
                   session('username') ?: 
                   ($request->user() ? $request->user()->username : 'Anonymous');

        // Ambil profilePath dari user
        $profilePath = '';
        $user = User::where('username', $username)->first();
        if ($user && isset($user->profile['profilePath'])) {
            $profilePath = $user->profile['profilePath'];
        }
        
        $post = Post::create([
            'author' => $username,
            'content' => $data['content'],
            'profilePath' => $profilePath,
            'likes' => [],
            'comments' => [],
        ]);
        return response()->json($post, 201);
    }

    // Like/unlike a post (toggle)
    public function like($id, Request $request)
    {
        try {
            // Validate post ID
            if (!$id || !is_string($id)) {
                return response()->json([
                    'success' => false,
                    'error' => 'Invalid post ID'
                ], 400);
            }

            // Get username from session or request header
            $username = $request->header('X-Username') ?: 
                       session('username') ?: 
                       ($request->user() ? $request->user()->username : null);
            
            \Log::info('Like request', [
                'post_id' => $id,
                'username' => $username,
                'headers' => $request->headers->all()
            ]);
            
            if (!$username) {
                \Log::warning('Like attempt without username', ['post_id' => $id]);
                return response()->json(['error' => 'Please login to like posts'], 401);
            }
            
            // Find post with better error handling
            $post = Post::find($id);
            if (!$post) {
                \Log::warning('Post not found', ['post_id' => $id]);
                return response()->json([
                    'success' => false,
                    'error' => 'Post not found',
                    'message' => 'Post with ID ' . $id . ' does not exist'
                ], 404);
            }
            
            $likes = $post->likes ?? [];
            
            \Log::info('Current likes', ['post_id' => $id, 'likes' => $likes, 'username' => $username]);
            
            if (in_array($username, $likes)) {
                $likes = array_values(array_diff($likes, [$username])); // Unlike
                \Log::info('User unliked post', ['post_id' => $id, 'username' => $username]);
            } else {
                $likes[] = $username; // Like
                \Log::info('User liked post', ['post_id' => $id, 'username' => $username]);
            }
            
            $post->likes = $likes;
            $post->save();
            
            \Log::info('Post updated', ['post_id' => $id, 'new_likes' => $likes]);
            
            return response()->json([
                'success' => true,
                'likes' => $likes, 
                'count' => count($likes),
                'isLiked' => in_array($username, $likes),
                'message' => in_array($username, $likes) ? 'Post liked' : 'Post unliked'
            ]);
            
        } catch (\Exception $e) {
            \Log::error('Like error', [
                'post_id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to like/unlike post',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Add a comment or reply
    public function comment($id, Request $request)
    {
        $data = $request->validate([
            'content' => 'required|string',
            'parent_id' => 'nullable|string', // for reply
        ]);
        
        // Get username from session or request header
        $username = $request->header('X-Username') ?: 
                   session('username') ?: 
                   ($request->user() ? $request->user()->username : 'Anonymous');
        
        $post = Post::findOrFail($id);
        $comments = $post->comments ?? [];
        
        $comment = [
            'id' => uniqid(),
            'author' => $username,
            'content' => $data['content'],
            'created_at' => now()->toISOString(),
            'replies' => [],
        ];
        
        if (!empty($data['parent_id'])) {
            // Add as reply to a comment
            foreach ($comments as &$c) {
                if ($c['id'] === $data['parent_id']) {
                    $c['replies'][] = $comment;
                    break;
                }
            }
        } else {
            $comments[] = $comment;
        }
        
        $post->comments = $comments;
        $post->save();
        
        return response()->json($post);
    }

    // Show a single post
    public function show($id)
    {
        $post = Post::findOrFail($id);
        return response()->json($post);
    }
}



