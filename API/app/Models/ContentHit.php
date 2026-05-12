<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class ContentHit extends Model
{
    protected $table = 'content_hits';
    protected $fillable = [
        'session_id', 'user_ip', 'user_agent', 'tree_id', 'referer', 'path'
    ];
}
