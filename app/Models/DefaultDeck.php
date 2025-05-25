<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DefaultDeck extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',

    ];

    public function words(): HasMany
    {
        return $this->hasMany(Word::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
