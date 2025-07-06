<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'topics';
    protected $fillable = ['name'];
} 