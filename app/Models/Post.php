<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'posts';
    protected $fillable = [
        'author', 'content', 'profilePath', 'likes', 'comments'
    ];
    protected $casts = [
        'likes' => 'array',
        'comments' => 'array',
    ];
    public $timestamps = true;
}



