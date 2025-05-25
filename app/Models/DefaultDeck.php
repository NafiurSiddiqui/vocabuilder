<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DefaultDeck extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',

    ];
}
