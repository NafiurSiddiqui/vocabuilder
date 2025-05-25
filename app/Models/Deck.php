<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;

class Deck extends Model
{
    /** @use HasFactory<\Database\Factories\DeckFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'user_id'
    ];

    /**
     * Boot the model.
     *
     * When a deck is deleted, update any associated words to point to the default deck.
     *
     * @return void
     */
    // public static function boot()
    // {
    //     parent::boot();

    //     static::deleting(function ($deck) {
    //         Word::where('deck_id', $deck->id)->update(['deck_id' => 1]);
    //     });
    // }


    public function scopeForAuthedUser()
    {
        return $this->where('user_id', Auth::user()->id);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function words(): HasMany
    {
        return $this->hasMany(Word::class);
    }
}
