<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class News extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'news';
    protected $fillable = [
        'title', 'urlImage', 'content', 'likeCount', 'topic', 'status', 'author'
    ];
    protected $casts = [
        'topic' => 'array',
    ];
    public $timestamps = true;
}
