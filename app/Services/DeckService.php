<?php

namespace App\Services;


use App\Models\Deck;
use App\Enum\DeckEnum;
use App\Models\DefaultDeck;
use Illuminate\Support\Facades\Cache;

class DeckService
{
    /**
     * Retrieve and cache the default deck instance.
     *
     * The result is cached indefinitely. Use `Cache::forget('deck.default')`
     * if the default deck is updated and needs to be refreshed.
     * 
     * 
     * @return Deck
     */
    public function getDefaultDeck(): DefaultDeck
    {

        return Cache::rememberForever('deck.default', function () {
            return DefaultDeck::where('slug', DeckEnum::DEFAULT_SLUG->value)->firstOrFail();
        });
    }
}
