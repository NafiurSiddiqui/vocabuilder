<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Words extends Model
{
    /** @use HasFactory<\Database\Factories\WordsFactory> */
    use HasFactory;

    protected $fillable = [
        'word',
        'phonetic',
        'pronunciation',
        'definition',
        'examples',
        'category',
        'user_id'
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
