<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Word extends Model
{
    /** @use HasFactory<\Database\Factories\WordFactory> */
    use HasFactory;

    protected $fillable = [
        'word',
        'phonetic',
        'pronunciation',
        'definition',
        'examples',
        'deck_id',
        'user_id'
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function deck(): BelongsTo
    {
        return $this->belongsTo(Deck::class);
    }
}
